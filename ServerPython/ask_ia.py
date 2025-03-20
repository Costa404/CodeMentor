from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import httpx  
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()




# Configuração do CORS
origins = [
    "http://localhost:4200", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],   
)

class QueryRequest(BaseModel):
    query: str


async def query_groq_api(query: str) -> str:
    api_url = "https://api.groq.com/openai/v1/chat/completions"
    api_key = os.getenv("GROQ_API_KEY")

    messages = [
    {"role": "system", "content": """
    You are a helpful and technical assistant. Your task is to:
    1. Analyze any code, query, or input provided by the user.
    2. If the input is a code snippet, identify errors, suggest improvements, or provide optimizations.
    3. If the input is a natural language question (even if informal or poorly phrased), interpret it correctly and provide a clear, concise, and technical response.
    4. If the input is unclear, ask for clarification or provide a general explanation based on common programming contexts.
    5. Always prioritize accuracy, clarity, and relevance in your responses.
    6. If the user sends a **generic message** like "thank you," "bye," or any other unrelated message, **acknowledge it politely** 
    """},
    {"role": "user", "content": query}
]

    data = {
        "model": "llama3-70b-8192",
        "messages": messages,
        "max_completion_tokens": 100,
        "frequency_penalty": 0.5
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(api_url, json=data, headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        return response_data["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.status_code}, {response.text}"

# Rota POST para receber dados do frontend e analisar o código
@app.post("/codeAnalysis")
async def analyze_code(data: QueryRequest):
    user_query = data.query

    if not user_query:
        raise HTTPException(status_code=400, detail="No query provided")

    final_query = f"""
    Based on the provided code, please analyze it and provide feedback or suggestions. The code is as follows: {user_query}
    """

    suggestion = await query_groq_api(final_query)
    return {"suggestion": suggestion}


