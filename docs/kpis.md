# Key Performance Indicators (KPIs)

**Project**: C3 Notes Web Application  
**Period**: May 2026 - Ongoing  
**Last Updated**: May 11, 2026

---

## Overview

Five key performance indicators track application health, user engagement, and system reliability. Each KPI includes a measurement method and target.

---

## KPI 1: User Engagement - Daily Active Users

**Metric**: Percentage of registered users who log in daily

**Definition**: (Unique users who logged in today) / (Total registered users) × 100%

**Target**: 40% daily active rate

**Measurement Method**:
```sql
-- Run in Django shell: python manage.py shell
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

yesterday = timezone.now() - timedelta(days=1)

# Count yesterday's logins
from django.contrib.sessions.models import Session
active_users = 0  # Count from login logs if available

total_users = User.objects.count()
dau_percentage = (active_users / total_users * 100) if total_users > 0 else 0
print(f"Daily Active Users: {dau_percentage}%")
```

**Collection Frequency**: Daily (automated via logging)

**Why It Matters**:
- Shows if users find value in the app
- Healthy engagement = 30-50% DAU for productivity apps
- Declining DAU signals UX problems or feature gaps

**Current Baseline**: [Collect Week 1]

---

## KPI 2: Content Creation - Notes Per User

**Metric**: Average number of notes per user

**Definition**: (Total notes in system) / (Total active users)

**Target**: 15+ notes per user (healthy engagement)

**Measurement Method**:
```sql
-- Django shell
from notes.models import Note
from django.contrib.auth.models import User

total_notes = Note.objects.count()
active_users = User.objects.filter(is_active=True).count()
notes_per_user = total_notes / active_users if active_users > 0 else 0

print(f"Total Notes: {total_notes}")
print(f"Active Users: {active_users}")
print(f"Notes per User: {notes_per_user:.1f}")
```

**Collection Frequency**: Weekly

**Why It Matters**:
- Indicates feature adoption and user productivity
- Higher ratio = more engaged users
- Trend shows if new features drive usage

**Current Baseline**: [Collect Week 1]

---

## KPI 3: Data Quality - Note Completion

**Metric**: Percentage of notes with all required fields filled

**Definition**: (Notes with title + content + category) / (Total notes) × 100%

**Target**: 95% data completeness

**Measurement Method**:
```sql
-- Django shell
from notes.models import Note

total_notes = Note.objects.count()
complete_notes = Note.objects.filter(
    title__isnull=False, 
    title__length__gt=0,
    content__isnull=False,
    category__isnull=False
).count()

completeness_pct = (complete_notes / total_notes * 100) if total_notes > 0 else 0
print(f"Note Completeness: {completeness_pct:.1f}%")
```

**Collection Frequency**: Weekly

**Why It Matters**:
- Quality data improves search and organization
- Low completeness signals UX friction
- Guides feature improvements

**Current Baseline**: [Collect Week 1]

---

## KPI 4: System Performance - API Response Time

**Metric**: Average API response time for note operations

**Definition**: Mean HTTP response time for GET/POST/PUT requests (milliseconds)

**Target**: < 500ms average (healthy response time)

**Measurement Method**:

From logs or New Relic/DataDog if available:
```bash
# Sample curl test
time curl -H "Authorization: Token YOUR_TOKEN" \
  https://c3-notes-api.onrender.com/api/notes/

# Record the "real" time value in milliseconds

# Or check via Python:
import time
import requests

token = "YOUR_TOKEN"
headers = {"Authorization": f"Token {token}"}

start = time.time()
response = requests.get(
    "https://c3-notes-api.onrender.com/api/notes/",
    headers=headers
)
end = time.time()

response_time_ms = (end - start) * 1000
print(f"Response Time: {response_time_ms:.0f}ms")
```

**Collection Frequency**: Daily (automated)

**Why It Matters**:
- Slow responses = poor user experience
- Helps identify bottlenecks
- Informs scaling decisions

**Current Baseline**: [Collect Week 1]

---

## KPI 5: System Reliability - Uptime

**Metric**: Percentage of time system is available and responding

**Definition**: (Seconds system was UP) / (Total seconds in period) × 100%

**Target**: 99% uptime (max 7.2 hours downtime per month)

**Measurement Method**:

Using smoke tests (already in CI/CD):
```bash
# Manual test from docs/screenshots/
curl -s https://c3-notes-api.onrender.com/api/health/ && echo "✅ UP" || echo "❌ DOWN"

# Set up automated monitoring:
# Option 1: UptimeRobot (free)
# Option 2: Render's built-in monitoring dashboard
# Option 3: Vercel Analytics

# Log results daily in a spreadsheet:
# Date | Backend | Frontend | Status
# 5/11 | 99.8%  | 99.9%   | ✅
```

**Collection Frequency**: Daily (automated)

**Why It Matters**:
- Users rely on service being available
- High uptime = trust and reliability
- Identifies infrastructure issues

**Current Baseline**: [Collect Week 1]

---

## Data Collection Process

### Weekly Data Collection

Every Sunday, collect all 5 KPIs:

```bash
# 1. Open Django shell
cd backend
python manage.py shell

# 2. Run KPI calculations (see SQL above)

# 3. Record in docs/metrics-report.md

# 4. Note any anomalies
```

### Monthly Review

First of each month:
- Review 4-week trend
- Calculate percent change
- Identify patterns
- Plan improvements

### Dashboard (Optional)

Create a simple spreadsheet:

| Week | DAU% | Notes/User | Completeness% | Response (ms) | Uptime% |
|------|------|-----------|---------------|---------------|---------|
| W1   | [10] | [ 3 ]     | [ 0 ]         | [10ms]        | [99%]   |
| W2   | [  ] | [   ]     | [   ]         | [   ]         | [  ]    |
| W3   | [  ] | [   ]     | [   ]         | [   ]         | [  ]    |
| W4   | [  ] | [   ]     | [   ]         | [   ]         | [  ]    |

---

## Analysis & Actions

### If DAU is LOW (< 30%)
- **Possible Causes**: UX issues, missing features, poor onboarding
- **Actions**: 
  - Survey users about pain points
  - Improve getting started guide
  - Add missing features from backlog

### If Notes/User is LOW (< 10)
- **Possible Causes**: Feature not discoverable, unclear value
- **Actions**:
  - Simplify note creation flow
  - Add templates or quick actions
  - Improve documentation

### If Completeness is LOW (< 80%)
- **Possible Causes**: Required fields not enforced, confusing form
- **Actions**:
  - Make important fields required
  - Add inline help text
  - Redesign form UI

### If Response Time is SLOW (> 1000ms)
- **Possible Causes**: Database queries, N+1 problems, server load
- **Actions**:
  - Profile slow endpoints with Django debug toolbar
  - Add database indexes
  - Implement caching

### If Uptime is LOW (< 95%)
- **Possible Causes**: Server crashes, dependency issues, deployments
- **Actions**:
  - Check Render/Vercel logs
  - Implement error monitoring (Sentry)
  - Plan maintenance windows

---

## Tools & Services

### Recommended Monitoring Services

| Tool | Cost | Purpose |
|------|------|---------|
| UptimeRobot | Free | Uptime monitoring |
| Sentry | Free tier | Error tracking |
| New Relic | Paid | Performance monitoring |
| DataDog | Paid | Full observability |
| Render Dashboard | Free | Built-in monitoring |

For MVP: Use Render's free monitoring + manual weekly checks

---

## Next Steps

1. **Baseline Measurement**: Collect all 5 KPIs for Week 1
2. **Weekly Collection**: Set calendar reminder for Sunday
3. **Monthly Analysis**: First of each month, review trends
4. **Action Items**: Document improvements based on KPI trends
5. **Share Results**: Weekly/monthly emails to stakeholders

---

**Version**: 1.0  
**Status**: Active ✅  
**First Measurement**: [Date user starts collecting]  
**Next Review**: [Date]
