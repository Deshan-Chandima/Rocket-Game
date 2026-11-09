import React, { useState } from 'react';

export default function Welcome({ user, token, onLogout, onNavigate }) {
  const isGuest = user?.isGuest;
  const nickname = user?.nickname || (isGuest ? 'Guest Pilot' : 'Pilot');

  // Read pilot top score from user profile or local records
  const [topScore] = useState(() => {
    if (!user || isGuest) return 0;
    const localScore = localStorage.getItem(`spacefuel_top_${user.id || user.nickname}`);
    return localScore ? Number(localScore) : (user.topScore || user.score || 0);
  });

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

      {/* Pilot High Score Card (Replaces the raw token display) */}
      {!isGuest ? (
        <div className="pilot-score-box">
          <div className="pilot-score-header">
            <span className="score-icon">🏆</span>
            <span className="score-title">PILOT TOP SCORE</span>
            {topScore > 0 ? (
              <span className="score-pill-active">RECORD ACTIVE</span>
            ) : (
              <span className="score-pill-new">NEW CADET</span>
            )}
          </div>

          <div className="pilot-score-body">
            {topScore > 0 ? (
              <div className="score-number-wrap">
                <span className="score-val">{topScore.toLocaleString()}</span>
                <span className="score-unit">PTS</span>
              </div>
            ) : (
              <div className="score-empty-state">
                <p className="score-empty-text">NO FLIGHT RECORDS YET</p>
                <p className="score-empty-hint">
                  Launch mission now to set your first galactic high score!
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="pilot-score-box guest-mode-box">
          <div className="pilot-score-header">
            <span className="score-icon">👾</span>
            <span className="score-title">GUEST FLIGHT SESSION</span>
            <span className="score-pill-new">UNRANKED</span>
          </div>
          <div className="score-empty-state">
            <p className="score-empty-hint">
              Free flight active. Create an account to record your top scores on the Leaderboard!
            </p>
          </div>
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
