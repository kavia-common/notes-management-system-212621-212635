import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Friendly empty state encouraging creating or selecting a note.
 */
function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-card">
        <div style={{ fontSize: 42, marginBottom: 8 }}>🗒️</div>
        <h2 style={{ marginBottom: 6 }}>Welcome to Ocean Notes</h2>
        <p style={{ color: 'var(--muted)' }}>
          Select a note from the left or create a new one to get started.
        </p>
      </div>
    </div>
  );
}

export default EmptyState;
