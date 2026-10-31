import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Welcome from './components/Welcome.jsx';
import GenericSection from './components/GenericSection.jsx';

export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | 'about' | 'games' | 'pricing' | 'faqs' | 'login' | 'register' | 'welcome'
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveView('welcome');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('login');
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-arcade-universe">
      {/* 1. Top Retro Navbar (.SPACE.) */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Main Hero Banner matching .SPACE. CENTEE / CENTER reference */}
      <header className="hero-banner">
        <div className="hero-title-wrapper">
          <span className="pixel-box-accent"></span>
          <h1 className="hero-pixel-title">SPACE</h1>
          <span className="pixel-box-accent"></span>
        </div>
        <p className="hero-subtitle">CENTEE</p>
        <div className="hero-divider"></div>
      </header>

      {/* 3. Main Interactive View Container */}
      <main className="content-stage">
        {/* Auth: Login View */}
        {activeView === 'login' && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setActiveView('register')}
          />
        )}

        {/* Auth: Register View */}
        {activeView === 'register' && (
          <Register
            onSwitchToLogin={() => setActiveView('login')}
          />
        )}

        {/* Auth Success: Welcome & Mission Ready */}
        {activeView === 'welcome' && (
          <Welcome
            user={currentUser}
            onLogout={handleLogout}
          />
        )}

        {/* Generic Sections: Home, About, Games, Pricing, FAQs */}
        {['home', 'about', 'games', 'pricing', 'faqs'].includes(activeView) && (
          <GenericSection
            view={activeView}
            onNavigate={handleNavigate}
            user={currentUser}
          />
        )}
      </main>

      {/* 4. Atmospheric Retro Space Scene Artwork (Robot, Staircases, Hanging Lanterns) */}
      <div className="station-backdrop-scenery" aria-hidden="true">
        {/* Left Gantry & Stairway Structure */}
        <div className="scenery-gantry gantry-left">
          <div className="stairs-step s1"></div>
          <div className="stairs-step s2"></div>
          <div className="stairs-step s3"></div>
          <div className="gantry-railing"></div>
          <div className="gantry-lamp globe-lamp-1"></div>
        </div>

        {/* Floating Pods & Suspended Lamps */}
        <div className="floating-pod pod-left">
          <div className="pod-window"></div>
        </div>
        <div className="suspended-lamp lamp-center-left"></div>
        <div className="suspended-lamp lamp-center-right"></div>

        {/* Center Station Robot Sentinel */}
        <div className="station-robot">
          <div className="robot-antenna"></div>
          <div className="robot-head">
            <div className="robot-eye"></div>
          </div>
          <div className="robot-torso">
            <div className="robot-plating"></div>
          </div>
        </div>

        {/* Right Observation Deck & Stairs */}
        <div className="scenery-gantry gantry-right">
          <div className="gantry-deck">
            <div className="deck-terminal"></div>
          </div>
          <div className="stairs-step r1"></div>
          <div className="stairs-step r2"></div>
          <div className="gantry-lamp globe-lamp-2"></div>
        </div>

        {/* Pixel Stardust Particles */}
        <div className="star-layer stars-1"></div>
        <div className="star-layer stars-2"></div>
      </div>

      {/* Footer Info */}
      <footer className="retro-footer">
        <p className="footer-credits">
          [ SPACE FUEL &bull; MISSION CONTROL TERMINAL &bull; V2.0 ]
        </p>
      </footer>
    </div>
  );
}
