# DevOps & Operational Practices

**Project**: C3 Notes Web Application  
**Date**: May 11, 2026  
**Status**: MVP Deployment

---

## 1. Deployment Procedures

### Frontend Deployment (Vercel)

**Automatic Deployment**:
```bash
1. Push to main branch
2. GitHub webhook triggers Vercel
3. Vercel runs build: npm run build
4. Output deployed to CDN
5. Live at https://c3-notes.vercel.app
```

**Deployment Steps** (if needed manually):

```bash
# Login to Vercel
vercel login

# Deploy current directory
vercel --prod

# Check deployment status
vercel ls
```

**Environment Variables**:
```
VITE_API_URL=https://c3-notes-api.onrender.com
VITE_APP_NAME=C3 Notes
```

**Rollback** (if needed):
- Go to Vercel dashboard
- Click "Deployments"
- Select previous successful deployment
- Click "Promote to Production"

---

### Backend Deployment (Render)

**Automatic Deployment**:
```bash
1. Push to main branch
2. GitHub webhook triggers Render
3. Render pulls code from GitHub
4. Runs build script (build.sh)
5. Starts Gunicorn server
6. Live at https://c3-notes-api.onrender.com
```

**Deployment Steps** (if needed manually):

```bash
# Using Render CLI
render login
render deploy --service c3-notes-api

# Or manual redeploy from dashboard:
# 1. Go to Render dashboard
# 2. Click on "C3 Notes API" service
# 3. Click "Manual Deploy" button
# 4. Choose "Deploy latest commit"
```

**Build Script** (`backend/build.sh`):
```bash
#!/bin/bash
set -e

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create superuser if needed
python manage.py ensure_admin || true
```

**Environment Variables** (Render Dashboard):
```
DJANGO_SECRET_KEY=[auto-generated]
DEBUG=False
ALLOWED_HOSTS=c3-notes-api.onrender.com
DATABASE_URL=[PostgreSQL connection]
FRONTEND_URL=https://c3-notes.vercel.app
CORS_ALLOWED_ORIGINS=https://c3-notes.vercel.app
```

**Rollback**:
- Go to Render dashboard
- Click "Events" tab
- Select previous successful deployment
- Click "Restart" or redeploy that commit

---

## 2. Monitoring & Alerts

### Infrastructure Health

**Render Status Checks**:
- CPU usage: Monitor in Render dashboard
- Memory usage: Alert if > 80%
- Requests/second: Should be < 100 for MVP

**Vercel Status Checks**:
- Build success rate: Should be 100%
- Deploy frequency: Every push
- Edge response time: Should be < 200ms

### Application Monitoring

**Health Endpoint**:
```bash
# Check backend is running
curl https://c3-notes-api.onrender.com/api/health/

# Check frontend is serving
curl https://c3-notes.vercel.app/

# Expected: 200 status code, valid response
```

**Log Monitoring**:

Render logs:
```bash
# View real-time logs from dashboard
# Or via CLI:
render logs --service c3-notes-api --follow
```

Vercel logs:
```bash
# View in Vercel dashboard > Deployments > Logs
# Or via CLI:
vercel logs [URL]
```

### Alerts to Set Up

**High Priority Alerts**:
- ⚠️ Deployment failure: Notify via GitHub Issues
- ⚠️ 500 errors: Check error logs immediately
- ⚠️ High memory usage: Investigate memory leaks
- ⚠️ Database connection errors: Check database status

**Setup**:
- GitHub Actions → use actions/notify for alerts
- Or UptimeRobot → free tier includes email alerts

---

## 3. Maintenance Tasks

### Daily Checks (Automated)

- ✅ CI/CD pipeline runs (automatically)
- ✅ Smoke tests pass (automatically)
- ✅ Backups run (automatically on Render)

### Weekly Checks (Manual)

**Monday Morning Checklist**:
```
1. [ ] Check GitHub Actions workflow status
   Go to: https://github.com/synochan/C3-Notes-Web-App/actions
   Verify: All recent runs show ✅

2. [ ] Test endpoints (health check)
   curl https://c3-notes-api.onrender.com/api/health/
   Expected: 200 response

3. [ ] Test frontend loads
   Visit: https://c3-notes.vercel.app
   Check: Page loads, no 404s or errors

4. [ ] Review error logs
   Render dashboard → Logs tab
   Check: Any 500 errors? Database warnings?
```

### Monthly Maintenance (Admin Only)

**First of the Month**:
```bash
1. Review system logs
   # Check for patterns, errors, performance issues
   
2. Database maintenance
   # Run VACUUM and ANALYZE on PostgreSQL
   python manage.py dbshell
   > VACUUM;
   > ANALYZE;
   
3. Security updates
   # Check for new package versions
   pip list --outdated
   npm outdated
   
4. Backup verification
   # Restore backup to test environment
   # Confirm all data intact
   
5. Update documentation
   # If any deployment changes made
```

### Quarterly Review

**Every 3 Months**:
- [ ] Review infrastructure costs
- [ ] Audit user access and permissions
- [ ] Performance analysis (response times)
- [ ] Security audit (penetration testing optional)
- [ ] Plan feature updates based on KPIs

---

## 4. Troubleshooting Guide

### Problem: Frontend Shows "Cannot reach API"

**Diagnosis**:
```bash
1. Test if backend is running:
   curl https://c3-notes-api.onrender.com/api/health/
   
2. Check CORS configuration:
   # Backend should allow frontend domain
   
3. Check frontend environment:
   # Verify VITE_API_URL is correct in .env
```

**Solutions**:
```bash
# Option 1: Check Render service
Go to Render dashboard > C3 Notes API > check status

# Option 2: Restart backend
Render dashboard > C3 Notes API > Manual Deploy > Restart

# Option 3: Check CORS settings
backend/config/settings.py, CORS_ALLOWED_ORIGINS
Should include: https://c3-notes.vercel.app

# Option 4: Clear browser cache
Chrome: Ctrl+Shift+Delete > Clear all data
Firefox: Ctrl+Shift+Delete
```

---

### Problem: 500 Error on API Endpoint

**Diagnosis**:
```bash
1. Check Render logs
   Render dashboard > C3 Notes API > Logs tab
   
2. Look for error traceback
   
3. Identify problematic endpoint
```

**Common Causes & Solutions**:

| Error | Cause | Fix |
|-------|-------|-----|
| `ProgrammingError: relation does not exist` | Database out of sync | `python manage.py migrate` |
| `ModuleNotFoundError: No module named 'xxx'` | Missing dependency | `pip install -r requirements.txt` |
| `KeyError` in code | Env variable missing | Check .env file on Render |
| `TypeError: 'NoneType'` | Null reference bug | Review stack trace, find line, fix code |

**Recovery**:
```bash
1. If database issue:
   python manage.py migrate
   git push origin main  # Redeploy
   
2. If missing dependency:
   pip install [package]
   Update requirements.txt
   git push origin main
   
3. If code bug:
   Fix code locally
   Test: python manage.py test
   git push origin main
```

---

### Problem: Slow Page Load / High Response Time

**Diagnosis**:
```bash
1. Measure response time
   time curl https://c3-notes-api.onrender.com/api/notes/
   
2. Check which endpoint is slow
   Look at response time distribution
   
3. Profile with Django debug toolbar (dev only)
```

**Common Causes & Solutions**:

| Issue | Cause | Fix |
|-------|-------|-----|
| N+1 queries | Loop fetching related data | Use `select_related()` |
| No database index | Sequential table scan | Add index on frequently filtered field |
| Large response | Too much data returned | Implement pagination |
| External API call | Waiting for 3rd party | Add timeout, use caching |
| Server CPU maxed | Too many requests | Upgrade plan or add caching |

**Example Fix (N+1 queries)**:
```python
# BEFORE (slow - N+1 queries)
notes = Note.objects.all()
for note in notes:
    print(note.owner.username)  # DB query per iteration!

# AFTER (fast - single query with join)
notes = Note.objects.select_related('owner')
for note in notes:
    print(note.owner.username)  # Already loaded!
```

---

### Problem: Database Size Growing Too Large

**Prevention**:
```bash
1. Archive old notes automatically
   Schedule: Delete archived notes > 1 year old
   
2. Implement soft deletes
   notes.is_archived = True (don't permanently delete)
   
3. Monitor database size
   Render dashboard > Database > Storage
```

**Cleanup** (if needed):
```bash
# Backup first!
# Then remove old data:
python manage.py shell
> from notes.models import Note
> from datetime import timedelta
> from django.utils import timezone
> cutoff = timezone.now() - timedelta(days=365)
> old_notes = Note.objects.filter(created_at__lt=cutoff, is_archived=True)
> count = old_notes.count()
> old_notes.delete()
> print(f"Deleted {count} notes")
```

---

## 5. Backup & Recovery

### Automated Backups

**Render PostgreSQL**:
- Frequency: Daily
- Retention: 7 days
- Location: AWS
- Encryption: Yes

**How to restore**:
```
1. Render dashboard > PostgreSQL > Backups tab
2. Select backup date
3. Click "Restore to new database"
4. Update DATABASE_URL
5. Test connection
6. Monitor traffic gradually
```

### Manual Backup

```bash
# Download entire database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Compress for storage
gzip backup-*.sql

# Store securely (cloud storage, GitHub, etc.)
```

### Testing Backups

**Monthly backup test** (1st of month):

```bash
1. Create test environment in Render
2. Restore from backup
3. Run test suite: pytest -v
4. Verify data integrity
5. Check no data loss
6. Delete test environment
```

---

## 6. Security Operations

### Secrets Management

**Never commit secrets!**

What should be in `.env`:
```
DJANGO_SECRET_KEY=django-insecure-xxx
DATABASE_URL=postgresql://user:pass@host/db
DEBUG=False
SECRET_ADMIN_KEY=xxx
```

What should NOT be in code:
```
❌ Database passwords in settings.py
❌ API keys in code comments
❌ Tokens in git history
❌ PII (personal data) in logs
```

### Regular Security Tasks

**Weekly**:
- [ ] Review access logs for suspicious activity
- [ ] Check for failed login attempts

**Monthly**:
- [ ] Audit user permissions
- [ ] Review token usage
- [ ] Update security documentation

**Quarterly**:
- [ ] Run security audit: `pip audit`, `npm audit`
- [ ] Rotate secrets if compromised
- [ ] Review CORS and CSRF settings
- [ ] Penetration testing (optional)

### Incident Response

**If Breach Suspected**:

```
1. IMMEDIATE: Isolate affected systems
2. IMMEDIATE: Rotate all secrets
3. 1 HOUR: Notify affected users
4. 2 HOURS: Analyze logs, find cause
5. 4 HOURS: Deploy fix
6. 24 HOURS: Post-mortem analysis
7. 1 WEEK: Update security procedures
```

---

## 7. Performance Optimization

### Frontend Optimization Checklist

- [ ] Enable gzip compression (Vercel default)
- [ ] Minify CSS/JS (Vite default)
- [ ] Lazy load components (React Suspense)
- [ ] Cache static assets (Vercel default)
- [ ] Use CDN (Vercel global)
- [ ] Monitor Core Web Vitals

### Backend Optimization Checklist

- [ ] Database indexes on frequently queried fields
- [ ] Query optimization (select_related, prefetch_related)
- [ ] Enable database connection pooling
- [ ] Use caching for read-heavy endpoints
- [ ] Compress API responses (gzip)
- [ ] Implement pagination for large datasets

### Monitoring Tools

```bash
# Frontend performance
Google Lighthouse
WebPageTest.org
Vercel Analytics

# Backend performance
Django Debug Toolbar (dev only)
New Relic (optional)
Render metrics dashboard
```

---

## 8. Compliance & Auditing

### Logging for Compliance

**What to log**:
- ✅ User login/logout attempts
- ✅ Data access (who viewed which notes)
- ✅ Data modifications (create/update/delete)
- ✅ Admin actions
- ✅ Authentication failures

**What NOT to log**:
- ❌ Passwords
- ❌ Authentication tokens
- ❌ API keys
- ❌ Sensitive user data

### Audit Trail

```bash
# View recent actions
python manage.py shell
> from django.contrib.admin.models import LogEntry
> for entry in LogEntry.objects.all()[:10]:
>     print(f"{entry.user} - {entry.action_time} - {entry.get_change_message()}")
```

### GDPR Compliance

- [ ] User can request data export
- [ ] User can request deletion
- [ ] Privacy policy available
- [ ] Terms of service available
- [ ] Consent tracked for newsletters
- [ ] Right to be forgotten documented

---

## 9. Runbooks

### Routine Deployment

```
Goal: Deploy new feature
Time: ~5 minutes

Steps:
1. Code review & approval
2. Merge to main branch
3. Wait for CI/CD pipeline (automatic)
4. Verify smoke tests pass
5. Check https://c3-notes.vercel.app loads
6. Check https://c3-notes-api.onrender.com/api/health/ returns 200
7. Test feature end-to-end
8. Document changes in CHANGELOG
9. Done! ✅
```

### Emergency Rollback

```
Goal: Revert broken deployment
Time: ~2 minutes

Steps:
1. Identify broken commit
2. Git: git revert [commit-hash]
3. Push: git push origin main
4. CI/CD redeploys automatically
5. Verify rollback successful
6. Notify team
7. Schedule bug fix post-mortem
```

### Database Migration

```
Goal: Schema changes (new table, new column)
Time: ~10 minutes

Steps:
1. Create migration: python manage.py makemigrations
2. Test locally: python manage.py migrate
3. Run affected tests
4. Commit migration file
5. Push to main
6. Render auto-runs migrations on deploy
7. Verify no errors in logs
8. Monitor for issues
```

---

**Version**: 1.0  
**Status**: Active ✅  
**Last Updated**: May 11, 2026  
**Owner**: Development Team  
**Next Review**: Q3 2026
