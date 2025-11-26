const BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001').replace(/\/+$/, '');

// Helper to handle JSON fetch with error handling
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  const contentType = res.headers.get('content-type') || '';
  let body = null;
  if (contentType.includes('application/json')) {
    body = await res.json().catch(() => null);
  } else {
    body = await res.text().catch(() => null);
  }
  if (!res.ok) {
    const message = body && body.detail ? body.detail : (typeof body === 'string' ? body : 'Request failed');
    throw new Error(message || `HTTP ${res.status}`);
  }
  return body;
}

// PUBLIC_INTERFACE
const api = {
  /** List notes with optional search string. */
  async listNotes(search) {
    const q = search ? `?search=${encodeURIComponent(search)}` : '';
    return request(`/notes${q}`, { method: 'GET' });
  },
  /** Retrieve a single note by ID. */
  async getNote(id) {
    return request(`/notes/${encodeURIComponent(id)}`, { method: 'GET' });
  },
  /** Create a note with title and content. */
  async createNote({ title, content }) {
    return request('/notes', { method: 'POST', body: JSON.stringify({ title, content }) });
  },
  /** Update a note by ID with title and content. */
  async updateNote(id, { title, content }) {
    return request(`/notes/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify({ title, content }) });
  },
  /** Delete a note by ID. */
  async deleteNote(id) {
    return request(`/notes/${encodeURIComponent(id)}`, { method: 'DELETE' });
  }
};

export default api;
