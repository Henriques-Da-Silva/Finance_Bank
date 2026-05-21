from fastapi import APIRouter, Depends, HTTPException

from schemas import CartaoCreate, CartaoOut, CartaoUpdateApelido
from models import Usuarios, Cartoes
from database import get_database
from services.auth_service import get_current_user

from http import HTTPStatus
from sqlalchemy.orm import Session

import random
import string

def gerar_iban() -> str:
    # formato: AO06 + 21 dígitos (simplificado para simulação)
    digitos = ''.join(random.choices(string.digits, k=21))
    return f"AO06{digitos}"

router = APIRouter(prefix="/cartoes", tags=["Cartões"])

@router.get("/", response_model=list[CartaoOut], status_code=HTTPStatus.OK)
def Listar_Meus_Cartoes(db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    return db.query(Cartoes).filter(Cartoes.id_usuario == usuario.id).all()

@router.get("/{id_cartao}", response_model=CartaoOut, status_code=HTTPStatus.OK)
def Ver_Cartao(id_cartao: int, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    cartao = db.query(Cartoes).filter(Cartoes.id == id_cartao, Cartoes.id_usuario == usuario.id).first()
    
    if not cartao:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")
    
    return cartao

@router.post("/", response_model=CartaoOut, status_code=HTTPStatus.CREATED)
def Criar_Cartao(cartao: CartaoCreate, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    while True:
        iban = gerar_iban()
        if not db.query(Cartoes).filter(Cartoes.iban == iban).first():
            break
        
    novo_cartao = Cartoes(
        apelido=cartao.apelido,
        iban=iban,
        id_usuario=usuario.id
    )
    
    db.add(novo_cartao)
    db.commit()
    
    db.refresh(novo_cartao)
    return novo_cartao

@router.patch("/{id_cartao}", response_model=CartaoOut, status_code=HTTPStatus.OK)
def Atualizar_Apelido_do_Cartão(id_cartao: int, dados: CartaoUpdateApelido, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    cartao = db.query(Cartoes).filter(Cartoes.id == id_cartao, Cartoes.id_usuario == usuario.id).first()
    
    if not cartao:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")

    cartao.apelido = dados.apelido
    db.commit()
    
    db.refresh(cartao)
    return cartao

@router.delete("/{id_cartao}", status_code=HTTPStatus.NO_CONTENT)
def Deletar_Cartao(id_cartao: int, db: Session = Depends(get_database), usuario: Usuarios = Depends(get_current_user)):
    encontrado = db.query(Cartoes).filter(Cartoes.id == id_cartao, Cartoes.id_usuario == usuario.id).first()

    if not encontrado:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Cartão não encontrado")
    
    db.delete(encontrado)
    db.commit()