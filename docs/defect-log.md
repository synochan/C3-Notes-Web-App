# C3 Notes Defect Log

| Bug ID | Description | Severity | Status | PR Link |
|---|---|---|---|---|
| BUG-001 | Notes panel height expanded the full page instead of scrolling internally, causing poor usability on longer note lists. | S3 | Closed | To be added when PR is created |

## Notes

- Root cause: the notes workspace used a minimum height without a strong viewport-based height cap.
- Resolution summary: the notes list was moved into a fixed-height internal scroll region so the overall app shell remains stable.
- Retest result: scrolling now happens inside the `Your Notes` panel rather than enlarging the whole page.
