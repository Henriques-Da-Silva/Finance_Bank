from fastapi import APIRouter, Depends, HTTPException

from schemas import UsuarioCreate, UsuarioOut, UsuarioUpdate, UsuarioUpdateOut
from models import Usuarios, TiposUsuario
from database import get_database

from http import HTTPStatus
from sqlalchemy.orm import Session
from argon2 import PasswordHasher as ph

router = APIRouter(prefix="/usuario", tags=["Usuários"])

@router.get("/usuarios", response_model=list[UsuarioOut], status_code=HTTPStatus.OK)
def Listar_Usuarios(db: Session = Depends(get_database)):
    usuarios = db.query(Usuarios).all()
    
    return usuarios

@router.get("/{id_usuario}", response_model=UsuarioOut, status_code=HTTPStatus.OK)
def Pegar_Usuario(id_usuario: int, db: Session = Depends(get_database)):
    usuario = db.query(Usuarios).filter(Usuarios.id == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Usuário não encontrado")
    
    return usuario

@router.post("/", response_model=UsuarioOut, status_code=HTTPStatus.CREATED)
def Criar_Usuario(usuario: UsuarioCreate, db: Session = Depends(get_database)):
    if (db.query(Usuarios).filter(Usuarios.email == usuario.email).first()):
        raise HTTPException(status_code=HTTPStatus.CONFLICT, detail="Email já cadastrado")
    
    if (db.query(Usuarios).filter(Usuarios.celular == usuario.celular).first()):
        raise HTTPException(status_code=HTTPStatus.CONFLICT, detail="Número de telefone já cadastrado")
    
    tipo_usuario = db.query(TiposUsuario).filter(TiposUsuario.nome == "user").first()
    if not tipo_usuario:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Problemas na inserção do tipo de usuário")
    
    novo_usuario = Usuarios(
        nome=usuario.nome,
        email=usuario.email,
        celular=usuario.celular,
        senha=ph().hash(usuario.senha),
        id_tipo=tipo_usuario.id   
    )
    
    db.add(novo_usuario)
    db.commit()
    
    db.refresh(novo_usuario)
    return novo_usuario

@router.patch("/{id_usuario}", response_model=UsuarioUpdateOut, status_code=HTTPStatus.OK)
def Atualizar_Usuario(id_usuario: int, usuario: UsuarioUpdate, db: Session = Depends(get_database)):
    editando = db.query(Usuarios).filter(Usuarios.id == id_usuario).first()
    
    if not editando:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Usuário não encontrado")

    dados = usuario.model_dump(exclude_unset=True)
    if "senha" in dados:
        dados["senha"] = ph().hash(dados["senha"])

    for campo, valor in dados.items():
        setattr(editando, campo, valor)
        
    db.commit()
    
    db.refresh(editando)
    return editando

@router.delete("/{id_usuario}", status_code=HTTPStatus.NO_CONTENT)
def Deletar_Usuario(id_usuario: int, db: Session = Depends(get_database)):
    usuario = db.query(Usuarios).filter(Usuarios.id == id_usuario).first()
    
    if not usuario:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Usuário não encontrado")
    
    db.delete(usuario)
    db.commit()