# C3 Notes QA Plan

## Objective

This QA plan defines how C3 Notes will be tested to support reliable authentication, note management, responsive UI behavior, and deployment readiness.

## Test Levels

### Unit Testing

- Purpose: Validate small, isolated logic such as serializers, model behavior, and frontend utility logic.
- Example targets: note serializer validation, account update validation, status label utilities, sorting behavior.

### Integration Testing

- Purpose: Verify that major components work together correctly.
- Example targets: frontend to API note flows, authentication token handling, account update with profile image upload, archive and pin behavior.

### System Testing

- Purpose: Validate the complete application in a realistic end-to-end flow.
- Example targets: user registration, sign-in, note creation, editing, searching, archiving, theme switching, sign-out, and responsive layout checks.

## Planned Test Tool

- Backend framework: `Pytest`
- Reason for selection: Pytest is lightweight, readable, and well suited to Django API testing.

## Entry Criteria

- The feature under test has defined acceptance criteria.
- Required migrations are applied.
- The environment is stable enough to run tests repeatedly.
- Known blockers are documented before testing starts.

## Exit Criteria

- Planned test cases for the current scope have been executed.
- Critical defects (`S1` and `S2`) are fixed or formally accepted with justification.
- Regression checks pass for impacted features.
- Test evidence is recorded for the sprint or milestone review.

## Severity Levels

| Severity | Meaning | Example |
|---|---|---|
| S1 | Critical system failure | Users cannot sign in or save notes |
| S2 | Major functional problem | Editing, deleting, or viewing notes fails |
| S3 | Moderate issue | UI alignment issue, incorrect feedback message, theme inconsistency |
| S4 | Minor issue | Cosmetic issue with no serious workflow impact |

## Initial Unit Test Coverage Plan

1. Note creation validation rejects empty titles.
2. Note checklist serialization accepts valid checklist data.
3. Note checklist serialization rejects malformed checklist data.
4. Account update validation rejects duplicate usernames.
5. Account update validation rejects duplicate emails.

## Defect Handling Process

- Record every identified issue in `docs/defect-log.md`.
- Assign a severity and status.
- Retest the defect after the fix is applied.
- Mark the issue as `Closed` only after the expected behavior is confirmed.
