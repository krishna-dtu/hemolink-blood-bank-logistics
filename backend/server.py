from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt

# ==================== ENV SETUP ====================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

if not MONGO_URL or not DB_NAME:
    raise RuntimeError("MONGO_URL or DB_NAME missing in .env")

# ==================== DB ====================

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ==================== JWT ====================

JWT_SECRET = os.getenv("JWT_SECRET", "hemolink-secret-key-2024")
JWT_ALGORITHM = "HS256"
security = HTTPBearer()

# ==================== APP ====================

app = FastAPI(title="HemoLink API", version="1.0.0")

# ✅ FIXED CORS (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://donorflow-6.preview.emergentagent.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

# ==================== LOGGING ====================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str

class LoginResponse(BaseModel):
    user: UserResponse
    token: str

class DashboardStats(BaseModel):
    totalUnits: int
    expiringUnits: int
    criticalAlerts: int
    activeTransfers: int
    donorsToday: int
    temperaturesNormal: int

# ==================== MOCK USERS ====================

MOCK_USERS = [
    {"id": "U001", "email": "admin@hemolink.com", "password": "demo123", "role": "admin", "name": "Admin"},
]

# ==================== HELPERS ====================

def create_token(user_id: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

# ==================== ROUTES ====================

@api_router.post("/auth/login", response_model=LoginResponse)
async def login(data: UserLogin):
    user = next((u for u in MOCK_USERS if u["email"] == data.email), None)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(user["id"], user["role"])
    return LoginResponse(
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            role=user["role"],
        ),
        token=token,
    )

@api_router.get("/")
async def root():
    return {"message": "HemoLink API running", "status": "ok"}

@api_router.get("/health")
async def health():
    return {"status": "healthy", "time": datetime.now(timezone.utc).isoformat()}

# ==================== REGISTER ROUTER ====================

app.include_router(api_router)

# ==================== SHUTDOWN ====================

@app.on_event("shutdown")
async def shutdown():
    client.close()
