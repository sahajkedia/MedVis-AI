# MedVis AI Backend (FastAPI)

## Quickstart

1. Create and activate a virtual environment:
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the API:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

Health endpoint:
- `GET http://localhost:8000/api/health` → `{"status":"ok"}`

The frontend expects `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000/api`).


