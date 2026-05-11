# System Architecture

**Project**: C3 Notes Web Application  
**Architecture Version**: 1.0  
**Date**: May 11, 2026

---

## High-Level System Design

```
┌─────────────────────────────────────────────────────────────┐
│                        END USERS                            │
│                  (Web Browser / Desktop)                    │
└──────────┬──────────────────────────────────────────────────┘
           │ HTTPS
           ▼
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND APPLICATION                      │
│  (React + TypeScript + Tailwind CSS - Hosted on Vercel)     │
│                                                              │
│  • Page: Login/Register                                     │
│  • Page: Dashboard (notes list)                             │
│  • Page: Note Editor                                        │
│  • Page: Account Settings                                   │
│  • Page: Profile/Avatar                                     │
│  • State: Redux/Context (user, notes, auth)                │
└──────────┬──────────────────────────────────────────────────┘
           │ REST API Calls + JWT Token
           │ https://c3-notes-api.onrender.com/api/
           ▼
┌──────────────────────────────────────────────────────────────┐
│                    BACKEND API SERVER                        │
│   (Django REST Framework - Hosted on Render)                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            URL Router (urls.py)                      │  │
│  │  • /api/accounts/register/                           │  │
│  │  • /api/accounts/login/                              │  │
│  │  • /api/accounts/profile/                            │  │
│  │  • /api/notes/                                       │  │
│  │  • /api/notes/{id}/                                  │  │
│  └──────┬───────────────────────────────────────────────┘  │
│         │                                                    │
│  ┌──────▼───────────────────────────────────────────────┐  │
│  │           Views & Serializers                        │  │
│  │  • REST Viewsets (CRUD operations)                   │  │
│  │  • Input Validation (serializers)                    │  │
│  │  • Permission Checks (authentication)                │  │
│  │  • Response Formatting (JSON)                        │  │
│  └──────┬───────────────────────────────────────────────┘  │
│         │                                                    │
│  ┌──────▼───────────────────────────────────────────────┐  │
│  │         Business Logic & Models                      │  │
│  │  • User Model (authentication)                       │  │
│  │  • UserProfile Model (avatar, preferences)           │  │
│  │  • Note Model (title, content, category)             │  │
│  │  • Relationships: User → Notes (1:Many)              │  │
│  └──────┬───────────────────────────────────────────────┘  │
│         │ SQL Queries (ORM)
│         ▼
│  ┌──────────────────────────────────────────────────────┐  │
│  │              DATABASE LAYER                          │  │
│  │  • Connection Pool                                   │  │
│  │  • Query Optimization                                │  │
│  │  • Migrations (schema versioning)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────┬──────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────┐
│                    POSTGRESQL DATABASE                       │
│  (Hosted on Render - Managed Service)                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Schemas:                                             │  │
│  │  • auth_user (Django auth)                           │  │
│  │  • accounts_userprofile (custom profile)             │  │
│  │  • notes_note (user notes)                           │  │
│  │  • auth_token (session tokens)                       │  │
│  │  • django_migrations (version control)               │  │
│  │                                                      │  │
│  │ Storage: Persistent (data survives server restart)  │  │
│  │ Backups: Automated daily snapshots                   │  │
│  │ Encryption: At-rest encryption enabled               │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Frontend Layer (Vercel)

**Technology Stack**:
- React 18+ (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Vite (build tool)
- Axios/Fetch (HTTP client)

**Key Components**:
- `AuthPanel.tsx` - Login/Registration
- `NotesList.tsx` - Notes display with filtering
- `NoteEditor.tsx` - Create/edit notes
- `AccountSettingsPanel.tsx` - User profile management

**Communication**:
- REST API calls to backend
- Bearer token in Authorization header
- JSON request/response format

**Hosting**:
- Platform: Vercel
- URL: https://c3-notes.vercel.app
- CDN: Global edge network
- SSL: Automatic HTTPS

---

### 2. Backend API Layer (Render)

**Technology Stack**:
- Django 5.0+ (web framework)
- Django REST Framework (API toolkit)
- Gunicorn (WSGI server)
- Python 3.11 (runtime)

**Project Structure**:
```
backend/
├── config/              # Django settings & URLs
│   ├── settings.py     # Configuration
│   ├── urls.py         # API routes
│   └── wsgi.py         # Production entry
├── accounts/           # User management
│   ├── models.py       # User & Profile
│   ├── views.py        # REST endpoints
│   ├── serializers.py  # Data validation
│   └── tests/          # Unit tests
├── notes/              # Note management
│   ├── models.py       # Note model
│   ├── views.py        # REST endpoints
│   ├── serializers.py  # Data validation
│   └── tests/          # Unit tests
└── manage.py           # CLI commands
```

**Key Endpoints**:

| Method | Endpoint | Authentication | Purpose |
|--------|----------|-----------------|---------|
| POST | `/api/accounts/register/` | None | Create account |
| POST | `/api/accounts/login/` | None | Get token |
| GET | `/api/accounts/profile/` | Token | Get user profile |
| PUT | `/api/accounts/profile/` | Token | Update profile |
| POST | `/api/accounts/logout/` | Token | Invalidate token |
| GET | `/api/notes/` | Token | List user's notes |
| POST | `/api/notes/` | Token | Create note |
| GET | `/api/notes/{id}/` | Token | Get specific note |
| PUT | `/api/notes/{id}/` | Token | Update note |
| DELETE | `/api/notes/{id}/` | Token | Delete note |

**Security Features**:
- Token authentication (TokenAuthentication)
- Permission checks (IsAuthenticated)
- Input validation (Serializers)
- Row-level filtering (users see own data only)
- CORS configuration (frontend domain only)
- CSRF protection
- Rate limiting (optional, can be added)

**Hosting**:
- Platform: Render
- URL: https://c3-notes-api.onrender.com
- Type: Web Service
- SSL: Automatic HTTPS
- Uptime: 99.99%

---

### 3. Database Layer (PostgreSQL)

**Database Hosted**: Render PostgreSQL (managed service)

**Schema**:

```sql
-- Authentication & Users
auth_user (Django built-in)
├── id (PK)
├── username (unique)
├── email (unique)
├── password (hashed argon2)
└── is_active

-- User Profile (Extended)
accounts_userprofile
├── id (PK)
├── user_id (FK → auth_user)
├── display_name
├── avatar (file upload)
├── avatar_url (external image URL)
└── marketing_emails

-- User Notes
notes_note
├── id (PK)
├── owner_id (FK → auth_user)
├── title
├── content
├── category (choices: work, personal, study, etc.)
├── is_archived (soft delete)
├── is_favorite
├── created_at
├── updated_at
└── checklist (JSON field)

-- Authentication Tokens
authtoken_token
├── key (unique token)
├── user_id (FK → auth_user)
└── created
```

**Indexes**:
- `auth_user.username` (faster login)
- `auth_user.email` (unique constraint)
- `notes_note.owner_id` (filter by owner)
- `notes_note.created_at` (sort by date)
- `authtoken_token.key` (token lookup)

**Capacity**:
- Storage: 1 GB included, can scale
- Connections: 20-100 concurrent (sufficient for MVP)
- Backups: Automated daily

---

## Data Flow Examples

### Example 1: User Login

```
1. User enters username/password in frontend
   ↓
2. Frontend POST to /api/accounts/login/
   {username: "john", password: "secret123"}
   ↓
3. Backend receives, validates input
   ↓
4. Backend queries User model: User.objects.get(username="john")
   ↓
5. Check password: user.check_password("secret123")
   ↓
6. Generate token: Token.objects.create(user=user)
   ↓
7. Return JSON: {token: "abc123xyz", user: {...}}
   ↓
8. Frontend stores token in localStorage
   ↓
9. Future API calls include: Authorization: Token abc123xyz
```

### Example 2: Create Note

```
1. User fills note form (title, content, category)
   ↓
2. Frontend POST to /api/notes/
   {title: "Meeting notes", content: "...", category: "work"}
   Header: Authorization: Token abc123xyz
   ↓
3. Backend receives request
   ↓
4. Authentication: Verify token in authtoken_token table
   ↓
5. Permission: Check user has IsAuthenticated permission
   ↓
6. Validation: Run serializers.py validators
   ✓ title not empty, < 200 chars
   ✓ content not empty
   ✓ category in valid choices
   ↓
7. Create object: Note.objects.create(
     owner_id=user.id,
     title="Meeting notes",
     content="...",
     category="work"
   )
   ↓
8. Database INSERT into notes_note table
   ↓
9. Return JSON: {id: 123, title: "...", owner: {...}, created_at: "..."}
   ↓
10. Frontend receives and displays in notes list
```

### Example 3: Retrieve User's Notes

```
1. Frontend GET to /api/notes/
   Header: Authorization: Token abc123xyz
   ↓
2. Backend receives request
   ↓
3. Authentication: Verify token
   ↓
4. Query: Note.objects.filter(owner_id=user.id)
   ↓
5. Database executes SQL:
   SELECT * FROM notes_note WHERE owner_id = 123
   ↓
6. Backend serializes 50 notes to JSON
   ↓
7. Return paginated response:
   {
     count: 50,
     next: "/api/notes/?page=2",
     results: [...]
   }
   ↓
8. Frontend renders notes in NotesList component
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GITHUB REPOSITORY                        │
│  (.github/workflows/deploy.yml - CI/CD Pipeline)            │
│                                                              │
│  1. Push code to main                                        │
│  2. Trigger GitHub Actions workflow                          │
│  3. Run tests (backend + frontend)                           │
│  4. Build artifacts                                          │
│  5. Run smoke tests                                          │
│  6. Auto-deploy to production                                │
└─────────────────────────────────────────────────────────────┘
        │
        ├─► Render (Backend)
        │   • Webhook on new push
        │   • Auto-builds Docker image
        │   • Deploys new container
        │   • URL: c3-notes-api.onrender.com
        │
        └─► Vercel (Frontend)
            • GitHub integration
            • Auto-detects changes
            • Builds & deploys
            • URL: c3-notes.vercel.app
```

---

## Security Architecture

```
┌─────────────────────────────────┐
│  Internet (Attacker)            │
└────────────┬────────────────────┘
             │
             ▼ (HTTPS only - SSL/TLS)
        
┌─────────────────────────────────┐
│  Vercel CDN (Frontend)           │
│  • Firewall rules                │
│  • DDoS protection               │
│  • Geographic restrictions       │
└────────────┬────────────────────┘
             │ (HTTPS only)
             ▼
┌─────────────────────────────────┐
│  Render Backend                  │
│  • CORS (only from frontend)     │
│  • CSRF protection               │
│  • Rate limiting (optional)      │
│  • Token authentication          │
│  • Permission checks             │
└────────────┬────────────────────┘
             │ (Encrypted connection)
             ▼
┌─────────────────────────────────┐
│  PostgreSQL Database             │
│  • Managed backups               │
│  • Encryption at rest            │
│  • Row-level access control      │
│  • Input parameterization        │
└─────────────────────────────────┘
```

---

## Performance Optimization

| Layer | Technique | Status |
|-------|-----------|--------|
| Frontend | Code splitting, lazy loading | ✅ Vite |
| Frontend | Caching (localStorage tokens) | ✅ Implemented |
| Frontend | CSS optimization (Tailwind) | ✅ Configured |
| Backend | Database indexes | ✅ On frequently queried fields |
| Backend | Query optimization (ORM) | ✅ select_related for joins |
| Backend | Static file compression | ✅ WhiteNoise |
| Backend | Gzip compression | ✅ Render configured |
| Network | CDN (Vercel) | ✅ Global distribution |
| Network | HTTPS compression | ✅ Enabled |

---

## Scalability Strategy

### Current (MVP Phase)

- **Frontend**: Vercel free tier (unlimited bandwidth)
- **Backend**: Render free tier ($7/mo, scales to paid as needed)
- **Database**: PostgreSQL shared (1 GB included)
- **Expected Load**: 50-500 users

### Growth Phase (100-5000 users)

- **Frontend**: Still on Vercel (can handle millions of requests)
- **Backend**: Upgrade to Render paid tier ($12-50/mo)
- **Database**: Dedicated PostgreSQL ($15-100/mo)
- **Caching**: Add Redis for session caching (optional)

### Enterprise Phase (5000+ users)

- **Frontend**: Multi-region Vercel
- **Backend**: Multiple instances behind load balancer
- **Database**: Managed cloud database (AWS RDS, Google Cloud SQL)
- **Caching**: Redis cluster
- **CDN**: Custom CDN configuration

---

## Disaster Recovery

| Scenario | RTO | RPO | Solution |
|----------|-----|-----|----------|
| Render server down | < 1 min | ~ 5 min | Auto-restart by Render |
| Database corrupted | < 1 hour | < 1 day | Daily backups on Render |
| Vercel CDN down | < 1 min | N/A | Vercel's multi-region |
| Data deletion | < 1 day | < 1 day | Restore from backup |
| Security breach | < 1 hour | N/A | Incident response plan |

---

## Monitoring & Observability

**Current Monitoring**:
- ✅ GitHub Actions workflow logs
- ✅ Render application logs
- ✅ Vercel deployment logs

**Optional Additions**:
- UptimeRobot (uptime monitoring)
- Sentry (error tracking)
- New Relic (performance)
- Datadog (full observability)

---

## Technology Choices Justification

| Component | Choice | Why |
|-----------|--------|-----|
| Frontend | React | Popular, large ecosystem, good performance |
| Frontend | TypeScript | Type safety, fewer bugs, better IDE support |
| Frontend | Tailwind CSS | Fast development, consistent styling |
| Backend | Django | Batteries-included, excellent ORM, security focused |
| Backend | Django REST | Standard for REST APIs in Python |
| Database | PostgreSQL | Reliable, powerful, free, great for relational data |
| Hosting | Render | Simple deployment, free tier sufficient, good support |
| Hosting | Vercel | Optimized for React, excellent performance, free tier |
| CI/CD | GitHub Actions | Built-in, free, no separate service needed |

---

**Version**: 1.0  
**Status**: Complete ✅  
**Last Updated**: May 11, 2026  
**Next Review**: When major architectural changes planned
