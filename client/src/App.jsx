import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Welcome from './components/Welcome.jsx';

export default function App() {
  const [activeView, setActiveView] = useState('login'); // 'login' | 'register' | 'welcome' | 'home' | 'about' | 'games' | 'pricing' | 'faqs'
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveView('welcome');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('login');
  };

  return (
    <div className="main-wrapper">
      {/* Top Retro Navigation Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Hero Header (Faithfully inspired by .SPACE. reference) */}
      <header className="hero-banner">
        <div className="hero-title-container">
          <span className="pixel-square-accent"></span>
          <h1 className="hero-pixel-title">SPACE</h1>
          <span className="pixel-square-accent"></span>
        </div>
        <p className="hero-subtitle">CENTER &bull; FUEL MISSION</p>
        <div className="hero-divider"></div>
      </header>

      {/* Dynamic Content Area */}
      <main className="content-area">
        {/* Authentication: Login */}
        {activeView === 'login' && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setActiveView('register')}
          />
        )}

        {/* Authentication: Register */}
        {activeView === 'register' && (
          <Register
            onSwitchToLogin={() => setActiveView('login')}
          />
        )}

        {/* Post-Login: Welcome & Mission Ready */}
        {activeView === 'welcome' && (
          <Welcome
            user={currentUser}
            onLogout={handleLogout}
          />
        )}

        {/* Generic Portal Section: Home */}
        {activeView === 'home' && (
          <div className="generic-card-grid">
            <div className="generic-feature-card">
              <span className="feature-icon">🚀</span>
              <h3 className="feature-title">ROCKET PROPULSION</h3>
              <p className="feature-text">High-octane plasma fuel extraction systems across outer planetary rings.</p>
            </div>
            <div className="generic-feature-card">
              <span className="feature-icon">🛰️</span>
              <h3 className="feature-title">ORBITAL STATION</h3>
              <p className="feature-text">Deep-space docking hubs equipped with repair yards and automated refueling.</p>
            </div>
            <div className="generic-feature-card">
              <span className="feature-icon">👾</span>
              <h3 className="feature-title">VIRTUAL PILOTS</h3>
              <p className="feature-text">Unique identification credentials for interstellar telemetry access.</p>
              <button
                type="button"
                className="card-link"
                style={{ marginTop: '0.8rem', display: 'inline-block' }}
                onClick={() => setActiveView(currentUser ? 'welcome' : 'login')}
              >
                {currentUser ? 'Enter Cockpit →' : 'Pilot Access →'}
              </button>
            </div>
          </div>
        )}

        {/* Generic Portal Section: About */}
        {activeView === 'about' && (
          <div className="retro-card welcome-card-wide">
            <div className="card-header-block">
              <span className="card-tag">Archival Log</span>
              <h2 className="card-heading">ABOUT SPACE FUEL</h2>
              <p className="card-desc">The retro interstellar exploration & refueling network</p>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', textAlign: 'left', marginBottom: '1.5rem' }}>
              Space Fuel is an arcade-inspired space exploration and resource management portal. 
              Pilots traverse asteroid clusters, mine rare hyper-propellants, and synchronize 
              their flight logs with central command.
            </p>
            <button
              type="button"
              className="retro-btn"
              onClick={() => setActiveView('login')}
            >
              Back to Pilot Gate
            </button>
          </div>
        )}

        {/* Generic Portal Section: Games */}
        {activeView === 'games' && (
          <div className="generic-card-grid">
            <div className="generic-feature-card">
              <span className="feature-icon">🕹️</span>
              <h3 className="feature-title">ASTEROID DODGE</h3>
              <p className="feature-text">Navigate turbulent debris fields while keeping fuel consumption minimal.</p>
            </div>
            <div className="generic-feature-card">
              <span className="feature-icon">⚡</span>
              <h3 className="feature-title">WARP GATE RUSH</h3>
              <p className="feature-text">Hyperspace checkpoint time-trials for seasoned starship captains.</p>
            </div>
            <div className="generic-feature-card">
              <span className="feature-icon">🪐</span>
              <h3 className="feature-title">GRAVITY WELL</h3>
              <p className="feature-text">Slingshot maneuvers around supermassive gas giants to harvest fuel.</p>
            </div>
          </div>
        )}

        {/* Generic Portal Section: Pricing */}
        {activeView === 'pricing' && (
          <div className="generic-card-grid">
            <div className="generic-feature-card">
              <span className="feature-icon">🥉</span>
              <h3 className="feature-title">CADET LICENSE</h3>
              <p className="feature-text">Free starter tier. Access to orbital refueling stations and training sims.</p>
            </div>
            <div className="generic-feature-card" style={{ borderColor: 'var(--coral-primary)' }}>
              <span className="feature-icon">🥇</span>
              <h3 className="feature-title">VOYAGER PASS</h3>
              <p className="feature-text">Deep-space range clearance with priority hangar docking and telemetry.</p>
            </div>
          </div>
        )}

        {/* Generic Portal Section: FAQs */}
        {activeView === 'faqs' && (
          <div className="retro-card welcome-card-wide">
            <div className="card-header-block">
              <span className="card-tag">Help Desk</span>
              <h2 className="card-heading">PILOT FREQUENTLY ASKED QUESTIONS</h2>
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <div>
                <strong style={{ color: 'var(--coral-primary)' }}>Q: How do I obtain a pilot callsign?</strong>
                <p style={{ marginTop: '0.2rem' }}>Register an account through the Pilot Registry with your preferred callsign.</p>
              </div>
              <div>
                <strong style={{ color: 'var(--coral-primary)' }}>Q: Is MySQL connection required?</strong>
                <p style={{ marginTop: '0.2rem' }}>Yes, the Node.js/Express backend stores registered pilot credentials in MySQL.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
