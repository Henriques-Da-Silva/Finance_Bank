from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import decimal
import datetime
from models import TransacoesTipo, PagamentoDetalhesCategoria, InvestimentosStatus


# ─── Tipos de usuário ────────────────────────────────────────────────
class TiposUsuarioCreate(BaseModel):
    nome: str
    descricao: Optional[str] = None

class TiposUsuarioOut(TiposUsuarioCreate):
    id: int
    model_config = {"from_attributes": True}


# ─── Usuário ─────────────────────────────────────────────────────────
class UsuarioCreate(BaseModel):
    nome: str = Field(min_length=2, max_length=100)
    email: EmailStr
    celular: str = Field(min_length=9, max_length=20)
    senha: str = Field(min_length=6)
    id_tipo: int = 2

class UsuarioOut(BaseModel):
    id: int
    nome: str
    email: EmailStr
    celular: str
    id_tipo: int
    created_at: Optional[datetime.datetime] = None
    model_config = {"from_attributes": True}
    
class UsuarioUpdate(BaseModel):
    nome: Optional[str] = Field(default=None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    celular: Optional[str] = Field(default=None, min_length=9, max_length=20)
    senha: Optional[str] = Field(default=None, min_length=6)

class UsuarioUpdateOut(BaseModel):
    id: int
    nome: Optional[str] = Field(min_length=2, max_length=100)
    email: Optional[EmailStr]
    celular: Optional[str] = Field(min_length=9, max_length=20)
    model_config = {"from_attributes": True}

class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str


# ─── Cartão ──────────────────────────────────────────────────────────
class CartaoCreate(BaseModel):
    apelido: Optional[str] = Field(default=None, max_length=50)

class CartaoOut(BaseModel):
    id: int
    iban: str
    apelido: Optional[str] = None
    saldo_contabilistico: decimal.Decimal
    saldo_disponivel: decimal.Decimal
    saldo_bloqueado: decimal.Decimal
    status: Optional[int] = None
    created_at: Optional[datetime.datetime] = None
    model_config = {"from_attributes": True}


# ─── Transação ───────────────────────────────────────────────────────
class TransacaoCreate(BaseModel):
    tipo: TransacoesTipo
    valor: decimal.Decimal = Field(gt=0)
    descricao: Optional[str] = Field(default=None, max_length=255)
    id_cartao_origem: Optional[int] = None
    id_cartao_destino: Optional[int] = None

class TransacaoOut(BaseModel):
    id: int
    tipo: TransacoesTipo
    valor: decimal.Decimal
    descricao: Optional[str] = None
    id_cartao_origem: Optional[int] = None
    id_cartao_destino: Optional[int] = None
    created_at: Optional[datetime.datetime] = None
    model_config = {"from_attributes": True}


# ─── Pagamento detalhes ──────────────────────────────────────────────
class PagamentoDetalhesCreate(BaseModel):
    categoria: PagamentoDetalhesCategoria
    operadora: Optional[str] = Field(default=None, max_length=50)
    numero_destino: Optional[str] = Field(default=None, max_length=20)
    referencia: Optional[str] = Field(default=None, max_length=100)

class PagamentoDetalhesOut(BaseModel):
    id: int
    categoria: PagamentoDetalhesCategoria
    operadora: Optional[str] = None
    numero_destino: Optional[str] = None
    referencia: Optional[str] = None
    id_transacao: int
    model_config = {"from_attributes": True}


# ─── Investimento ────────────────────────────────────────────────────
class InvestimentoCreate(BaseModel):
    valor_inicial: decimal.Decimal = Field(gt=0)
    taxa_juros: decimal.Decimal = Field(gt=0)
    prazo_dias: int = Field(gt=0)

class InvestimentoOut(BaseModel):
    id: int
    valor_inicial: decimal.Decimal
    valor_atual: decimal.Decimal
    taxa_juros: decimal.Decimal
    prazo_dias: int
    data_inicio: datetime.date
    data_vencimento: datetime.date
    status: Optional[InvestimentosStatus] = None
    created_at: Optional[datetime.datetime] = None
    id_cartao: int
    model_config = {"from_attributes": True}


# ─── Token ───────────────────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    usuario_id: Optional[int] = None
    id_tipo: Optional[int] = None