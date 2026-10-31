import React from 'react';

export default function Navbar({ activeView, setActiveView, user, onLogout }) {
  return (
    <header className="retro-navbar">
      <div className="nav-container">
        {/* Left navigation links */}
        <nav className="nav-group nav-left">
          <button
            type="button"
            className={`nav-item ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => setActiveView('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-item ${activeView === 'about' ? 'active' : ''}`}
            onClick={() => setActiveView('about')}
          >
            About
          </button>
          <button
            type="button"
            className={`nav-item ${activeView === 'games' ? 'active' : ''}`}
            onClick={() => setActiveView('games')}
          >
            Games
          </button>
        </nav>

        {/* Center retro emblem */}
        <div className="nav-center-emblem" onClick={() => setActiveView('home')}>
          <div className="emblem-ribbon">
            <span className="emblem-dot">▪</span>
            <span className="emblem-text">SPACE</span>
            <span className="emblem-dot">▪</span>
          </div>
        </div>

        {/* Right navigation links */}
        <nav className="nav-group nav-right">
          <button
            type="button"
            className={`nav-item ${activeView === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveView('pricing')}
          >
            Pricing
          </button>
          <button
            type="button"
            className={`nav-item ${activeView === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveView('faqs')}
          >
            FAQs
          </button>

          {user ? (
            <div className="nav-user-pill">
              <span className="user-indicator">● {user.nickname || 'Pilot'}</span>
              <button
                type="button"
                className="nav-logout-btn"
                onClick={onLogout}
                title="Log out"
              >
                Exit
              </button>
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <button
                type="button"
                className={`nav-item nav-login-btn ${activeView === 'login' ? 'active' : ''}`}
                onClick={() => setActiveView('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={`nav-item nav-register-btn ${activeView === 'register' ? 'active' : ''}`}
                onClick={() => setActiveView('register')}
              >
                Register
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
