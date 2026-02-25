# Push frontend with API integration

Run these in the **HR-Portal** folder. Do not add `.env` (it has your local API URL and is in .gitignore).

```bash
cd HR-Portal

# Stage all integration changes ( .env is ignored )
git add .gitignore
git add .env.example
git add MAKE_IT_WORK.md
git add src/api/
git add src/context/AuthContext.jsx
git add src/pages/auth/Login.jsx
git add src/components/candidate/JobListings.jsx
git add src/components/candidate/JobDetail.jsx
git add src/components/candidate/JobSearch.jsx
git add src/components/candidate/ApplicationTracking.jsx

# Or in one go (only tracked/untracked; .env stays ignored)
git add -A
git status   # confirm .env is NOT listed

git commit -m "Integrate frontend with backend APIs: auth, jobs, search, applications"
git push
```

Your friend should after pull:
1. Copy `.env.example` to `.env`
2. Set `VITE_API_URL` to their backend URL (e.g. `http://localhost:8000` or their server URL)
3. `npm install && npm run dev`
