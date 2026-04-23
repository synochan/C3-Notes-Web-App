# C3 Notes Sprint 1 Plan

Sprint duration: `2 weeks`

Sprint goal:
Deliver a stable MVP foundation for C3 Notes with authentication, core note CRUD, persistence, and a clean responsive workspace.

## Selected Stories

| Story ID | Story Summary | Priority | Story Points | Owner |
|---|---|---|---:|---|
| US-01 | Register for an account | High | 5 | Member A |
| US-02 | Sign in and sign out securely | High | 3 | Member C |
| US-03 | Create a note | High | 3 | Member B |
| US-04 | Edit an existing note | High | 3 | Member B |
| US-06 | View all notes in one place | High | 3 | Member D |
| US-07 | Persist notes after refresh | High | 5 | Member C |

Sprint 1 total: `22 story points`

## Sprint Scope Notes

- Sprint 1 is intentionally focused on the core experience and technical foundation.
- Mobile responsiveness is included at a usable MVP level, then refined in later work.
- Search, archiving, advanced productivity fields, and theming are not part of the committed Sprint 1 scope.

## Definition of Done

- The story’s acceptance criteria are satisfied.
- Code is integrated without breaking existing core flows.
- Basic manual testing is completed for the implemented behavior.
- Documentation is updated if the story changes scope, setup, or risk.

## Dependencies

- Account authentication must be working before private user note flows can be completed.
- Backend CRUD endpoints must be available before full frontend integration.
- Database migration and environment configuration must be stable before persistence testing.

## Change Request Update

The Week 3 change request for theme selection is not included in Sprint 1. It is recorded in the backlog as `US-14` and treated as a later enhancement after the MVP is stable.
