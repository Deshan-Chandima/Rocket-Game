import React from 'react';

export default function Welcome({ user, onLogout }) {
  const nickname = user?.nickname || 'PILOT';

  return (
    <div className="retro-card welcome-card-wide">
      <div className="card-header-block">
        <div className="welcome-stamp">STATUS: CLEARED FOR LAUNCH</div>
        
        {/* Exact Required Welcome Message */}
        <h1 className="welcome-title">
          Welcome to Space Fuel, <span className="nickname-highlight">[{nickname}]</span>!
        </h1>
        <div className="mission-ready-banner">
          ✦ MISSION IS READY ✦
        </div>
      </div>

      <div className="pilot-data-grid">
        <div className="data-cell">
          <span className="cell-label">Pilot Identity</span>
          <span className="cell-value">{user?.name || '-'}</span>
        </div>
        <div className="data-cell">
          <span className="cell-label">Assigned Callsign</span>
          <span className="cell-value" style={{ color: 'var(--coral-primary)' }}>
            {user?.nickname || '-'}
          </span>
        </div>
        <div className="data-cell">
          <span className="cell-label">Subspace Frequency</span>
          <span className="cell-value">{user?.email || '-'}</span>
        </div>
        <div className="data-cell">
          <span className="cell-label">Thruster Ignition</span>
          <span className="cell-value" style={{ color: 'var(--teal-accent)' }}>
            ● ONLINE (100% FUEL)
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          type="button"
          className="retro-btn retro-btn-teal"
          onClick={() => alert('Rocket Engines Initialized! Have a safe journey into deep space!')}
        >
          LAUNCH SPACECRAFT
        </button>

        <button
          type="button"
          className="retro-btn"
          style={{ background: '#25344d', color: '#f87171', boxShadow: '0 4px 0 #151e2e' }}
          onClick={onLogout}
        >
          DISCONNECT
        </button>
      </div>
    </div>
  );
}
