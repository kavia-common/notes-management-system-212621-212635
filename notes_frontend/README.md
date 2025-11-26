# Lightweight React Template for KAVIA

This project now includes a Notes app UI using the "Ocean Professional" theme.

## API Base URL

The frontend expects a backend at `http://localhost:3001`. You can override it using:
- Environment variable: `REACT_APP_API_BASE_URL`
- Defaults to `http://localhost:3001`

No proxy is required when using the environment variable.

## CRUD

- List: GET /notes?search=...
- Get: GET /notes/:id
- Create: POST /notes
- Update: PUT /notes/:id
- Delete: DELETE /notes/:id

Ensure the backend implements these endpoints.
