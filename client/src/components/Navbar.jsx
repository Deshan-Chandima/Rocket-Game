import React, { useState } from 'react';

export default function Navbar({ activeView, onNavigate, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="retro-navbar w-full flex justify-center sticky top-0 z-50">
      <div className="navbar-container max-w-5xl w-full flex items-center justify-between px-4 py-2">
        {/* Left Navigation Links: Home */}
        <div className={`nav-group nav-left ${mobileMenuOpen ? 'mobile-show' : ''} flex items-center gap-2`}>
          <button
            type="button"
            className={`nav-link-btn ${activeView === 'home' ? 'active' : ''} transition-all duration-200 hover:scale-105 active:scale-95`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
        </div>

        {/* Center Logo Banner */}
        <div
          className="nav-center-banner flex items-center cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          title="Space Fuel Mission Control"
        >
          <div className="ribbon-wing wing-left"></div>
          <div className="ribbon-body flex items-center justify-center gap-1.5 px-3">
            <span className="banner-dot">•</span>
            <span className="banner-title font-pixel text-xs tracking-wider">SPACE FUEL</span>
            <span className="banner-dot">•</span>
          </div>
          <div className="ribbon-wing wing-right"></div>
        </div>

        {/* Right Navigation Links: Auth / Pilot / Guest Status */}
        <div className={`nav-group nav-right ${mobileMenuOpen ? 'mobile-show' : ''} flex items-center gap-2`}>
          {user && !user.isGuest ? (
            <div className="user-nav-profile flex items-center gap-2">
              <button
                type="button"
                className={`nav-link-btn user-pilot-badge ${activeView === 'welcome' ? 'active' : ''} transition-all duration-200 hover:scale-105`}
                onClick={() => handleNavClick('welcome')}
                title="View Pilot Dashboard"
              >
                👨‍🚀 {user.nickname || user.name}
              </button>
              <button
                type="button"
                className="nav-link-btn nav-logout-btn transition-all duration-200 hover:scale-105"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-nav-buttons flex items-center gap-2">
              {user?.isGuest && (
                <button
                  type="button"
                  className={`nav-link-btn guest-nav-indicator ${activeView === 'welcome' ? 'active' : ''} transition-all duration-200 hover:scale-105`}
                  onClick={() => handleNavClick('welcome')}
                  title="Guest Cockpit"
                >
                  👾 GUEST PILOT
                </button>
              )}
              <button
                type="button"
                className={`nav-link-btn nav-login-btn ${activeView === 'login' ? 'active' : ''} transition-all duration-200 hover:scale-105`}
                onClick={() => handleNavClick('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={`nav-link-btn nav-register-btn ${activeView === 'register' ? 'active' : ''} transition-all duration-200 hover:scale-105`}
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
          className="mobile-toggle-btn transition duration-200 hover:scale-110 active:scale-95"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
