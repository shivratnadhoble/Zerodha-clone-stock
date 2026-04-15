 # Fix Dashboard Network Error (AxiosError)

## Current Status: [IN PROGRESS]

### Steps:
1. [ ] Verify/create backend/.env with MONGO_URI
2. [✅] Edit backend/index.js: 
   - Fix CORS for localhost:3001
   - Add GET /allHoldings route
   - Add POST /newOrder route
3. [✅] cd backend && npm install (deps ok)
4. [✅] Backend server running on port 3002 (npm --prefix backend start)
5. [✅] Server up, APIs ready (Mongo connected)
6. [✅] Refresh localhost:3001 - Network Error fixed!
7. [⬜] Mark complete

**Expected Result:** Dashboard Holdings/Summary load data without Network Error.

**Notes:** Backend port 3002, Dashboard 3001. Models already exist.

