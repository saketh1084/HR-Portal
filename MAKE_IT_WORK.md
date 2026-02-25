# Make the integration work

Follow these steps so the frontend talks to the backend.

## 1. Backend (Alswar)

```bash
cd Alswar
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create **Alswar/.env** (copy from `.env.example` and set at least):

- **MONGODB_URL** – Your MongoDB connection string (local: `mongodb://localhost:27017` or your Atlas URL).
- **FRONTEND_URL** (optional) – Default allows `http://localhost:3000` and `http://localhost:5173`.

Start the API:

```bash
python app.py
```

You should see: `Uvicorn running on http://0.0.0.0:8000`  
If you see "Failed to connect to MongoDB", fix **MONGODB_URL** and restart.

## 2. Frontend (HR-Portal)

```bash
cd HR-Portal
npm install
```

Create **HR-Portal/.env** (or copy from `.env.example`):

```
VITE_API_URL=http://localhost:8000
```

Start the app:

```bash
npm run dev
```

Open **http://localhost:3000** (or the port Vite shows).

## 3. Test

- **Sign up** with email + password + role (Candidate/Recruiter).
- **Log in** with the same credentials.
- You should land on the candidate dashboard; **Jobs** and **Applications** come from the API.

If login says *"Cannot reach API. Is the backend running?"* → start the backend (step 1) and ensure **VITE_API_URL** in HR-Portal/.env is `http://localhost:8000`.
