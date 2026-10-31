import React from 'react';

export default function Welcome({ user, onLogout }) {
  const nickname = user?.nickname || 'Pilot';

  return (
    <div className="auth-container welcome-card">
      <div className="brand-header">
        <span className="brand-icon">🚀</span>
        <div className="welcome-badge">Command Center Active</div>
        
        {/* Required Welcome Message */}
        <h1 className="welcome-headline">
          Welcome to Space Fuel, <span className="highlight-nickname">{nickname}</span>!
        </h1>
        <p className="mission-text">Mission is ready.</p>
      </div>

      <div className="user-profile-details">
        <div className="detail-item">
          <span className="detail-label">Pilot Name</span>
          <span className="detail-value">{user?.name || '-'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Callsign / Nickname</span>
          <span className="detail-value">{user?.nickname || '-'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Registered Email</span>
          <span className="detail-value">{user?.email || '-'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">System Status</span>
          <span className="detail-value" style={{ color: '#4ade80' }}>● Online & Authorized</span>
        </div>
      </div>

      <div>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Abort / Log Out
        </button>
      </div>
    </div>
  );
}

