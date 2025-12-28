FINTRUST CHATBOT WITH FLOATING ICON

1. Start Ollama (for dynamic LLM answers):
   ollama serve
   ollama pull llama3.1:8b

2. Create/activate venv and install ML deps (PowerShell):
   cd ml_service
   python -m venv ..\.venv
   ..\.venv\Scripts\python.exe -m pip install -r requirements.txt

3. Start ML service:
   cd ml_service
   ..\.venv\Scripts\python.exe -m uvicorn app:app --host 127.0.0.1 --port 8000

4. Start backend:
   cd backend
   npm install
   npm start

5. Start frontend:
   cd frontend
   ..\.venv\Scripts\python.exe -m http.server 5173
   Open http://localhost:5173

Notes:
- If Ollama is not running on http://localhost:11434, the backend returns a fallback message.
- The backend now includes the user's question in the prompt; answers will vary per question once Ollama is up.
