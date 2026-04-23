# C3 Notes Deployment Plan

## Target Environment

- Frontend: `Vercel`
- Backend: `Render`
- Database: `Render PostgreSQL`

## Deployment Strategy

Selected strategy: `Rolling deployment with verification after each service update`

Reason:
- The frontend and backend are deployed separately.
- This approach is simple, realistic for the project scale, and appropriate for a coursework portfolio system.

## Deployment Steps

### Backend

1. Push the latest backend-ready code to GitHub.
2. Deploy the backend on Render using the project blueprint or a manual web service.
3. Confirm environment variables are set correctly.
4. Confirm migrations complete successfully.
5. Verify `/api/health/` returns a healthy response.

### Frontend

1. Push the latest frontend-ready code to GitHub.
2. Import the `frontend` directory into Vercel.
3. Set `VITE_API_BASE_URL` to the Render backend URL plus `/api`
4. Deploy the frontend.
5. Verify sign-in, notes list, and note create/edit/delete flows from the live URL.

## Rollback Plan

1. Identify whether the issue is frontend, backend, or environment-related.
2. Revert to the last known stable Git commit or deployment.
3. Re-deploy the previous stable version.
4. Confirm authentication and note CRUD are working again.
5. Log the incident and corrective action for future release reviews.

## Deployment Risks

- Environment variables may be misconfigured
- Database migrations may fail
- Cross-origin settings may block frontend-backend communication
- Uploaded media storage may not be durable in production
