# C3 Notes Demo Script

**Project**: C3 Notes Web Application
**Demo Version**: v1.0
**Prepared Date**: May 15, 2026
**Estimated Demo Time**: 5-7 minutes

---

## 1. Demo Goal

Show that C3 Notes is a working full-stack notes application with user accounts, private note management, cloud deployment, CI/CD, monitoring documentation, KPI tracking, and cost-benefit analysis.

---

## 2. Pre-Demo Checklist

Before presenting:

- [ ] Confirm frontend is available at `https://c3-notes.vercel.app`
- [ ] Confirm backend health endpoint is available at `https://c3-notes-api.onrender.com/api/health/`
- [ ] Confirm local backend tests pass with `python -m pytest -q`
- [ ] Confirm frontend build passes with `npm run build`
- [ ] Confirm Git tag `v1.0` exists with `git tag --list`
- [ ] Open the following files for screenshots or explanation:
  - `docs/architecture.md`
  - `docs/devops-practices.md`
  - `docs/kpis.md`
  - `docs/metrics-report.md`
  - `docs/cost-benefit.md`
  - `.github/workflows/deploy.yml`
  - `render.yaml`

---

## 3. Opening Statement

"This project is C3 Notes, a full-stack web application for creating and managing private notes. It uses React, TypeScript, Vite, and Tailwind CSS on the frontend, with Django REST Framework on the backend. The frontend is deployed on Vercel, the backend is deployed on Render, and the project includes CI/CD, deployment documentation, KPI tracking, cost-benefit analysis, and operational monitoring guidance."

---

## 4. Live Application Demo

### Step 1: Show the Deployed Frontend

Open:

```text
https://c3-notes.vercel.app
```

Explain:

- The application is deployed as a Vite React frontend.
- Users access the system through the browser.
- The frontend communicates with the backend API over HTTPS.

### Step 2: Register or Log In

Action:

- Create a test account or log in with an existing demo account.

Explain:

- Authentication protects user data.
- Each user only sees their own notes.
- Account and profile features are handled by the Django backend.

### Step 3: Create a Note

Action:

- Create a new note with a title, content, priority, deadline, category, and checklist items.

Explain:

- Notes are stored through the REST API.
- The backend validates input through serializers.
- The database stores note data per authenticated user.

### Step 4: Edit, Pin, Archive, and Restore a Note

Action:

- Edit an existing note.
- Pin or unpin it.
- Archive it.
- Restore it from archived notes.

Explain:

- These actions demonstrate complete CRUD behavior.
- The app supports real note-management workflows, not only static pages.

### Step 5: Show Account Settings

Action:

- Open account/profile settings.
- Show profile fields or theme options if available.

Explain:

- User preferences improve usability.
- Profile handling is separated from note handling in the backend structure.

---

## 5. Architecture Explanation

Open:

```text
docs/architecture.md
```

Talking points:

- The frontend is React + TypeScript + Tailwind CSS.
- The backend is Django REST Framework.
- Production uses PostgreSQL through Render.
- Local development can use SQLite.
- The frontend and backend are separated so each can be deployed and scaled independently.
- REST API endpoints handle account and note operations.

Decision explanation:

"I separated frontend and backend responsibilities because it keeps the UI, API, and database layers easier to maintain. Vercel is suitable for the static frontend build, while Render supports the Django API and PostgreSQL database."

---

## 6. DevOps and Cloud Integration

Open:

```text
.github/workflows/deploy.yml
render.yaml
docs/devops-practices.md
```

Talking points:

- GitHub Actions runs backend checks and frontend build steps.
- Render deployment is configured with `render.yaml`.
- Vercel deployment uses the frontend build output from Vite.
- The backend has a health check path: `/api/health/`.
- Monitoring is documented through Render logs, Vercel logs, GitHub Actions logs, and optional uptime monitoring.

Decision explanation:

"The cloud setup uses low-cost managed platforms. Vercel handles frontend hosting and CDN delivery, while Render hosts the backend API and managed database. This keeps deployment simple and suitable for an MVP."

---

## 7. Tests and Release Evidence

Show terminal output or run:

```bash
cd backend
python -m pytest -q
```

Expected result:

```text
6 passed
```

Then show frontend build:

```bash
cd frontend
npm run build
```

Expected result:

```text
built in ...
```

Show version tag:

```bash
git tag --list
```

Expected result includes:

```text
v1.0
```

Talking points:

- Tests confirm serializer validation behavior.
- The frontend production build confirms the UI compiles successfully.
- The `v1.0` tag marks the capstone-ready release.

---

## 8. KPI and Metrics Explanation

Open:

```text
docs/kpis.md
docs/metrics-report.md
```

Talking points:

- Five KPIs are defined:
  - Daily Active Users
  - Notes Per User
  - Note Completeness
  - API Response Time
  - System Uptime
- `docs/metrics-report.md` provides a monthly reporting structure.
- The report includes analysis sections and suggested improvements for weak KPI results.
- The app includes backend logging to support troubleshooting and monitoring.

Decision explanation:

"The KPIs were chosen to cover engagement, content creation, data quality, performance, and reliability. Together they show whether users are actually using the app and whether the system is stable enough to support them."

---

## 9. Cost-Benefit Explanation

Open:

```text
docs/cost-benefit.md
```

Talking points:

- Development cost is calculated.
- Operational cost is estimated.
- Tangible benefits include productivity savings.
- Intangible benefits include learning value, portfolio value, and improved organization.
- ROI and recommendations are documented.

Decision explanation:

"The cost model shows that the project is low-cost to operate because it uses free or low-cost cloud services. The main cost is development effort, while the benefits come from productivity, learning, and reusable project experience."

---

## 10. Monitoring and Logging

Open:

```text
backend/config/settings.py
docs/devops-practices.md
```

Talking points:

- Django logging is configured in `backend/config/settings.py`.
- Logs are written to backend log files.
- Security and application logs are separated.
- Render and Vercel provide deployment/runtime logs.
- GitHub Actions provides CI logs.

Decision explanation:

"Basic logging was added so errors, security-related events, and runtime behavior can be reviewed after deployment. This supports monitoring and future data-driven improvements."

---

## 11. Closing Statement

"C3 Notes is ready as a capstone MVP because it demonstrates a working application, tested backend logic, production build, cloud deployment configuration, CI/CD pipeline, release tagging, architecture documentation, DevOps practices, KPI tracking, cost-benefit analysis, and a prepared explanation of technical decisions."

---

## 12. Backup Plan

If the live deployment is unavailable during the demo:

- Show screenshots from `docs/screenshots/` if available.
- Run the frontend locally with `npm run dev`.
- Run the backend locally with `python manage.py runserver`.
- Show `render.yaml`, `.github/workflows/deploy.yml`, and deployment verification documents as evidence.
- Explain that free-tier services may sleep or cold start, which is covered in the DevOps and monitoring documentation.

---

**Status**: Demo Script Prepared
**Version**: 1.0
