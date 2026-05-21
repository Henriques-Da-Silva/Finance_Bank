from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional

from schemas import TransacaoOut, PagamentoRequest, RecargaRequest, DepositoRequest, TransferenciaRequest
from models import Transacoes, Cartoes, Usuarios, TransacoesTipo, PagamentoDetalhes
from database import get_database
from services.auth_service import get_current_user, get_admin_user

from http import HTTPStatus
from sqlalchemy.orm import Session
from decimal import Decimal

router = APIRouter(prefix="/transacoes", tags=["Transações"])

@router.get("/{id_cartao}", response_model=list[TransacaoOut], status_code=HTTPStatus.OK)
def Extrato_do_Cartao(id_cartao: int, tipo: Optional[TransacoesTipo] = Query(default=None), db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    cartao = db.query(Cartoes).filter(Cartoes.id == id_cartao, Cartoes.id_usuario == usuario.id).first()
    if not cartao:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")

    query = db.query(Transacoes).filter((Transacoes.id_cartao_origem == id_cartao) | (Transacoes.id_cartao_destino == id_cartao))

    if tipo:
        query = query.filter(Transacoes.tipo == tipo)

    return query.order_by(Transacoes.created_at.desc()).all()

@router.post("/deposito", response_model=TransacaoOut, status_code=HTTPStatus.CREATED)
def Deposito(dados: DepositoRequest, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_admin_user)):
    cartao = db.query(Cartoes).filter(Cartoes.id == dados.id_cartao_destino).first()
    if not cartao:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")

    cartao.saldo_contabilistico += dados.valor
    cartao.saldo_disponivel     += dados.valor

    nova_transacao = Transacoes(
        tipo=TransacoesTipo.DEPOSIT,
        valor=dados.valor,
        id_cartao_destino=dados.id_cartao_destino
    )

    try:
        db.add(nova_transacao)
        db.commit()
        
        db.refresh(nova_transacao)
        return nova_transacao
    except Exception:
        db.rollback()
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail="Erro ao processar operação")

@router.post("/transferencia", response_model=TransacaoOut, status_code=HTTPStatus.CREATED)
def Transferencia(dados: TransferenciaRequest, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    origem = db.query(Cartoes).filter(Cartoes.id == dados.id_cartao_origem, Cartoes.id_usuario == usuario.id).first()
    if not origem:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão de origem não encontrado")

    destino = db.query(Cartoes).filter(Cartoes.iban == dados.iban_destino).first()
    if not destino:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="IBAN de destino não encontrado")

    if origem.id == destino.id:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Não pode transferir para o mesmo cartão")

    if origem.saldo_disponivel < dados.valor:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Saldo insuficiente")

    origem.saldo_contabilistico  -= dados.valor
    origem.saldo_disponivel      -= dados.valor
    destino.saldo_contabilistico += dados.valor
    destino.saldo_disponivel     += dados.valor

    transacao_out = Transacoes(tipo=TransacoesTipo.TRANSFER_OUT, valor=dados.valor, id_cartao_origem=origem.id, id_cartao_destino=destino.id)
    transacao_in  = Transacoes(tipo=TransacoesTipo.TRANSFER_IN,  valor=dados.valor, id_cartao_origem=origem.id, id_cartao_destino=destino.id)

    try:
        db.add_all([transacao_out, transacao_in])
        db.commit()

        db.refresh(transacao_out)
        return transacao_out
    except Exception:
        db.rollback()
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail="Erro ao processar operação")

@router.post("/pagamento", response_model=TransacaoOut, status_code=HTTPStatus.CREATED)
def Pagamento( dados: PagamentoRequest, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user) ):
    cartao = db.query(Cartoes).filter(Cartoes.id == dados.id_cartao_origem, Cartoes.id_usuario == usuario.id).first()
    
    if not cartao:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")

    if cartao.saldo_disponivel < dados.valor:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Saldo insuficiente")

    cartao.saldo_contabilistico -= dados.valor
    cartao.saldo_disponivel     -= dados.valor
    
    nova_transacao = Transacoes(
        tipo=TransacoesTipo.PAYMENT,
        valor=dados.valor,
        id_cartao_origem=dados.id_cartao_origem
    )
    db.add(nova_transacao)
    try:
        db.flush()
        
        pagamento_detalhes = PagamentoDetalhes(
            categoria=dados.categoria,
            referencia=dados.referencia,
            id_transacao=nova_transacao.id
        )
        db.add(pagamento_detalhes)

        db.commit()
        
        db.refresh(nova_transacao)
        return nova_transacao
    except Exception:
        db.rollback()
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail="Erro ao processar operação")

@router.post("/recarga", response_model=TransacaoOut, status_code=HTTPStatus.CREATED)
def Recarga(dados: RecargaRequest, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    cartao = db.query(Cartoes).filter(Cartoes.id == dados.id_cartao_origem, Cartoes.id_usuario == usuario.id).first()

    if not cartao:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")

    if cartao.saldo_disponivel < dados.valor:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Saldo insuficiente")

    cartao.saldo_contabilistico -= dados.valor
    cartao.saldo_disponivel     -= dados.valor

    nova_transacao = Transacoes(
        tipo=TransacoesTipo.RECHARGE,
        valor=dados.valor,
        id_cartao_origem=dados.id_cartao_origem
    )
    db.add(nova_transacao)
    try:
        db.flush()
        
        pagamento_detalhes = PagamentoDetalhes(
            categoria=dados.categoria,
            operadora=dados.operadora,
            numero_destino=dados.numero_destino,
            id_transacao=nova_transacao.id
        )
        db.add(pagamento_detalhes)

        db.commit()
        
        db.refresh(nova_transacao)
        return nova_transacao
    except Exception:
        db.rollback()
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail="Erro ao processar operação")