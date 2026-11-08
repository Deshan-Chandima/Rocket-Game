import React from 'react';

export default function Welcome({ user, token, onLogout, onNavigate }) {
  const isGuest = user?.isGuest;
  const nickname = user?.nickname || (isGuest ? 'Guest Pilot' : 'Pilot');

  return (
    <div className="retro-auth-card welcome-console-card">
      {/* Top Terminal Status Bar */}
      <div className="card-terminal-bar">
        <span className={`terminal-dot ${isGuest ? 'yellow' : 'green'}`}></span>
        <span className={`terminal-dot ${isGuest ? 'yellow' : 'green'}`}></span>
        <span className={`terminal-dot ${isGuest ? 'yellow' : 'green'}`}></span>
        <span className="terminal-title">MISSION_CONTROL // COCKPIT_HUD</span>
      </div>

      {/* Main Clean Header */}
      <div className="welcome-console-header">
        <div
          className="status-badge-retro"
          style={{ color: isGuest ? '#f7ca74' : '#4ade80' }}
        >
          <span className="blinking-cursor">■</span>{' '}
          {isGuest
            ? 'GUEST MODE • LEADERBOARD DISABLED'
            : 'PILOT ONLINE • JWT VERIFIED'}
        </div>

        {/* Required User Welcome Message */}
        <h1 className="welcome-retro-headline">
          Welcome to Space Fuel, <span className="nickname-accent">{nickname}</span>!
        </h1>
        <p className="mission-status-headline">Mission is ready.</p>
        <div className="section-divider"></div>
      </div>

      {/* Compact JWT Token proof for registered pilots (Academic marking) */}
      {!isGuest && token && (
        <div className="jwt-token-display">
          <span className="jwt-label">PILOT SECURITY TOKEN (BEARER):</span>
          <code className="jwt-code">{token.slice(0, 24)}...{token.slice(-12)}</code>
        </div>
      )}

      {/* Primary Clean Action Buttons */}
      <div className="console-actions console-actions-vertical">
        <button
          type="button"
          className="retro-btn btn-coral menu-option-btn"
          onClick={() => alert(`🚀 Mission ignited! Rocket thrusters online for ${nickname}!`)}
        >
          <span className="btn-icon">🚀</span> ENGAGE THRUSTERS
        </button>

        <button
          type="button"
          className="retro-btn btn-outline menu-option-btn"
          onClick={() => onNavigate ? onNavigate('home') : onLogout()}
        >
          <span className="btn-icon">✕</span> BACK TO MENU
        </button>
      </div>
    </div>
  );
}
