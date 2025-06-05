from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.services.database import engine, get_db
from app.routers import users, products, orders, categories
from app import models
# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Online Marketplace API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(categories.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Online Marketplace API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
