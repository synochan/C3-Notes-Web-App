# C3 Notes SCM Notes

## Branch Naming Rules

- `feature/<name>` for new features
- `bugfix/<name>` for issue resolution
- `hotfix/<name>` for urgent production fixes

## Pull Request Workflow Rule

- All shared changes should go through Pull Requests before merging.
- PRs should include a short summary, testing evidence, screenshots if relevant, and any linked issue or defect reference.

## Merge Conflict Practice Note

Suggested conflict simulation:

1. Create two branches from the same base commit.
2. Edit the same line in a shared file such as `README.md` or a UI component.
3. Merge one branch first.
4. Attempt to merge the second branch and resolve the conflict manually.
5. Document the conflict source, chosen resolution, and verification result.

## Conflict Resolution Record

- Conflict file: `To be recorded during SCM exercise`
- Cause: `To be recorded during SCM exercise`
- Resolution approach: `To be recorded during SCM exercise`
- Verification performed: `To be recorded during SCM exercise`

## Release Tag Note

Target tag for this milestone:

- `v0.5-scm`

This tag should be created and pushed after the SCM milestone evidence is complete.
