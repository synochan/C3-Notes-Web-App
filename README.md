# Simple Notes Web App

Simple Notes Web App is a clean full-stack portfolio project for creating, editing, deleting, and managing personal notes through a minimal interface.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Django, Django REST Framework
- Database: PostgreSQL (production-ready) with SQLite fallback for local setup
- Deployment: Vercel for frontend, Render for backend

## Project Structure

```text
.
|-- backend
|   |-- config
|   `-- notes
|-- frontend
|   `-- src
`-- README.md
```

## Backend Setup

1. Create and activate a virtual environment.
2. Install backend dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Copy `backend/.env.example` to `backend/.env` and update values if needed.
4. Run migrations:

```bash
cd backend
python manage.py migrate
```

5. Start the backend server:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/notes/`.

## Frontend Setup

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Copy `frontend/.env.example` to `frontend/.env`.
3. Start the development server:

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Deployment Notes

- Vercel: set the project root to `frontend` and add `VITE_API_BASE_URL` pointing to the Render backend URL plus `/api`.
- Render: set the root directory to `backend`, use `./build.sh` as the build command, and `gunicorn config.wsgi:application` as the start command.
- Add production frontend URL values to `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`, and `ALLOWED_HOSTS`.

## MVP Features

- Create notes
- Edit notes
- Delete notes
- View notes in reverse-updated order
- Clean responsive interface
- REST API-backed persistence
