import React from 'react';

export default function ComingSoon({ pageName, onNavigate, user }) {
  const displayTitle = (pageName || 'PAGE').toUpperCase();

  return (
    <div className="retro-auth-card coming-soon-card w-full max-w-md mx-auto rounded-lg overflow-hidden border border-space-border shadow-glow-coral">
      <div className="card-terminal-bar flex items-center gap-2 px-4 py-2 bg-space-surface border-b border-space-border">
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-title font-arcade text-xs text-space-amber">SECTOR_STATUS // {displayTitle}_UNDER_CONSTRUCTION</span>
      </div>

      <div className="coming-soon-content flex flex-col items-center text-center p-6 gap-3">
        <div className="coming-soon-icon-box relative flex items-center justify-center my-2">
          <span className="radar-icon text-4xl">📡</span>
          <div className="radar-ping"></div>
        </div>

        <div className="status-badge-retro font-arcade text-xs text-space-amber tracking-wider">
          <span className="blinking-cursor">■</span> TRANSMISSION PENDING
        </div>

        <h2 className="coming-soon-title font-pixel text-xl text-space-coral tracking-wider">COMING SOON</h2>
        <p className="coming-soon-subtitle font-arcade text-xs text-space-cream">
          THE <span className="highlight-section text-space-amber font-bold">{displayTitle}</span> MODULE IS UNDER CONSTRUCTION
        </p>
        <div className="section-divider w-16 h-0.5 bg-space-border my-1"></div>

        <p className="coming-soon-desc text-xs text-space-muted leading-relaxed max-w-sm">
          Deep-space engineers are currently calibrating orbital telemetry, thruster physics, and plasma fuel nodes for this sector.
        </p>

        <div className="coming-soon-actions flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
          {user ? (
            <button
              type="button"
              className="retro-btn btn-coral transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => onNavigate('welcome')}
            >
              🚀 RETURN TO MISSION HUD
            </button>
          ) : (
            <>
              <button
                type="button"
                className="retro-btn btn-coral transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={() => onNavigate('login')}
              >
                ⚡ PILOT LOGIN
              </button>
              <button
                type="button"
                className="retro-btn btn-outline transition-all duration-200 hover:scale-105 active:scale-95"
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

