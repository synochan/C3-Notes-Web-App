# Risk Register

| Risk | Likelihood (1-5) | Impact (1-5) | Score | Mitigation | Owner |
|---|---:|---:|---:|---|---|
| Project scope grows beyond what is realistic for 15 weeks | 4 | 5 | 20 | Keep MVP limited to core note management; move non-essential features to future enhancements | PM / Scrum Lead |
| Frontend and backend integration takes longer than planned | 4 | 4 | 16 | Define API contract early, test endpoints before UI integration, integrate incrementally | Full-Stack Developer |
| Deployment issues occur on Vercel or Render near deadline | 3 | 5 | 15 | Prepare deployment early, document environment variables, run staging checks before final week | DevOps Lead |
| Team members have uneven availability during the semester | 3 | 4 | 12 | Use small sprint tasks, share progress weekly, rotate support responsibilities when needed | PM / Scrum Lead |
| Bugs in CRUD operations affect core application reliability | 3 | 5 | 15 | Prioritize manual QA for create, edit, delete, and persistence flows in every sprint | QA Lead |
| Database configuration problems slow development or deployment | 3 | 4 | 12 | Use local fallback during development, document PostgreSQL setup clearly, test migrations early | DevOps Lead |
| UI quality falls below portfolio expectations | 2 | 4 | 8 | Review design consistency regularly, collect feedback, refine layout and interactions before final submission | UI/UX Developer |
| Change requests add features that disrupt planned sprint work | 4 | 3 | 12 | Evaluate changes before accepting them, re-prioritize backlog, update sprint scope transparently | PM / Scrum Lead |
| Documentation becomes outdated as implementation changes | 3 | 3 | 9 | Assign documentation ownership, review docs at each sprint close, update setup and planning files together with code changes | Docs Lead |
| Search feature adds more complexity than expected | 2 | 3 | 6 | Treat search as stretch work until MVP stability is complete, keep implementation simple | Frontend Developer |

## Notes

- Score is calculated as `Likelihood x Impact`.
- High-score risks should be reviewed at the start and end of each sprint.
- The Week 3 change request increased risk around scope growth and sprint disruption, so those items should remain actively monitored.
