"""
FastAPI application entry point.

Only Authentication + User Profile are wired up here.
Recommendation / ML routes will be added later without needing
to change this file's structure.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine
from routers import auth, users

# Create database tables if they don't exist yet
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Project Idea Recommender API")

# Allow the local frontend (opened via file:// or a simple dev server)
# to call this API during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
def root():
    return {"message": "AI Project Idea Recommender API is running"}
