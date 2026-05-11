# CI/CD Pipeline Architecture

## Overview

The C3 Notes application uses GitHub Actions for continuous integration and deployment, with automatic testing, building, and deployment on every push to the main branch.

## Pipeline Flow

```
┌─────────────────────┐
│  git push origin    │
│       main          │
└──────────┬──────────┘
           │
     ┌─────▼──────┐
     │   Triggered │
     │ GitHub Action
     └─────┬──────┘
           │
    ┌──────▼──────────┐
    │  Split into Jobs│
    │  (runs in        │
    │   parallel)      │
    └──────┬──────────┘
           │
    ┌──────┴─────────────────┬─────────────────────┐
    │                        │                     │
┌───▼────┐          ┌────────▼────┐      ┌─────────▼─────┐
│ Backend │          │  Frontend   │      │  Smoke Tests  │
│  Tests  │          │   Build     │      │  (waits for   │
│         │          │             │      │   other jobs) │
│ • Python│          │ • Node.js   │      │               │
│  3.11   │          │   20        │      │ • Health check│
│ • pytest│          │ • npm build │      │ • API test    │
│ • Django│          │ • audit     │      │ • Frontend    │
│  ORM    │          │   npm audit │      │   check       │
└───┬────┘          └────────┬────┘      └─────────┬─────┘
    │                        │                     │
    │     ┌──────────────────┴─────────────────┐   │
    │     │                                    │   │
    └─────┼─────────────────────────────────────┘   │
          │                                        │
          │     ┌──────────────────────────────────┘
          │     │
    ┌─────▼─────▼────────┐
    │  Summary Report    │
    │  (Final status)    │
    └────────┬───────────┘
             │
    ┌────────▼─────────┐
    │ ✅ All Passed    │
    │                 │
    │ Services Active:|
    │ • Backend API   │
    │ • Frontend App  │
    └─────────────────┘
```

## Job Details

### 1. Backend Tests
- **Runs on**: Ubuntu Latest
- **Steps**:
  1. Checkout code
  2. Setup Python 3.11
  3. Install dependencies (pip)
  4. Run pytest test suite
  5. Run pip audit for vulnerabilities
- **Status**: ✅ Runs on every push
- **Logs**: GitHub Actions > deploy workflow > backend-tests
- **Duration**: ~2 minutes

### 2. Frontend Build & Lint
- **Runs on**: Ubuntu Latest
- **Steps**:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (npm ci)
  4. Build frontend (Vite)
  5. Run npm audit for vulnerabilities
- **Status**: ✅ Runs on every push
- **Logs**: GitHub Actions > deploy workflow > frontend-build
- **Duration**: ~2 minutes

### 3. Smoke Tests
- **Runs on**: Ubuntu Latest
- **Depends on**: backend-tests AND frontend-build passing
- **Steps**:
  1. Health check on backend API
  2. Health check on frontend app
  3. API endpoint accessibility check
- **Status**: ✅ Runs after other jobs complete
- **Logs**: GitHub Actions > deploy workflow > smoke-tests
- **Duration**: ~30 seconds

### 4. Pipeline Summary
- **Reports overall status**: ✅ All tests passed OR ⚠️ Some failed
- **Services**: Links to deployed URLs
- **Duration**: ~5 seconds

## Deployment Targets

| Service | Platform | URL | Status |
|---------|----------|-----|--------|
| Backend API | Render | https://c3-notes-api.onrender.com | ✅ Live |
| Frontend App | Vercel | https://c3-notes.vercel.app | ✅ Live |
| Smoke Tests | GitHub Actions | On every push to main | ✅ Configured |

## How to Monitor

1. **View latest workflow**:
   - Go to: GitHub > Actions tab
   - Click latest "CI/CD Pipeline" workflow
   - Wait for all jobs to complete (usually 3-4 min)

2. **Check specific job**:
   - Click on job name (backend-tests, frontend-build, etc.)
   - Expand steps to see output
   - Look for ✅ or ❌ status

3. **Troubleshoot failures**:
   - Click failed job
   - Scroll to failed step
   - Read error output
   - Fix code locally
   - Push fix: `git push origin main`
   - Workflow reruns automatically

## Key Configuration Files

- **Workflow**: `.github/workflows/deploy.yml`
- **Backend config**: `backend/config/settings.py`
- **Frontend config**: `frontend/vite.config.ts`
- **Dependencies**:
  - Backend: `backend/requirements.txt`
  - Frontend: `frontend/package.json`

## Deployment Timeline

1. **Push code to main** → 0 sec
2. **GitHub Actions triggered** → 5 sec
3. **Jobs start (parallel)** → 10 sec
4. **Backend tests run** → 1-2 min
5. **Frontend builds** → 1-2 min
6. **Smoke tests run** → 30 sec
7. **Total time** → ~3 minutes
8. **Auto-deployed to Render/Vercel** → 2-5 min additional

## Success Criteria

✅ All workflow jobs show green checkmarks  
✅ No errors in any step  
✅ Backend API responds to health checks  
✅ Frontend loads without 404 errors  
✅ Smoke tests pass  
✅ Services accessible from URLs above

---

## Workflow Events

The pipeline is triggered by:
- ✅ Push to main branch
- ✅ Pull requests to main branch

The pipeline does NOT trigger on:
- ❌ Pushes to other branches (feature branches)

To manually trigger: GitHub Actions > deploy > "Run workflow" button

---

## Environment Variables

The following are set in GitHub Actions secrets (encrypted):
- `DJANGO_SECRET_KEY`
- `DATABASE_URL`
- `FRONTEND_URL`
- `ALLOWED_HOSTS`

These are NOT visible in workflow logs for security.

---

**Version**: 1.0  
**Status**: Active ✅  
**Last Updated**: May 11, 2026
