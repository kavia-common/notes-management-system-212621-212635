import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Note editor for title and content with explicit save.
 */
function NoteEditor({ note, loading, error, onSave }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setLocalError('');
  }, [note?.id]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      setLocalError('Please add a title or content before saving.');
      return;
    }
    setLocalError('');
    onSave({ title: title.trim(), content });
  };

  return (
    <div>
      <div className="editor-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 10, height: 10, borderRadius: 9999,
            background: loading ? 'var(--secondary)' : '#10b981'
          }} aria-label={loading ? 'Loading' : 'Ready'} />
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Editor</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={handleSave} disabled={loading}>
            💾 Save
          </button>
        </div>
      </div>

      <div className="editor-body">
        {error && <div className="alert alert-error" role="alert">{error}</div>}
        {localError && <div className="alert alert-error" role="alert">{localError}</div>}

        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          className="textarea"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default NoteEditor;
