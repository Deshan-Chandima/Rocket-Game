import React from 'react';

export default function Welcome({ user, token, onLogout, onNavigate }) {
  const isGuest = user?.isGuest;
  const nickname = user?.nickname || (isGuest ? 'Guest Pilot' : 'Pilot');

  return (
    <div className="retro-auth-card welcome-console-card">
      <div className="card-terminal-bar">
        <span className={`terminal-dot ${isGuest ? 'yellow' : 'green'}`}></span>
        <span className={`terminal-dot ${isGuest ? 'yellow' : 'green'}`}></span>
        <span className={`terminal-dot ${isGuest ? 'yellow' : 'green'}`}></span>
        <span className="terminal-title">
          {isGuest ? 'MISSION_CONTROL // GUEST_COCKPIT' : 'MISSION_CONTROL // COCKPIT_HUD'}
        </span>
      </div>

      <div className="welcome-console-header">
        <div className="status-badge-retro" style={{ color: isGuest ? '#f7ca74' : '#4ade80' }}>
          <span className="blinking-cursor">■</span>{' '}
          {isGuest
            ? 'GUEST FLIGHT SESSION ACTIVE • UNRECORDED TELEMETRY'
            : 'TELEMETRY ACTIVE • JWT VERIFIED'}
        </div>

        {/* Required User Welcome Message */}
        <h1 className="welcome-retro-headline">
          Welcome to Space Fuel, <span className="nickname-accent">{nickname}</span>!
        </h1>
        <p className="mission-status-headline">
          {isGuest ? 'Mission is ready (Guest Mode).' : 'Mission is ready.'}
        </p>
        <div className="section-divider"></div>
      </div>

      <div className="telemetry-grid">
        <div className="telemetry-card">
          <span className="tel-label">CREW CALLSIGN</span>
          <span className="tel-value">
            {user?.nickname || 'Guest Pilot'} {isGuest && <span className="guest-badge-sm">GUEST</span>}
          </span>
        </div>

        <div className="telemetry-card">
          <span className="tel-label">COMMANDER NAME</span>
          <span className="tel-value">{user?.name || (isGuest ? 'Guest Cadet' : '-')}</span>
        </div>

        <div className="telemetry-card">
          <span className="tel-label">TRANSMISSION FREQUENCY</span>
          <span className="tel-value">{user?.email || 'LOCAL_OFFLINE'}</span>
        </div>

        <div className="telemetry-card">
          <span className="tel-label">IDENTITY SECURITY</span>
          {isGuest ? (
            <span className="tel-value" style={{ color: '#f87171' }}>
              ⚠️ UNREGISTERED • NO LEADERBOARD ACCESS
            </span>
          ) : (
            <span className="tel-value tel-success">
              🔒 JWT SIGNED &bull; HMAC-SHA256
            </span>
          )}
        </div>
      </div>

      {/* For verified pilot: show JWT token */}
      {!isGuest && token && (
        <div className="jwt-token-display">
          <span className="jwt-label">PILOT SECURITY TOKEN (BEARER):</span>
          <code className="jwt-code">{token.slice(0, 32)}...{token.slice(-16)}</code>
        </div>
      )}

      {/* For guest: show notice that scores won't reach leaderboard */}
      {isGuest && (
        <div className="guest-cockpit-banner">
          <div className="guest-cockpit-banner-header">
            <span>🛡️ LEADERBOARD ACCESS RESTRICTION</span>
          </div>
          <p className="guest-cockpit-banner-text">
            You are currently flying in <strong>Guest Mode</strong>. You can enjoy all gameplay features, but your high scores will <strong>NOT</strong> appear on the Galaxy Leaderboard.
          </p>
          <div className="guest-cockpit-banner-actions">
            <button
              type="button"
              className="retro-btn btn-teal btn-sm"
              onClick={() => onNavigate && onNavigate('register')}
            >
              REGISTER TO COMPETE
            </button>
            <button
              type="button"
              className="retro-btn btn-outline btn-sm"
              onClick={() => onNavigate && onNavigate('login')}
            >
              LOGIN
            </button>
          </div>
        </div>
      )}

      <div className="console-actions">
        <button
          type="button"
          className="retro-btn btn-coral"
          onClick={() => alert(`🚀 Mission ignited! Rocket thrusters online for ${nickname}!`)}
        >
          🚀 ENGAGE THRUSTERS
        </button>

        <button
          type="button"
          className="retro-btn btn-outline"
          onClick={onLogout}
        >
          {isGuest ? '✕ EXIT GUEST SESSION' : '✕ ABORT / LOGOUT'}
        </button>
      </div>
    </div>
  );
}
