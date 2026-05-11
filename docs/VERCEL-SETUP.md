# ⚙️ Setup: Backend on Render + Frontend on Vercel

**Goal**: Render handles backend auto-deployment, Vercel handles frontend with GitHub Actions

---

## 🔧 Step 1: Get Vercel Credentials

### 1a. Get VERCEL_TOKEN

1. Go to: https://vercel.com/account/tokens
2. Click **"Create"**
3. Name: `github-actions`
4. Scope: **Full Account**
5. Click **"Create Token"**
6. **Copy the token** (you won't see it again)

### 1b. Get VERCEL_ORG_ID and VERCEL_PROJECT_ID

1. Go to your Vercel project dashboard
2. In the URL, look for the org: `vercel.com/{ORG_ID}`
3. Copy the ORG_ID
4. Click **Settings** → **General**
5. Find **Project ID** and copy it

Or run this in your frontend folder:
```bash
cd frontend
npx vercel link
# Follow prompts, it will create .vercel folder with ids.json
cat .vercel/project.json | grep projectId
cat .vercel/project.json | grep orgId
```

---

## 🚀 Step 2: Add GitHub Secrets

1. Go to GitHub repo: https://github.com/synochan/C3-Notes-Web-App
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

Add these 3 secrets:

### Secret 1: VERCEL_TOKEN
```
Name: VERCEL_TOKEN
Value: [your-token-from-1a]
```

### Secret 2: VERCEL_ORG_ID
```
Name: VERCEL_ORG_ID
Value: [your-org-id]
```

### Secret 3: VERCEL_PROJECT_ID
```
Name: VERCEL_PROJECT_ID
Value: [your-project-id]
```

✅ All 3 should be added

---

## 📝 Step 3: Commit & Push

```bash
# Make sure you're in project root
git add .github/workflows/deploy.yml
git commit -m "ci: add Vercel deployment to CI/CD pipeline"
git push origin main
```

---

## ✅ Step 4: Watch It Work

1. Go to GitHub Actions: https://github.com/synochan/C3-Notes-Web-App/actions
2. You should see the workflow running
3. It will:
   - ✅ Run backend tests (Render)
   - ✅ Build frontend (Vercel)
   - ✅ Run smoke tests
   - ✅ Deploy frontend to Vercel

---

## 🔍 Troubleshooting

**Q: Deployment failed - "Token not found"**
- Make sure you added `VERCEL_TOKEN` secret correctly
- Verify you copied the full token

**Q: "Project not found"**
- Double-check `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`
- Make sure they're exact (case-sensitive)

**Q: Frontend not updating**
- Check Actions tab for errors
- Verify Vercel deployment environment

---

## 📊 Deployment Architecture

```
GitHub main push
    ↓
    ├─→ Backend Tests (Python/pytest)
    ├─→ Frontend Build (Node.js/npm)
    └─→ Smoke Tests
         ↓
    ✅ Deploy Frontend to Vercel
    ✅ Backend auto-deploys via Render webhook
         ↓
    Deployment Complete!
```

---

## 🎯 Result

After this setup:
- **Backend**: `https://c3-notes-api.onrender.com` (auto-deploys)
- **Frontend**: `https://[your-vercel-url].vercel.app` (deploys via GitHub Actions)

Every push to `main` will:
1. Test backend
2. Build frontend
3. Deploy frontend to Vercel
4. All automatic! ✅
