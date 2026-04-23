# C3 Notes

C3 Notes is a full-stack notes application with user accounts, private notes, archive support, profile settings, themed UI palettes, and productivity-friendly note fields such as deadlines, priorities, and checklists.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Django, Django REST Framework, Gunicorn
- Database: PostgreSQL in production, SQLite for local development
- Deployment: Vercel for frontend, Render for backend

## Project Structure

```text
.
|-- backend
|   |-- accounts
|   |-- config
|   `-- notes
|-- frontend
|   `-- src
|-- render.yaml
`-- README.md
```

## Local Development

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Render Deployment

The repository is set up with a root-level [render.yaml](C:\Users\Merocel\Documents\Codex\2026-04-22-i-am-building-a-project-called\render.yaml) so you can deploy through a Render Blueprint.

### Backend service settings

- Root directory: `backend`
- Build command: `./build.sh`
- Start command: `gunicorn config.wsgi:application`
- Health check path: `/api/health/`

### Render environment variables

Set these in Render if you deploy manually, or review them after using the Blueprint:

- `DJANGO_SECRET_KEY`
- `DEBUG=False`
- `ALLOWED_HOSTS=c3-notes-api.onrender.com`
- `DATABASE_URL=<Render PostgreSQL connection string>`
- `FRONTEND_URL=https://your-vercel-app.vercel.app`
- `CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app`
- `CSRF_TRUSTED_ORIGINS=https://your-vercel-app.vercel.app`

### Notes

- [backend/build.sh](C:\Users\Merocel\Documents\Codex\2026-04-22-i-am-building-a-project-called\backend\build.sh) installs dependencies, runs migrations, and collects static files.
- [backend/runtime.txt](C:\Users\Merocel\Documents\Codex\2026-04-22-i-am-building-a-project-called\backend\runtime.txt) pins the Python runtime for Render.
- Django production security settings are enabled automatically when `DEBUG=False`.

## Vercel Deployment

The frontend is ready to deploy from the `frontend` directory.

### Vercel project settings

- Framework preset: `Vite`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

### Vercel environment variable

- `VITE_API_BASE_URL=https://c3-notes-api.onrender.com/api`

### Routing

[frontend/vercel.json](C:\Users\Merocel\Documents\Codex\2026-04-22-i-am-building-a-project-called\frontend\vercel.json) already rewrites all routes to `index.html`, which is needed for client-side routing on a Vite single-page app.

## Important Production Note

User-uploaded profile images currently use Django local media storage. That works locally and will work temporarily on Render, but Render disks are not durable for long-term user uploads. For persistent uploaded avatars in production, the next step is moving media storage to an external service such as Amazon S3 or Cloudinary.

## Core Features

- Account registration and sign-in
- Private per-user notes
- Create, edit, delete, pin, archive, and restore notes
- Checklist items, categories, deadlines, priorities, and status
- Profile management with avatar upload
- Theme switching with curated palettes and gradients
