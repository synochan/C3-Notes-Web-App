# Product Backlog

Project: Simple Notes Web App

This backlog is designed for a realistic 15-week academic project scope. It focuses on a polished core product first, then expands into quality-of-life improvements without overengineering the app.

## Backlog Table

| ID | User Story | Priority | Story Points | Acceptance Criteria |
|---|---|---|---:|---|
| US-01 | As a user, I want to create a new note so that I can quickly save information. | High | 3 | - A note can be created with a title and optional content.<br>- The new note appears in the notes list after saving.<br>- Validation prevents saving a note without a title. |
| US-02 | As a user, I want to edit an existing note so that I can keep my information up to date. | High | 3 | - A user can select an existing note for editing.<br>- Changes are saved and reflected immediately in the interface.<br>- The updated note moves to the most recently updated position if sorting is applied. |
| US-03 | As a user, I want to delete a note so that I can remove information I no longer need. | High | 2 | - A delete action is available for each note.<br>- The user is prompted to confirm deletion.<br>- The deleted note is removed from both the UI and backend data store. |
| US-04 | As a user, I want to view all my notes in one place so that I can browse them easily. | High | 3 | - The main page displays a list of saved notes.<br>- Each note shows at least a title and short content preview.<br>- The list loads data from the backend successfully. |
| US-05 | As a user, I want notes to persist after refresh so that my data is not lost between sessions. | High | 5 | - Notes are stored in the backend database.<br>- Refreshing the page retains previously created notes.<br>- The frontend correctly retrieves notes from the API on load. |
| US-06 | As a user, I want a clean and responsive interface so that the app is easy to use on desktop and mobile devices. | High | 5 | - The layout remains usable on common mobile and desktop screen sizes.<br>- Text, forms, and buttons are readable and accessible.<br>- Key actions remain easy to identify across screen sizes. |
| US-07 | As a user, I want to search notes by title or content so that I can find information faster. | Medium | 5 | - A search input is available in the notes interface.<br>- Matching notes are filtered based on the search term.<br>- Clearing the search restores the full notes list. |
| US-08 | As a user, I want to pin important notes so that I can keep priority items at the top. | Medium | 3 | - A note can be marked as pinned.<br>- Pinned notes appear before non-pinned notes.<br>- The pinned state is saved in the backend. |
| US-09 | As a user, I want to organize notes with tags or categories so that I can manage them more effectively. | Medium | 5 | - A note can be assigned at least one tag or category.<br>- Tags or categories are visible in the note list or note editor.<br>- Users can filter notes by tag or category. |
| US-10 | As a user, I want clear feedback for saving, updating, and deleting actions so that I understand what happened. | Medium | 2 | - Success messages appear after create, update, and delete actions.<br>- Error messages appear when requests fail.<br>- Messages are presented in a clear, non-disruptive way. |
| US-11 | As a user, I want an empty state when no notes exist so that the interface still feels clear and intentional. | Low | 1 | - The app shows a friendly empty-state message when no notes are available.<br>- The empty state includes a clear prompt to create a first note.<br>- The empty state does not look broken or unfinished. |
| US-12 | As a project reviewer, I want the application deployed online so that I can assess the project without running it locally. | High | 5 | - The frontend is deployed to Vercel.<br>- The backend is deployed to Render.<br>- The live deployment can create, view, edit, and delete notes successfully. |

## Change Request Simulation

New requirement added in Week 3:

`CR-01`: The application should support searching notes by title or content.

Impact:
- Added `US-07` to the backlog as a medium-priority requirement.
- Included search preparation in Sprint 1 planning as stretch work only if core CRUD tasks finish early.
- Reflected implementation and scope risks in the risk register.
