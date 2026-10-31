import React, { useState } from 'react';

export default function Navbar({ activeView, onNavigate, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="retro-navbar">
      <div className="navbar-container">
        {/* Left Navigation Links: Home, About, Games */}
        <div className={`nav-group nav-left ${mobileMenuOpen ? 'mobile-show' : ''}`}>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'games' ? 'active' : ''}`}
            onClick={() => handleNavClick('games')}
          >
            Games
          </button>
        </div>

        {/* Center Logo Banner */}
        <div
          className="nav-center-banner"
          onClick={() => handleNavClick('login')}
          role="button"
          tabIndex={0}
          title="Space Center"
        >
          <div className="ribbon-wing wing-left"></div>
          <div className="ribbon-body">
            <span className="banner-dot">•</span>
            <span className="banner-title">SPACE</span>
            <span className="banner-dot">•</span>
          </div>
          <div className="ribbon-wing wing-right"></div>
        </div>

        {/* Right Navigation Links: Only Login & Register */}
        <div className={`nav-group nav-right ${mobileMenuOpen ? 'mobile-show' : ''}`}>
          {user ? (
            <div className="user-nav-profile">
              <button
                type="button"
                className={`nav-link-btn user-pilot-badge ${activeView === 'welcome' ? 'active' : ''}`}
                onClick={() => handleNavClick('welcome')}
                title="View Pilot Dashboard"
              >
                👨‍🚀 {user.nickname || user.name}
              </button>
              <button
                type="button"
                className="nav-link-btn nav-logout-btn"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-nav-buttons">
              <button
                type="button"
                className={`nav-link-btn nav-login-btn ${activeView === 'login' ? 'active' : ''}`}
                onClick={() => handleNavClick('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={`nav-link-btn nav-register-btn ${activeView === 'register' ? 'active' : ''}`}
                onClick={() => handleNavClick('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
