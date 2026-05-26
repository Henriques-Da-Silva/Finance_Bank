from fastapi import FastAPI
from routers import usuario
from routers import auth
from routers import cartao
from routers import transacao
from routers import investimento

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FinanceBank API")

app.include_router(usuario.router)
app.include_router(auth.router)
app.include_router(cartao.router)
app.include_router(transacao.router)
app.include_router(investimento.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)