# C3 Notes Risk Register

| Risk | Likelihood (1-5) | Impact (1-5) | Score | Mitigation | Owner |
|---|---:|---:|---:|---|---|
| Project scope grows beyond a realistic 15-week academic timeline | 4 | 5 | 20 | Keep the MVP centered on accounts, notes, archive, and responsive UX; move non-essential ideas to later milestones | Member A |
| Frontend and backend integration takes longer than expected | 4 | 4 | 16 | Agree on API shape early, test endpoints independently, and integrate features incrementally | Member C |
| Deployment issues appear late in the semester | 3 | 5 | 15 | Prepare Render and Vercel configuration early, document environment variables, and validate before the final weeks | Member C |
| Authentication or account bugs block access to user notes | 3 | 5 | 15 | Prioritize auth testing, protect private endpoints, and include regression checks after account changes | Member B |
| Mobile responsiveness is weaker than desktop quality near submission time | 3 | 4 | 12 | Reserve dedicated UI review time for small screens and include mobile acceptance criteria in testing | Member D |
| Database migration or environment configuration problems delay progress | 3 | 4 | 12 | Use migration discipline, document setup clearly, and validate schema changes on development and deployment environments | Member C |
| Team availability becomes uneven during busy academic weeks | 3 | 4 | 12 | Use smaller sprint tasks, rotate ownership, and make blockers visible early during check-ins | Member A |
| Documentation falls out of sync with the implementation | 3 | 3 | 9 | Assign documentation ownership and update delivery docs at sprint close | Member D |
| A change request introduces extra UI complexity or rework | 3 | 3 | 9 | Re-evaluate priority before accepting the change and update backlog and sprint scope transparently | Member A |
| User-uploaded media storage is unreliable in production | 2 | 4 | 8 | Use local upload support initially, then plan external object storage if the feature becomes critical | Member C |

## Notes

- Score is calculated as `Likelihood x Impact`.
- Any risk scoring 15 or above should be reviewed at the start and end of each sprint.
- The simulated change request for theme selection slightly increases UI consistency and testing risk, so design and regression testing should be tracked carefully.
