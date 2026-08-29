from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database.database import Base, engine
from backend.routers import auth, users, prediction


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Loan Default Prediction API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(prediction.router)


@app.get("/")
def root():
    return {"message": "Loan Default Prediction API is running"}