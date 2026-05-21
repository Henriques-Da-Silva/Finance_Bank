from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from http import HTTPStatus

from sqlalchemy.orm import Session

from schemas import TokenData
from models import Usuarios
from database import get_database


SECRET_KEY = "sua_secret_key"
ALGORITHM = "HS256"
EXPIRACAO_MINUTOS = 60 * 24  # 24 horas

def criar_token(dados: dict) -> str:
    payload = dados.copy()
    expiracao = datetime.now(timezone.utc) + timedelta(minutes=EXPIRACAO_MINUTOS)
    payload.update({"exp": expiracao})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_database)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        usuario_id = payload.get("sub")
        id_tipo = payload.get("id_tipo")
        
        if usuario_id is None:
            raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail="Token inválido")
        
        token_data = TokenData(usuario_id=int(usuario_id), id_tipo=id_tipo)
        
    except JWTError:
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail="Token inválido")
    
    usuario = db.query(Usuarios).filter(Usuarios.id == token_data.usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail="Usuário não encontrado")

    return usuario

def get_admin_user(usuario: Usuarios = Depends(get_current_user)):
    if usuario.id_tipo != 1:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail="Acesso restrito a administradores")
    return usuario