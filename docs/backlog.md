# C3 Notes Product Backlog

Project: `C3 Notes`

Scope note: This backlog is sized for a realistic 15-week academic project. It prioritizes a strong, usable notes platform with authentication, note management, responsive design, deployment, and maintainability work.

## Backlog

| ID | User Story | Priority | Story Points | Acceptance Criteria |
|---|---|---|---:|---|
| US-01 | As a user, I want to register for an account so that I can keep my notes private. | High | 5 | - A new user can create an account with username, email, and password.<br>- Duplicate usernames and emails are rejected with a clear error.<br>- A successful registration signs the user into the application. |
| US-02 | As a user, I want to sign in and sign out securely so that only I can access my notes. | High | 3 | - A valid user can sign in with username and password.<br>- Invalid credentials show an error message.<br>- Signing out clears the active session and returns the user to the auth screen. |
| US-03 | As a user, I want to create a note so that I can save ideas quickly. | High | 3 | - A note can be created with a title and optional content.<br>- The note appears in the notes list immediately after saving.<br>- Validation prevents saving a note without a title. |
| US-04 | As a user, I want to edit an existing note so that I can keep its information accurate. | High | 3 | - A user can open an existing note in the editor.<br>- Changes are saved successfully and reflected in the list.<br>- The note update time changes after a successful edit. |
| US-05 | As a user, I want to delete a note so that I can remove notes I no longer need. | High | 2 | - A delete action is available for each note.<br>- The app asks for confirmation before deletion.<br>- The deleted note is removed from the UI and backend. |
| US-06 | As a user, I want to view all my notes in one place so that I can manage them efficiently. | High | 3 | - The notes workspace shows a list of the current user’s notes.<br>- Each note displays key metadata such as title and updated date.<br>- Notes are loaded from the backend successfully. |
| US-07 | As a user, I want my notes to persist after refresh so that my work is not lost. | High | 5 | - Notes are stored in the database.<br>- Refreshing the browser does not remove saved notes.<br>- The frontend reloads the user’s existing notes on startup. |
| US-08 | As a user, I want to search notes by title or content so that I can find information quickly. | Medium | 3 | - A search field is available in the notes workspace.<br>- The list filters matching notes based on the search term.<br>- Clearing the search restores the full result set. |
| US-09 | As a user, I want to pin important notes so that they stay visible at the top of my workspace. | Medium | 3 | - A note can be pinned and unpinned.<br>- Pinned notes appear before non-pinned notes.<br>- The pinned state is saved in the backend. |
| US-10 | As a user, I want to archive notes so that my main workspace stays uncluttered. | Medium | 3 | - A note can be archived and restored.<br>- Archived notes are separated from active notes.<br>- The archive state remains saved after refresh. |
| US-11 | As a user, I want to add checklist items and deadlines to a note so that I can use the app for lightweight task planning. | Medium | 5 | - A note supports checklist items with completed states.<br>- A note can store a deadline date and time.<br>- Checklist and deadline information display correctly in the note view. |
| US-12 | As a user, I want to update my profile details so that my account stays accurate and personalized. | Medium | 3 | - A user can update display name, email, and username.<br>- A user can upload or remove a profile image.<br>- Saved profile changes appear in the sidebar profile card. |
| US-13 | As a user, I want the app to be responsive on mobile and desktop so that I can manage notes comfortably on different devices. | High | 5 | - Navigation and note actions remain usable on mobile screens.<br>- Modals, cards, and forms fit without horizontal overflow.<br>- Important actions remain visible and easy to reach across breakpoints. |
| US-14 | As a user, I want to switch between visual themes so that I can personalize the workspace style. | Low | 3 | - A theme setting is available in account settings.<br>- Choosing a theme updates the app shell and major UI surfaces.<br>- The selected theme persists after refresh. |
| US-15 | As a project reviewer, I want the system deployed online so that I can assess the app without local setup. | High | 5 | - The frontend is deployed to Vercel.<br>- The backend is deployed to Render.<br>- The live deployment supports sign-in and note CRUD successfully. |

## Change Request Simulation

### CR-01: Add visual theme selection

New requirement:
The application should provide selectable color themes with curated palette sets and gradient-based styles.

Backlog impact:
- Added `US-14` as a low-priority enhancement with clear personalization value.
- Kept the requirement outside Sprint 1 so it does not delay core delivery.
- Linked the change to design consistency and testing considerations in the risk register and sprint notes.
