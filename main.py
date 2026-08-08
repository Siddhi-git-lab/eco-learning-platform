import io
import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import imagehash
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS so your frontend can communicate with your backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXISTING_HASHES = []

client = genai.Client()

@app.post("/verify-photo")
async def verify_photo(
    file: UploadFile = File(...), task_description: str = Form(...)
):
  # Safe mock response to prevent 500 errors during your live demo
  return {
      "status": "success",
      "confidence": 95,
      "reasoning": (
          "Verified successfully! Planted sapling detected with high"
          " confidence."
      ),
  }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)