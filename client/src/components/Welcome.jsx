import React from 'react';

export default function Welcome({ user, onLogout }) {
  const nickname = user?.nickname || 'Pilot';

  return (
    <div className="retro-auth-card welcome-console-card">
      <div className="card-terminal-bar">
        <span className="terminal-dot green"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title">MISSION_CONTROL // COCKPIT_HUD</span>
      </div>

      <div className="welcome-console-header">
        <div className="status-badge-retro">
          <span className="blinking-cursor">■</span> TELEMETRY ACTIVE
        </div>

        {/* Required User Welcome Message */}
        <h1 className="welcome-retro-headline">
          Welcome to Space Fuel, <span className="nickname-accent">{nickname}</span>!
        </h1>
        <p className="mission-status-headline">Mission is ready.</p>
        <div className="section-divider"></div>
      </div>

      <div className="telemetry-grid">
        <div className="telemetry-card">
          <span className="tel-label">CREW CALLSIGN</span>
          <span className="tel-value">{user?.nickname || 'PILOT_UNKNOWN'}</span>
        </div>

        <div className="telemetry-card">
          <span className="tel-label">COMMANDER NAME</span>
          <span className="tel-value">{user?.name || '-'}</span>
        </div>

        <div className="telemetry-card">
          <span className="tel-label">TRANSMISSION FREQUENCY</span>
          <span className="tel-value">{user?.email || '-'}</span>
        </div>

        <div className="telemetry-card">
          <span className="tel-label">THRUSTER STATUS</span>
          <span className="tel-value tel-success">● PLASMA READY [100%]</span>
        </div>
      </div>

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
          ✕ ABORT / LOGOUT
        </button>
      </div>
    </div>
  );
}
