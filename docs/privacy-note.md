# Privacy Policy & Data Protection Notice

**Effective Date**: May 11, 2026  
**Last Updated**: May 11, 2026  
**Applies To**: C3 Notes Web Application

---

## 1. INTRODUCTION

The C3 Notes application ("App", "We", "Our") respects your privacy and is committed to protecting your personal data. This notice explains how we collect, use, and protect your information.

**Responsible Party**: Development Team  
**Data Protection Officer**: [Contact Information]

---

## 2. WHAT DATA WE COLLECT

### Account Information
- Username and email address
- Hashed password (never stored in plain text)
- Display name and avatar (optional)
- Account creation date

### User-Generated Content
- Note titles and content
- Categories and tags
- Checklists and productivity flags
- Timestamps (created/modified dates)

### System Logs
- Login dates and times
- API requests made
- IP address (for security)
- Browser type (for troubleshooting)

### We DO NOT Collect
- ❌ Tracking cookies or analytics
- ❌ Location data
- ❌ Device identifiers
- ❌ Your contacts or files
- ❌ Payment information (free service)

---

## 3. HOW WE USE YOUR DATA

### Primary Purposes
1. **Service Delivery**: Store and retrieve your notes
2. **Authentication**: Verify it's you logging in
3. **Security**: Detect and prevent unauthorized access
4. **Support**: Help you if something goes wrong
5. **Compliance**: Meet legal requirements

### Secondary Purposes
- Improving the app based on usage patterns
- Fixing bugs and performance issues
- Sending account notifications (login alerts, password resets)

### We DO NOT
- Sell your data to third parties
- Use your notes for marketing
- Mine your data for AI training
- Share data with advertisers
- Use for non-service purposes without permission

---

## 4. DATA PROTECTION & SECURITY

### Technical Safeguards

| Protection | Implementation | Status |
|---|---|---|
| Encryption in Transit | HTTPS/TLS | ✅ Active |
| Encryption at Rest | Database encryption | ✅ Enabled |
| Authentication | Token-based (Bearer tokens) | ✅ Implemented |
| Authorization | Row-level access control | ✅ Enforced |
| Password Hashing | Django argon2 | ✅ Default |
| API Security | CSRF protection, CORS | ✅ Configured |

### Operational Safeguards

- ✅ Minimal data retention (only active data kept)
- ✅ Limited staff access (only on-demand for support)
- ✅ Regular security audits
- ✅ Automated backups to prevent data loss
- ✅ Incident response plan in place

### You Can Help

- Use a strong, unique password
- Never share your auth token
- Log out on shared computers
- Enable 2FA (when available)
- Report security issues immediately

---

## 5. YOUR RIGHTS & CONTROLS

### Access Your Data
- View all your notes: Available in app
- Export your notes: Via API (JSON/CSV)
- View your profile: Account settings page

### Modify Your Data
- Update profile: Account settings
- Edit notes: In the app
- Change password: Account settings

### Delete Your Data
- Delete individual notes: Note settings → Delete
- Delete account: Account settings → Delete account
  - **Consequence**: All your notes deleted permanently
  - **Timeline**: Immediate
  - **Recovery**: Not possible after confirmation

### Data Portability (GDPR Right)
- Export all your notes: API endpoint available
- Format: JSON or CSV
- Timeline: Immediate
- Cost: Free

---

## 6. DATA RETENTION

| Data Type | Retention Period | Reason |
|---|---|---|
| Active Notes | Until deleted | User ownership |
| Account Profile | Until account deleted | Identity |
| Login Logs | 90 days | Security audit |
| API Logs | 30 days | Debugging |
| Backups | 7 days | Disaster recovery |
| Deleted Data | 30 days | Recovery window |

**After Deletion**: 
- Your data is permanently removed from production
- Backups expire after 7 days
- Logs expire after retention period
- Recovery not possible after 30 days

---

## 7. THIRD-PARTY SERVICES

### Infrastructure Providers
- **Render.com**: Backend hosting
  - Data: Your notes database
  - Privacy: https://render.com/privacy
  - Location: US data centers

- **Vercel**: Frontend hosting
  - Data: Frontend code only
  - Privacy: https://vercel.com/legal/privacy-policy
  - Location: Global CDN

### No Third-Party Integrations
- No OAuth/social logins
- No external analytics
- No third-party libraries with tracking
- No ads or marketing trackers

---

## 8. COMPLIANCE & LEGAL

### GDPR (EU Users)
✅ **Compliant**
- Legal basis: Contractual necessity (service provision)
- Your rights documented above
- Data stored in EU-certified facilities

### CCPA (California Users)
✅ **Compliant**
- Right to know: Available via export
- Right to delete: Use account delete
- Right to opt-out: Not applicable (no tracking)
- No sale of data: Guaranteed

### Local Laws
- Complies with data protection laws in Germany, UK, Canada, Australia
- If questions: Contact Development Team

---

## 9. POLICY CHANGES

We may update this policy to reflect changes in law or our practices.

- **Change Process**: Updated policy posted here
- **Notification**: Email users 30 days before major changes
- **Your Choice**: Continue using = accept new terms

---

## 10. CONTACT US

### Questions About Your Privacy?
- **Response Time**: 5 business days

### Data Subject Rights Request (GDPR)
- **Include**: Full name, email, specific request
- **Timeline**: Response within 30 days

### Security Issue Report
- **Subject**: "SECURITY: [Brief description]"
- **Response**: Confidential review within 24 hours

---

## 11. FREQUENTLY ASKED QUESTIONS

**Q: Can you read my notes?**  
A: No. Only you can access your notes with your login credentials.

**Q: What happens if you get hacked?**  
A: We immediately notify affected users, take the service offline, and investigate. Your passwords are hashed, so even attackers can't access accounts.

**Q: Can I export my notes?**  
A: Yes. Use the API endpoint or account settings to export.

**Q: How long do you keep deleted notes?**  
A: 30 days for recovery. After that, permanently deleted.

**Q: Do you sell my data?**  
A: No. Never. We don't monetize user data.

**Q: Is the app compliant with GDPR?**  
A: Yes. All privacy rights documented above.

**Q: What if I want to close my account?**  
A: Account settings → "Delete account" → Confirm. All data deleted in 30 days.

---

**Version**: 1.0  
**Status**: Approved ✅  
**Next Review**: May 11, 2027
