 
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from database.database import Base


class User(Base):
    """
    User table.

    skills / interests / preferred_language are plain profile fields
    for now. They are NOT used for any recommendation logic yet.
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)

    # Profile fields used later, not for recommendations yet.
    skills = Column(String, default="")
    interests = Column(String, default="")
    preferred_language = Column(String, default="")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
