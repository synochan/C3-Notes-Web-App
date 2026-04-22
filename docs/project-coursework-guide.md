# Simple Notes Web App Coursework Guide

This guide turns the coursework brief into a practical step-by-step plan for the **Simple Notes Web App** project. Use it as your working checklist throughout the semester.

Project: Simple Notes Web App  
Stack: React (Vite + TypeScript), Tailwind CSS, Django, Django REST Framework, PostgreSQL  
Deployment target: Vercel (frontend) + Render (backend)

---

## How To Use This Guide

For each week or task block, this guide tells you:

- what you need to do
- what files to create or update
- what evidence to keep
- what the final output should be

---

## Week 2: Planning, Backlog, Sprint Setup

### Objective

Define a realistic 15-week project scope, create the product backlog, plan Sprint 1, and assign team roles.

### What To Do

1. Confirm the project scope is realistic for 15 weeks.
2. Create `docs/backlog.md`.
3. Write at least 10 user stories using this format:
   `As a ___, I want ___ so that ___`
4. For each user story, add:
   - priority: `High`, `Medium`, or `Low`
   - story points: `1`, `2`, `3`, `5`, or `8`
   - 2 to 4 acceptance criteria
5. Create `docs/sprint-1-plan.md`.
6. Select 4 to 6 stories for Sprint 1.
7. Assign an owner for each Sprint 1 story.
8. Create `docs/schedule.md`.
9. Add a weekly schedule table with:
   - Week
   - Goals
   - Deliverables
10. Create `docs/team-roles.md`.
11. Assign rotating roles:
   - PM / Scrum
   - QA Lead
   - DevOps Lead
   - Docs Lead
12. Commit and push the completed planning files to GitHub.

### Files Required

- `docs/backlog.md`
- `docs/sprint-1-plan.md`
- `docs/schedule.md`
- `docs/team-roles.md`

### Evidence To Keep

- Git commit showing planning docs added
- GitHub push to remote repository
- Final contents of the four docs

### Expected Output

- Backlog with at least 10 well-written stories
- Sprint 1 plan with 4 to 6 selected stories and owners
- Weekly project schedule
- Team roles and responsibilities document

---

## Week 3: Risk Management and Team Workflow Controls

### Objective

Document project risks and set up a proper Pull Request-based Git workflow.

### What To Do

1. Create `docs/risk-register.md`.
2. Add at least 8 risks.
3. For each risk, include:
   - Risk
   - Likelihood `(1-5)`
   - Impact `(1-5)`
   - Score `(Likelihood x Impact)`
   - Mitigation
   - Owner
4. Define the team Git workflow rule:
   - all changes must go through Pull Requests
5. Create `.github/pull_request_template.md` with:
   - Summary
   - Screenshots
   - Testing evidence
   - Linked issue
6. Add issue templates:
   - bug report
   - feature request
7. Perform a change request simulation:
   - invent 1 new requirement
   - update the backlog
   - update the sprint plan
   - update the risk register
8. Create a feature branch.
9. Push the feature branch to GitHub.
10. Open a Pull Request.
11. Merge the Pull Request correctly.
12. Take a screenshot of the PR page.

### Files Required

- `docs/risk-register.md`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`

### Evidence To Keep

- Screenshot of the Pull Request page
- Feature branch name
- PR link
- Merge confirmation on GitHub

### Expected Output

- Risk register with 8 or more risks
- PR template and issue templates
- Updated backlog and sprint plan after a simulated change request
- Evidence of branch, PR, and merge workflow

---

## Week 4: Software Quality Assurance, Testing, and Defect Management

### Objective

Create a QA plan, set up automated testing, write unit tests, and document a bug through its full lifecycle.

### What To Do

1. Create `docs/qa-plan.md`.
2. In the QA plan, define:
   - test levels: `unit`, `integration`, `system`
   - entry criteria
   - exit criteria
   - severity levels: `S1`, `S2`, `S3`, `S4`
3. Choose and install a testing framework:
   - frontend: `Vitest` or `Jest`
   - backend: `Pytest`
4. Write at least 5 unit tests.
5. Run the tests and confirm they pass.
6. Create `docs/defect-log.md`.
7. Add a defect log table with:
   - Bug ID
   - Description
   - Severity
   - Status
   - PR link
8. Create 1 intentional bug:
   - make a test fail
   - log the defect
   - fix the bug
   - update the defect status to `Closed`
9. Fix the bug through a PR workflow if required by your class process.
10. Take a screenshot showing passing tests after the fix.

### Files Required

- `docs/qa-plan.md`
- `docs/defect-log.md`
- test files in frontend or backend

### Evidence To Keep

- Screenshot of passing tests
- Test command output
- Bug log entry before and after closure
- PR link for the bug fix

### Expected Output

- QA plan
- At least 5 unit tests
- Passing test suite
- Defect log showing one bug was created, fixed, and closed

---

## Week 5: Software Configuration Management and Git Mastery

### Objective

Demonstrate good Git branching practices, PR workflow, conflict resolution, and release tagging.

### What To Do

1. Apply branch naming rules:
   - `feature/<name>`
   - `bugfix/<name>`
   - `hotfix/<name>`
2. Optionally add `CODEOWNERS`.
3. Create a feature branch.
4. Implement 1 new feature on that branch.
5. Use clear commit messages.
6. Push the branch.
7. Open a Pull Request.
8. Merge the PR into the `dev` branch if your lecturer requires `dev`.
   - If your repo does not yet have `dev`, create it first.
9. Practice merge conflict resolution:
   - simulate a conflict or use one provided by your teacher
   - resolve it manually
   - document what happened in `docs/scm-notes.md`
10. Create `docs/release-notes.md` for version `v0.5-scm`.
11. Tag the release:
   - `v0.5-scm`
12. Push the tag to GitHub.

### Files Required

- `docs/scm-notes.md`
- `docs/release-notes.md`
- optionally `.github/CODEOWNERS`

### Evidence To Keep

- feature branch name
- PR link
- merge conflict screenshot or notes
- Git tag visible on GitHub
- release notes file

### Expected Output

- One completed feature through a PR
- Merge conflict resolved and documented
- Release notes for `v0.5-scm`
- Tag pushed to GitHub

---

## Week 7: Deployment and Support

### Objective

Deploy the application, define deployment controls, and document support procedures.

### What To Do

1. Create `docs/deployment-plan.md`.
2. Define:
   - target environment
   - deployment strategy
   - rollout approach
   - rollback steps
3. Deploy the app to an online environment:
   - frontend on Vercel
   - backend on Render
4. Verify the deployed system works online.
5. Create `docs/release-checklist.md`.
6. Include in the release checklist:
   - tests passed
   - CI green
   - version tagged
   - backup or rollback ready
7. Create `docs/support-plan.md`.
8. Define:
   - issue reporting process
   - support ownership
   - response times
   - escalation path
   - common issues
9. Take a screenshot of the deployed system or save the live link.

### Files Required

- `docs/deployment-plan.md`
- `docs/release-checklist.md`
- `docs/support-plan.md`

### Evidence To Keep

- deployed app URL
- screenshot of deployed frontend
- deployment dashboard evidence if required

### Expected Output

- Live deployed system
- Deployment plan
- Release checklist
- Support plan

---

## Week 8: Maintenance, Refactoring, and Performance Optimization

### Objective

Document technical debt, perform one meaningful refactor, and compare before/after results.

### What To Do

1. Create `docs/tech-debt.md`.
2. List at least 5 technical debt items.
3. Choose 1 item to fix.
4. Refactor the code:
   - cleaner functions
   - improved naming
   - removed duplication
   - better structure
5. Measure simple before vs after performance:
   - page load feel
   - API response observation
   - render speed
   - reduced repeated logic
6. Create `docs/performance.md`.
7. Document:
   - what was changed
   - why it was technical debt
   - before result
   - after result
8. Commit and push the refactor changes.
9. Tag the release:
   - `v0.8-maintenance`
10. Push the tag to GitHub.

### Files Required

- `docs/tech-debt.md`
- `docs/performance.md`

### Evidence To Keep

- PR link for refactor work
- before/after notes or screenshots
- tag on GitHub

### Expected Output

- Technical debt register
- One completed refactor
- Before vs after performance note
- `v0.8-maintenance` tag pushed

---

## Git Workflow Rules You Should Follow

Use these rules throughout the project:

1. Never work directly on `main` for new feature work.
2. Create a branch first:
   - `feature/<name>`
   - `bugfix/<name>`
   - `hotfix/<name>`
3. Commit with clear messages.
4. Push the branch to GitHub.
5. Open a Pull Request.
6. Review the PR.
7. Merge only after checks and review are complete.
8. Pull the latest branch locally after merge.

Recommended commit message style:

- `Add search bar to notes list`
- `Fix note deletion error handling`
- `Create QA plan and defect log`
- `Refactor API request helpers`

---

## Suggested Deliverables Checklist

Use this as your high-level completion tracker.

### Planning and Backlog

- [ ] `docs/backlog.md`
- [ ] `docs/sprint-1-plan.md`
- [ ] `docs/schedule.md`
- [ ] `docs/team-roles.md`

### Risk and Workflow

- [ ] `docs/risk-register.md`
- [ ] `.github/pull_request_template.md`
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] PR screenshot

### QA and Testing

- [ ] `docs/qa-plan.md`
- [ ] `docs/defect-log.md`
- [ ] at least 5 unit tests
- [ ] screenshot of passing tests

### SCM and Release Control

- [ ] `docs/scm-notes.md`
- [ ] `docs/release-notes.md`
- [ ] tag `v0.5-scm`

### Deployment and Support

- [ ] `docs/deployment-plan.md`
- [ ] `docs/release-checklist.md`
- [ ] `docs/support-plan.md`
- [ ] deployed app screenshot or link

### Maintenance and Refactoring

- [ ] `docs/tech-debt.md`
- [ ] `docs/performance.md`
- [ ] tag `v0.8-maintenance`

---

## Recommended Order Of Work

Follow this order to stay organized:

1. Finish planning and backlog documents
2. Finish risk register and workflow templates
3. Complete branch and PR evidence
4. Set up tests and defect management
5. Practice proper Git feature workflow and merge conflict handling
6. Deploy the app and document support
7. Do maintenance, refactoring, and performance notes

---

## Final Advice

- Keep every file professional, clear, and easy to read.
- Avoid making the project bigger than needed.
- Match every document to the actual state of the app.
- Keep screenshots organized in a folder if your lecturer asks for proof.
- Update docs when scope changes so your coursework stays consistent.

