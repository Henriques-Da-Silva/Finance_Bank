from fastapi import FastAPI
from routers import usuario
from routers import auth
from routers import cartao
from routers import transacao

app = FastAPI(title="FinanceBank API")

app.include_router(usuario.router)
app.include_router(auth.router)
app.include_router(cartao.router)
app.include_router(transacao.router)