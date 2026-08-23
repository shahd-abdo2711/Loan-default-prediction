"""
Database connection setup using SQLAlchemy + SQLite.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database file (created automatically in the backend folder)
DATABASE_URL = "sqlite:///./app.db"

# check_same_thread=False is needed because FastAPI can use the
# same SQLite connection across different threads.
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """
    FastAPI dependency that provides a database session
    and closes it automatically after the request finishes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
