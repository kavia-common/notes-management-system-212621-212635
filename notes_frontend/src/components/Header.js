import React from 'react';

/**
 * PUBLIC_INTERFACE
 * A simple header bar with application title and a light/dark toggle placeholder.
 */
function Header({ onToggleTheme, theme }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'linear-gradient(180deg, rgba(37,99,235,0.10), rgba(255,255,255,0.0))',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'saturate(140%) blur(4px)'
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--primary), rgba(37,99,235,0.6))',
            boxShadow: 'var(--shadow-md)'
          }} aria-hidden />
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Ocean Notes</h1>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Capture. Refine. Remember.</div>
          </div>
        </div>
        <button className="btn btn-ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}

export default Header;
