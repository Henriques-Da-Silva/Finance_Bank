from fastapi import FastAPI
from routers import usuario

app = FastAPI(title="FinanceBank API")

app.include_router(usuario.router)