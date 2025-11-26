# Lightweight React Template for KAVIA

This project includes a Notes app UI using the "Ocean Professional" theme.

## API Base URL

The frontend targets a backend at `http://localhost:3001` by default.
- Override with environment variable: `REACT_APP_API_BASE_URL`
- Example: `REACT_APP_API_BASE_URL=http://localhost:3001 npm start`

No proxy is required when using the environment variable.

## CRUD (relative to API base url)

- List: GET /notes?search=...
- Get: GET /notes/:id
- Create: POST /notes
- Update: PUT /notes/:id
- Delete: DELETE /notes/:id

Ensure the backend implements these endpoints.

See the backend workspace's INTEGRATION_SMOKETEST.md for full end-to-end steps and a smoke test checklist.
