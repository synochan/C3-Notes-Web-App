# C3 Notes Risk Register

## 👥 Team Members

- **Project Coordinator:** Carmeli Jean Marie Gadrinab
- **Backend Developer:** Christian Dagcuta
- **Frontend Developer:** Charmaine Opiso

---

## ⚠️ Risk Register

| Risk | Likelihood (1-5) | Impact (1-5) | Score | Mitigation | Owner |
|---|---:|---:|---:|---|---|
| Project scope grows beyond a realistic 15-week academic timeline | 4 | 5 | 20 | Keep the MVP centered on accounts, notes, archive, and responsive UX; move non-essential ideas to later milestones | Project Coordinator |
| Frontend and backend integration takes longer than expected | 4 | 4 | 16 | Agree on API shape early, test endpoints independently, and integrate features incrementally | Frontend Developer |
| Deployment issues appear late in the semester | 3 | 5 | 15 | Prepare Render and Vercel configuration early, document environment variables, and validate before the final weeks | Frontend Developer |
| Authentication or account bugs block access to user notes | 3 | 5 | 15 | Prioritize auth testing, protect private endpoints, and include regression checks after account changes | Backend Developer |
| Mobile responsiveness is weaker than desktop quality near submission time | 3 | 4 | 12 | Reserve dedicated UI review time for small screens and include mobile acceptance criteria in testing | Frontend Developer |
| Database migration or environment configuration problems delay progress | 3 | 4 | 12 | Use migration discipline, document setup clearly, and validate schema changes on development and deployment environments | Backend Developer |
| Team availability becomes uneven during busy academic weeks | 3 | 4 | 12 | Use smaller sprint tasks, rotate ownership, and make blockers visible early during check-ins | Project Coordinator |
| Documentation falls out of sync with the implementation | 3 | 3 | 9 | Assign documentation ownership and update delivery docs at sprint close | Project Coordinator |
| A change request introduces extra UI complexity or rework | 3 | 3 | 9 | Re-evaluate priority before accepting the change and update backlog and sprint scope transparently | Project Coordinator |
| User-uploaded media storage is unreliable in production | 2 | 4 | 8 | Use local upload support initially, then plan external object storage if the feature becomes critical | Frontend Developer |

---

## 📌 Notes

- Score is calculated as `Likelihood × Impact`
- Risks with score **15 and above are high priority**
- High risks must be reviewed at sprint planning and sprint review

---

## 🔁 Risk Monitoring Rule

All high-impact risks must be actively monitored throughout development, not just documented.
