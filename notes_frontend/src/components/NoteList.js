import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar note list with search, create, and delete actions.
 */
function NoteList({
  notes,
  loading,
  error,
  selectedId,
  onSelect,
  onCreate,
  onDelete,
  search,
  onSearch
}) {
  return (
    <div>
      <div className="list-header">
        <div className="search-row">
          <input
            className="input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search notes"
          />
          <button className="btn" onClick={onCreate} aria-label="Create note">
            ＋ New
          </button>
        </div>
        {loading && <div className="alert">Loading notes…</div>}
        {error && <div className="alert alert-error" role="alert">{error}</div>}
      </div>

      <ul className="note-list">
        {(!loading && notes.length === 0 && !error) ? (
          <li style={{ color: 'var(--muted)', padding: 8 }}>No notes found.</li>
        ) : null}
        {notes.map(note => (
          <li
            key={note.id}
            className={`note-item ${selectedId === note.id ? 'active' : ''}`}
            onClick={() => onSelect(note.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onSelect(note.id); }}
          >
            <div className="item-title" title={note.title || 'Untitled'}>
              {note.title || 'Untitled'}
            </div>
            <div className="item-meta">
              <span title={note.updated_at || note.created_at || ''}>
                {(note.updated_at || note.created_at || '').toString().slice(0, 19).replace('T', ' ')}
              </span>
              <button
                className="btn btn-ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Delete this note?')) onDelete(note.id);
                }}
                aria-label={`Delete ${note.title || 'note'}`}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
