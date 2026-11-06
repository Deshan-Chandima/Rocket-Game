import React, { useState } from 'react';

export default function Home({ onNavigate, user, onPlayAsGuest }) {
  const [modalView, setModalView] = useState(null); // null | 'level' | 'leaderboard' | 'quit'

  const isRegistered = user && !user.isGuest;

  // Sample arcade leaderboard records (Registered pilots only)
  const leaderboardData = [
    { rank: '01', callsign: 'StarVoyager', level: '04', score: '98,400' },
    { rank: '02', callsign: 'NovaCommander', level: '03', score: '84,200' },
    { rank: '03', callsign: 'AstroDave', level: '03', score: '72,150' },
    {
      rank: '04',
      callsign: isRegistered ? user.nickname : 'CosmoPilot',
      level: '02',
      score: '58,900',
      isCurrent: isRegistered
    },
    { rank: '05', callsign: 'OrbitalFox', level: '01', score: '41,000' }
  ];

  const handlePlayClick = () => {
    if (user) {
      onNavigate('welcome');
    } else {
      // Guest can play directly without logging in!
      onPlayAsGuest();
    }
  };

  const handleConfirmQuit = () => {
    alert('Terminal session closed. Cockpit controls in standby.');
    setModalView(null);
    onNavigate('home');
  };

  return (
    <div className="retro-auth-card home-terminal-card">
      {/* Top Terminal Status Bar */}
      <div className="card-terminal-bar">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title">GAME_MENU // SELECT_OPTION</span>
      </div>

      {/* Main Menu View (When no modal is active) */}
      {!modalView && (
        <div className="game-menu-container">
          <div className="game-menu-header">
            <div className="status-badge-retro">
              <span className="blinking-cursor">■</span> ARCADE TERMINAL READY
            </div>
            <h2 className="game-menu-title">MAIN MISSION MENU</h2>
            <p className="game-menu-subtitle">
              {isRegistered
                ? `PILOT IN COMMAND: ${user.nickname} [RANK: #04]`
                : user?.isGuest
                ? 'PILOT: GUEST • LEADERBOARD DISABLED'
                : 'FREE TO PLAY AS GUEST • LOGIN TO RANK ON LEADERBOARD'}
            </p>
          </div>

          {/* 4 Main Game Options */}
          <div className="game-menu-buttons">
            <button
              type="button"
              className="retro-btn btn-coral menu-option-btn"
              onClick={handlePlayClick}
            >
              <span className="btn-icon">▶</span> {user ? 'PLAY MISSION' : 'PLAY AS GUEST'}
            </button>

            <button
              type="button"
              className="retro-btn btn-teal menu-option-btn"
              onClick={() => setModalView('level')}
            >
              <span className="btn-icon">⭐</span> LEVEL
            </button>

            <button
              type="button"
              className="retro-btn btn-outline menu-option-btn"
              onClick={() => setModalView('leaderboard')}
            >
              <span className="btn-icon">🏆</span> LEADERBOARD
            </button>

            <button
              type="button"
              className="retro-btn btn-quit menu-option-btn"
              onClick={() => setModalView('quit')}
            >
              <span className="btn-icon">✕</span> QUIT
            </button>
          </div>

          <div className="game-menu-footer">
            {!isRegistered ? (
              <span className="menu-tip guest-hint">
                💡 No login needed to play! Only registered pilots enter the Leaderboard.
              </span>
            ) : (
              <span className="menu-tip">[ USE MOUSE OR TAP TO SELECT OPTION ]</span>
            )}
          </div>
        </div>
      )}

      {/* LEVEL MODAL */}
      {modalView === 'level' && (
        <div className="modal-inner-view">
          <div className="modal-header-row">
            <h3 className="modal-title">⭐ CURRENT MISSION LEVEL</h3>
            <span className="modal-badge">SECTOR 01</span>
          </div>

          <div className="level-status-box">
            <div className="level-header-bar">
              <span className="level-number">LEVEL 01</span>
              <span className="level-name">EARTH ORBITAL ESCAPE</span>
            </div>

            <div className="level-details-list">
              <div className="level-detail-item">
                <span className="lvl-label">OBJECTIVE:</span>
                <span className="lvl-val">Harvest 100 Star Plasma units & avoid orbital debris.</span>
              </div>
              <div className="level-detail-item">
                <span className="lvl-label">GRAVITY WELL:</span>
                <span className="lvl-val">0.32G (Earth Exosphere)</span>
              </div>
              <div className="level-detail-item">
                <span className="lvl-label">ASTEROID DENSITY:</span>
                <span className="lvl-val" style={{ color: '#4ade80' }}>LOW // GREEN ZONE</span>
              </div>
              <div className="level-detail-item">
                <span className="lvl-label">TARGET SCORE:</span>
                <span className="lvl-val" style={{ color: '#f7ca74' }}>50,000 PTS</span>
              </div>
            </div>

            <div className="level-progress-bar-wrap">
              <span className="progress-label">LEVEL READINESS</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          <div className="modal-actions-row">
            <button
              type="button"
              className="retro-btn btn-coral"
              onClick={handlePlayClick}
            >
              ▶ PLAY THIS LEVEL
            </button>
            <button
              type="button"
              className="retro-btn btn-outline"
              onClick={() => setModalView(null)}
            >
              BACK TO MENU
            </button>
          </div>
        </div>
      )}

      {/* LEADERBOARD MODAL */}
      {modalView === 'leaderboard' && (
        <div className="modal-inner-view">
          <div className="modal-header-row">
            <h3 className="modal-title">🏆 GALAXY LEADERBOARD</h3>
            <span className="modal-badge">TOP PILOTS</span>
          </div>

          {/* Guest Account Leaderboard Restriction Alert */}
          {!isRegistered && (
            <div className="leaderboard-guest-banner">
              <div className="guest-banner-title">
                <span>⚠️ GUEST PILOTS EXCLUDED FROM LEADERBOARD</span>
              </div>
              <p className="guest-banner-desc">
                Guests can play without restrictions, but high scores are not recorded in galaxy rankings.
                Login or create a virtual identity to submit your scores.
              </p>
              <div className="guest-banner-buttons">
                <button
                  type="button"
                  className="retro-btn btn-teal btn-sm"
                  onClick={() => onNavigate('login')}
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  className="retro-btn btn-outline btn-sm"
                  onClick={() => onNavigate('register')}
                >
                  REGISTER
                </button>
              </div>
            </div>
          )}

          <div className="leaderboard-table-wrap">
            <table className="retro-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>PILOT CALLSIGN</th>
                  <th>LEVEL</th>
                  <th>SCORE</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row) => (
                  <tr key={row.rank} className={row.isCurrent ? 'current-pilot-row' : ''}>
                    <td className="rank-cell">#{row.rank}</td>
                    <td className="callsign-cell">
                      {row.callsign} {row.isCurrent && <span className="you-pill">YOU</span>}
                    </td>
                    <td className="level-cell">LVL {row.level}</td>
                    <td className="score-cell">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-actions-row">
            <button
              type="button"
              className="retro-btn btn-coral"
              onClick={() => setModalView(null)}
            >
              BACK TO MENU
            </button>
          </div>
        </div>
      )}

      {/* QUIT CONFIRMATION MODAL */}
      {modalView === 'quit' && (
        <div className="modal-inner-view quit-modal">
          <div className="modal-header-row">
            <h3 className="modal-title" style={{ color: '#f87171' }}>✕ ABORT TERMINAL SESSION?</h3>
          </div>

          <p className="quit-warning-text">
            WARNING: Leaving the terminal will end all active mission simulations and return your cockpit controls to standby mode.
          </p>

          <div className="modal-actions-row">
            <button
              type="button"
              className="retro-btn btn-quit-confirm"
              onClick={handleConfirmQuit}
            >
              YES, QUIT TERMINAL
            </button>
            <button
              type="button"
              className="retro-btn btn-outline"
              onClick={() => setModalView(null)}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
