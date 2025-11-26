import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import EmptyState from './components/EmptyState';
import api from './api/client';

// PUBLIC_INTERFACE
function App() {
  /**
   * The main Notes app layout and state manager.
   * Manages: theme, notes list, selection, search, loading/error states, and CRUD orchestration.
   */
  const [theme, setTheme] = useState('light');

  // Data states
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Fetching and UI states
  const [listLoading, setListLoading] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);
  const [error, setError] = useState('');
  const [editorError, setEditorError] = useState('');
  const [search, setSearch] = useState('');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load list on mount and whenever search changes
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setListLoading(true);
        setError('');
        const data = await api.listNotes(search);
        if (!ignore) {
          setNotes(data || []);
          // If current selected is filtered out, clear selection
          if (selectedId && !(data || []).some(n => n.id === selectedId)) {
            setSelectedId(null);
          }
        }
      } catch (e) {
        if (!ignore) {
          setError(e?.message || 'Failed to load notes.');
        }
      } finally {
        if (!ignore) setListLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedNote = useMemo(() => {
    return notes.find(n => n.id === selectedId) || null;
  }, [notes, selectedId]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle light/dark theme. */
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleSelect = async (id) => {
    /** Select a note and ensure its latest content is loaded. */
    setSelectedId(id);
    setEditorError('');
    setEditorLoading(true);
    try {
      const fresh = await api.getNote(id);
      // Update list copy with fresh content for seamless editor view
      setNotes(prev => prev.map(n => (n.id === id ? fresh : n)));
    } catch (e) {
      setEditorError(e?.message || 'Failed to load note.');
    } finally {
      setEditorLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleCreate = async () => {
    /** Create a new note and select it. */
    setEditorError('');
    try {
      const created = await api.createNote({ title: 'Untitled note', content: '' });
      // Prepend for visibility
      setNotes(prev => [created, ...prev]);
      setSelectedId(created.id);
    } catch (e) {
      setError(e?.message || 'Failed to create note.');
    }
  };

  // PUBLIC_INTERFACE
  const handleDelete = async (id) => {
    /** Delete a note and update state. */
    setEditorError('');
    try {
      await api.deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (e) {
      setError(e?.message || 'Failed to delete note.');
    }
  };

  // PUBLIC_INTERFACE
  const handleSave = async (id, { title, content }) => {
    /** Persist note updates to backend and update local state. */
    setEditorError('');
    setEditorLoading(true);
    try {
      const updated = await api.updateNote(id, { title, content });
      setNotes(prev => prev.map(n => (n.id === id ? updated : n)));
    } catch (e) {
      setEditorError(e?.message || 'Failed to save note.');
    } finally {
      setEditorLoading(false);
    }
  };

  return (
    <div className="app-root">
      <Header onToggleTheme={toggleTheme} theme={theme} />
      <div className="app-content">
        <aside className="sidebar">
          <NoteList
            notes={notes}
            loading={listLoading}
            error={error}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={handleDelete}
            search={search}
            onSearch={setSearch}
          />
        </aside>
        <main className="editor-area">
          {selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              loading={editorLoading}
              error={editorError}
              onSave={(payload) => handleSave(selectedNote.id, payload)}
            />
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
