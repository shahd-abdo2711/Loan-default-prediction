from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine
from routers import auth, users, prediction


Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Project Idea Recommender API")


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
    return {"message": "AI Project Idea Recommender API is running"}