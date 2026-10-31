import React from 'react';

export default function ComingSoon({ pageName, onNavigate, user }) {
  const displayTitle = (pageName || 'PAGE').toUpperCase();

  return (
    <div className="retro-auth-card coming-soon-card">
      <div className="card-terminal-bar">
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-title">SECTOR_STATUS // {displayTitle}_UNDER_CONSTRUCTION</span>
      </div>

      <div className="coming-soon-content">
        <div className="coming-soon-icon-box">
          <span className="radar-icon">📡</span>
          <div className="radar-ping"></div>
        </div>

        <div className="status-badge-retro">
          <span className="blinking-cursor">■</span> TRANSMISSION PENDING
        </div>

        <h2 className="coming-soon-title">COMING SOON</h2>
        <p className="coming-soon-subtitle">
          THE <span className="highlight-section">{displayTitle}</span> MODULE IS UNDER CONSTRUCTION
        </p>
        <div className="section-divider"></div>

        <p className="coming-soon-desc">
          Deep-space engineers are currently calibrating orbital telemetry, thruster physics, and plasma fuel nodes for this sector.
        </p>

        <div className="coming-soon-actions">
          {user ? (
            <button
              type="button"
              className="retro-btn btn-coral"
              onClick={() => onNavigate('welcome')}
            >
              🚀 RETURN TO MISSION HUD
            </button>
          ) : (
            <>
              <button
                type="button"
                className="retro-btn btn-coral"
                onClick={() => onNavigate('login')}
              >
                ⚡ PILOT LOGIN
              </button>
              <button
                type="button"
                className="retro-btn btn-outline"
                onClick={() => onNavigate('register')}
              >
                🛡️ REGISTER IDENTITY
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
