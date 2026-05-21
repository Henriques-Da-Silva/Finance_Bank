from fastapi import APIRouter, Depends, HTTPException

from schemas import InvestimentoCreate, InvestimentoOut
from models import Investimentos, Cartoes, Transacoes, Usuarios, TransacoesTipo, InvestimentosStatus
from database import get_database
from services.auth_service import get_current_user

from http import HTTPStatus
from sqlalchemy.orm import Session
from decimal import Decimal
from datetime import date, timedelta

router = APIRouter(prefix="/investimentos", tags=["Investimentos"])


@router.get("/", response_model=list[InvestimentoOut], status_code=HTTPStatus.OK)
def Listar_Investimentos(db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    ids_cartoes = [c.id for c in db.query(Cartoes).filter(Cartoes.id_usuario == usuario.id).all()]
    
    return db.query(Investimentos).filter(Investimentos.id_cartao.in_(ids_cartoes)).all()


@router.get("/{id_investimento}", response_model=InvestimentoOut, status_code=HTTPStatus.OK)
def Ver_Investimento(id_investimento: int, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    ids_cartoes = [c.id for c in db.query(Cartoes).filter(Cartoes.id_usuario == usuario.id).all()]

    investimento = db.query(Investimentos).filter(
        Investimentos.id == id_investimento,
        Investimentos.id_cartao.in_(ids_cartoes)
    ).first()

    if not investimento:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Investimento não encontrado")

    return investimento


@router.post("/", response_model=InvestimentoOut, status_code=HTTPStatus.CREATED)
def Criar_Investimento(dados: InvestimentoCreate, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    cartao = db.query(Cartoes).filter(Cartoes.id == dados.id_cartao, Cartoes.id_usuario == usuario.id).first()
    if not cartao:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")

    if cartao.saldo_disponivel < dados.valor_inicial:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Saldo insuficiente")

    hoje = date.today()
    vencimento = hoje + timedelta(days=dados.prazo_dias)

    # trava o saldo
    cartao.saldo_disponivel -= dados.valor_inicial
    cartao.saldo_bloqueado  += dados.valor_inicial

    novo_investimento = Investimentos(
        valor_inicial=dados.valor_inicial,
        valor_atual=dados.valor_inicial,
        taxa_juros=dados.taxa_juros,
        prazo_dias=dados.prazo_dias,
        data_inicio=hoje,
        data_vencimento=vencimento,
        id_cartao=dados.id_cartao
    )

    transacao = Transacoes(
        tipo=TransacoesTipo.INVESTMENT_OUT,
        valor=dados.valor_inicial,
        id_cartao_origem=dados.id_cartao,
        descricao=f"Investimento por {dados.prazo_dias} dias a {dados.taxa_juros}% de juros"
    )

    try:
        db.add(novo_investimento)
        db.add(transacao)
        db.commit()
        db.refresh(novo_investimento)
        return novo_investimento
    except Exception:
        db.rollback()
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail="Erro ao processar operação")


@router.patch("/{id_investimento}/resgatar", response_model=InvestimentoOut, status_code=HTTPStatus.OK)
def Resgatar_Investimento(id_investimento: int, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    ids_cartoes = [c.id for c in db.query(Cartoes).filter(Cartoes.id_usuario == usuario.id).all()]

    investimento = db.query(Investimentos).filter(
        Investimentos.id == id_investimento,
        Investimentos.id_cartao.in_(ids_cartoes)
    ).first()

    if not investimento:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Investimento não encontrado")

    if investimento.status != InvestimentosStatus.ACTIVE:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Investimento não está ativo")

    if date.today() < investimento.data_vencimento:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=f"Investimento vence em {investimento.data_vencimento}")

    cartao = db.query(Cartoes).filter(Cartoes.id == investimento.id_cartao).first()

    # calcula valor final com juros
    valor_final = investimento.valor_inicial * (1 + investimento.taxa_juros / 100) ** (investimento.prazo_dias / 30)

    # devolve o saldo
    cartao.saldo_disponivel     += valor_final
    cartao.saldo_contabilistico += valor_final - investimento.valor_inicial  # só os juros aumentam o contabilístico
    cartao.saldo_bloqueado      -= investimento.valor_inicial

    investimento.valor_atual = valor_final
    investimento.status      = InvestimentosStatus.COMPLETED

    transacao = Transacoes(
        tipo=TransacoesTipo.INVESTMENT_IN,
        valor=valor_final,
        id_cartao_destino=cartao.id,
        descricao=f"Resgate de investimento — juros: {valor_final - investimento.valor_inicial:.2f}"
    )

    try:
        db.add(transacao)
        db.commit()
        db.refresh(investimento)
        return investimento
    except Exception:
        db.rollback()
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail="Erro ao processar operação")