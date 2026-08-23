"""
Pydantic schemas for authentication and user profile.
"""

from pydantic import BaseModel, EmailStr, Field


# ---------- Register ----------

class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=6)


class RegisterResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True


# ---------- Login ----------

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: RegisterResponse


# ---------- Profile (users/me) ----------

class UserProfile(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    skills: str = ""
    interests: str = ""
    preferred_language: str = ""

    class Config:
        from_attributes = True


class UserProfileUpdate(BaseModel):
    full_name: str | None = None
    skills: str | None = None
    interests: str | None = None
    preferred_language: str | None = None
