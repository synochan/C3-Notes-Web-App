# C3 Notes Technical Debt Register

## Current Technical Debt Items

| ID | Debt Item | Reason It Matters | Priority |
|---|---|---|---|
| TD-01 | Theme styling is distributed across multiple components instead of a more centralized design system | Makes long-term UI maintenance slower and increases styling inconsistency risk | High |
| TD-02 | Avatar uploads use local media storage rather than durable cloud storage | Production uploads may not persist reliably on the current hosting approach | High |
| TD-03 | Automated test coverage is still limited | Increases regression risk when features change | High |
| TD-04 | Sidebar navigation is functional but could be abstracted into reusable navigation components | Repetition makes future layout changes slower | Medium |
| TD-05 | Notes list and note editor logic could be separated further for easier state management | Reduces complexity as the workspace grows | Medium |

## Selected Debt Item To Address

Selected item: `TD-04`

Planned refactor:
- Clean up repeated navigation button styling and interaction patterns
- Reduce duplication in the workspace shell
- Improve maintainability for future feature additions

## Refactor Outcome

Status: Completed

Completed changes:
- Extracted sidebar navigation into a reusable frontend component
- Centralized repeated navigation button rendering into mapped navigation groups
- Kept mobile close behavior and desktop sidebar behavior consistent through shared props

Expected benefit:
- Future sidebar updates can be made in one place instead of editing repeated inline markup
- Navigation styling and interaction behavior are less likely to drift across sections
