import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

export default function Login({ onLoginSuccess, onSwitchToRegister, onPlayAsGuest }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    if (!email || !password) {
      setError('PLEASE PROVIDE BOTH EMAIL AND PASSWORD.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'INVALID LOGIN CREDENTIALS.');
      }

      if (data.token) {
        localStorage.setItem('spacefuel_token', data.token);
      }

      if (data.user) {
        onLoginSuccess(data.user, data.token);
      } else {
        throw new Error('PILOT DATA MISSING IN SERVER TELEMETRY.');
      }
    } catch (err) {
      setError(err.message || 'FAILED TO CONNECT TO SPACE CENTER HOST.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-auth-card">
      <div className="card-terminal-bar">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title">SPACE_FUEL // PILOT_TERMINAL</span>
      </div>

      <div className="auth-header">
        <h2 className="auth-pixel-title">PILOT LOGIN</h2>
        <p className="auth-pixel-subtitle">AUTHENTICATE TO ACCESS MISSION TERMINAL</p>
      </div>

      {error && (
        <div className="retro-alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="retro-form">
        <div className="retro-form-group">
          <label htmlFor="login-email">CREW EMAIL</label>
          <div className="input-frame">
            <input
              id="login-email"
              name="email"
              type="email"
              className="retro-input"
              placeholder="pilot@spacefuel.io"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="retro-form-group">
          <label htmlFor="login-password">ACCESS KEY (PASSWORD)</label>
          <div className="input-frame password-input-frame">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="retro-input"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="retro-btn btn-coral btn-block" disabled={loading}>
          {loading ? 'AUTHENTICATING...' : '▶ LAUNCH SESSION'}
        </button>

        {onPlayAsGuest && (
          <>
            <div className="auth-separator">
              <span className="auth-separator-line"></span>
              <span className="auth-separator-text">OR</span>
              <span className="auth-separator-line"></span>
            </div>

            <button
              type="button"
              className="retro-btn btn-outline btn-block guest-login-btn"
              onClick={onPlayAsGuest}
            >
              👾 PLAY AS GUEST (SKIP LOGIN)
            </button>
          </>
        )}
      </form>

      <div className="auth-footer-prompt">
        <span>NEW PILOT CADET?</span>
        <button type="button" className="inline-link" onClick={onSwitchToRegister}>
          [ CREATE VIRTUAL IDENTITY ]
        </button>
      </div>
    </div>
  );
}
