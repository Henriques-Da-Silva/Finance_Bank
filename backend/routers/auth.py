from fastapi import APIRouter, Depends, HTTPException
from http import HTTPStatus
from sqlalchemy.orm import Session
from argon2 import PasswordHasher as ph
from argon2.exceptions import VerifyMismatchError

from database import get_database
from models import Usuarios
from schemas import UsuarioLogin, Token
from services.auth_service import criar_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/login", response_model=Token, status_code=HTTPStatus.OK)
def login(credenciais: UsuarioLogin, db: Session = Depends(get_database)):
    usuario = db.query(Usuarios).filter(Usuarios.email == credenciais.email).first()

    if not usuario:
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail="Credenciais[email] inválidas")

    try:
        ph().verify(usuario.senha, credenciais.senha)
    except VerifyMismatchError:
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail="Credenciais[senha] inválidas")

    token = criar_token({"sub": str(usuario.id), "id_tipo": usuario.id_tipo})
    return Token(access_token=token)