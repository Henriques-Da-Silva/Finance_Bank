from typing import Optional
import datetime
import decimal
import enum

from sqlalchemy import DECIMAL, Date, DateTime, Enum, ForeignKeyConstraint, Index, Integer, String, text
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class InvestimentosStatus(str, enum.Enum):
    ACTIVE = 'ACTIVE'
    COMPLETED = 'COMPLETED'
    CANCELLED = 'CANCELLED'


class PagamentoDetalhesCategoria(str, enum.Enum):
    ENERGIA = 'ENERGIA'
    AGUA = 'AGUA'
    INTERNET = 'INTERNET'
    UNITEL = 'UNITEL'
    AFRICELL = 'AFRICELL'


class TransacoesTipo(str, enum.Enum):
    DEPOSIT = 'DEPOSIT'
    TRANSFER_OUT = 'TRANSFER_OUT'
    TRANSFER_IN = 'TRANSFER_IN'
    PAYMENT = 'PAYMENT'
    RECHARGE = 'RECHARGE'
    INVESTMENT_OUT = 'INVESTMENT_OUT'
    INVESTMENT_IN = 'INVESTMENT_IN'


class TiposUsuario(Base):
    __tablename__ = 'tipos_usuario'
    __table_args__ = (
        Index('nome', 'nome', unique=True),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(50), nullable=False)
    descricao: Mapped[Optional[str]] = mapped_column(String(100))

    usuarios: Mapped[list['Usuarios']] = relationship('Usuarios', back_populates='tipos_usuario')


class Usuarios(Base):
    __tablename__ = 'usuarios'
    __table_args__ = (
        ForeignKeyConstraint(['id_tipo'], ['tipos_usuario.id'], name='usuarios_ibfk_1'),
        Index('celular', 'celular', unique=True),
        Index('email', 'email', unique=True),
        Index('id_tipo', 'id_tipo')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    celular: Mapped[str] = mapped_column(String(20), nullable=False)
    senha: Mapped[str] = mapped_column(String(255), nullable=False)
    id_tipo: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    tipos_usuario: Mapped['TiposUsuario'] = relationship('TiposUsuario', back_populates='usuarios')
    cartoes: Mapped[list['Cartoes']] = relationship('Cartoes', back_populates='usuarios')


class Cartoes(Base):
    __tablename__ = 'cartoes'
    __table_args__ = (
        ForeignKeyConstraint(['id_usuario'], ['usuarios.id'], name='cartoes_ibfk_1'),
        Index('iban', 'iban', unique=True),
        Index('id_usuario', 'id_usuario')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    iban: Mapped[str] = mapped_column(String(34), nullable=False)
    saldo_contabilistico: Mapped[decimal.Decimal] = mapped_column(DECIMAL(20, 2), nullable=False, server_default=text("'0.00'"))
    saldo_disponivel: Mapped[decimal.Decimal] = mapped_column(DECIMAL(20, 2), nullable=False, server_default=text("'0.00'"))
    saldo_bloqueado: Mapped[decimal.Decimal] = mapped_column(DECIMAL(20, 2), nullable=False, server_default=text("'0.00'"))
    id_usuario: Mapped[int] = mapped_column(Integer, nullable=False)
    apelido: Mapped[Optional[str]] = mapped_column(String(50))
    status: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'1'"))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    usuarios: Mapped['Usuarios'] = relationship('Usuarios', back_populates='cartoes')
    investimentos: Mapped[list['Investimentos']] = relationship('Investimentos', back_populates='cartoes')
    transacoes_id_cartao_destino: Mapped[list['Transacoes']] = relationship('Transacoes', foreign_keys='[Transacoes.id_cartao_destino]', back_populates='cartoes')
    transacoes_id_cartao_origem: Mapped[list['Transacoes']] = relationship('Transacoes', foreign_keys='[Transacoes.id_cartao_origem]', back_populates='cartoes_')


class Investimentos(Base):
    __tablename__ = 'investimentos'
    __table_args__ = (
        ForeignKeyConstraint(['id_cartao'], ['cartoes.id'], name='investimentos_ibfk_1'),
        Index('id_cartao', 'id_cartao')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    valor_inicial: Mapped[decimal.Decimal] = mapped_column(DECIMAL(20, 2), nullable=False)
    valor_atual: Mapped[decimal.Decimal] = mapped_column(DECIMAL(20, 2), nullable=False)
    taxa_juros: Mapped[decimal.Decimal] = mapped_column(DECIMAL(5, 2), nullable=False)
    prazo_dias: Mapped[int] = mapped_column(Integer, nullable=False)
    data_inicio: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    data_vencimento: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    id_cartao: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[Optional[InvestimentosStatus]] = mapped_column(Enum(InvestimentosStatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'ACTIVE'"))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))

    cartoes: Mapped['Cartoes'] = relationship('Cartoes', back_populates='investimentos')


class Transacoes(Base):
    __tablename__ = 'transacoes'
    __table_args__ = (
        ForeignKeyConstraint(['id_cartao_destino'], ['cartoes.id'], name='transacoes_ibfk_2'),
        ForeignKeyConstraint(['id_cartao_origem'], ['cartoes.id'], name='transacoes_ibfk_1'),
        Index('id_cartao_destino', 'id_cartao_destino'),
        Index('id_cartao_origem', 'id_cartao_origem')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    tipo: Mapped[TransacoesTipo] = mapped_column(Enum(TransacoesTipo, values_callable=lambda cls: [member.value for member in cls]), nullable=False)
    valor: Mapped[decimal.Decimal] = mapped_column(DECIMAL(20, 2), nullable=False)
    descricao: Mapped[Optional[str]] = mapped_column(String(255))
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime, server_default=text('CURRENT_TIMESTAMP'))
    id_cartao_origem: Mapped[Optional[int]] = mapped_column(Integer)
    id_cartao_destino: Mapped[Optional[int]] = mapped_column(Integer)

    cartoes: Mapped[Optional['Cartoes']] = relationship('Cartoes', foreign_keys=[id_cartao_destino], back_populates='transacoes_id_cartao_destino')
    cartoes_: Mapped[Optional['Cartoes']] = relationship('Cartoes', foreign_keys=[id_cartao_origem], back_populates='transacoes_id_cartao_origem')
    pagamento_detalhes: Mapped[list['PagamentoDetalhes']] = relationship('PagamentoDetalhes', back_populates='transacoes')


class PagamentoDetalhes(Base):
    __tablename__ = 'pagamento_detalhes'
    __table_args__ = (
        ForeignKeyConstraint(['id_transacao'], ['transacoes.id'], name='pagamento_detalhes_ibfk_1'),
        Index('id_transacao', 'id_transacao', unique=True)
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    categoria: Mapped[PagamentoDetalhesCategoria] = mapped_column(Enum(PagamentoDetalhesCategoria, values_callable=lambda cls: [member.value for member in cls]), nullable=False)
    id_transacao: Mapped[int] = mapped_column(Integer, nullable=False)
    operadora: Mapped[Optional[str]] = mapped_column(String(50))
    numero_destino: Mapped[Optional[str]] = mapped_column(String(20))
    referencia: Mapped[Optional[str]] = mapped_column(String(100))

    transacoes: Mapped['Transacoes'] = relationship('Transacoes', back_populates='pagamento_detalhes')