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
    <div className="retro-auth-card w-full max-w-md mx-auto rounded-lg overflow-hidden border border-space-border shadow-glow-coral">
      <div className="card-terminal-bar flex items-center gap-2 px-4 py-2 bg-space-surface border-b border-space-border">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title font-arcade text-xs text-space-coral">SPACE_FUEL // PILOT_TERMINAL</span>
      </div>

      <div className="auth-header text-center p-5 pb-2">
        <h2 className="auth-pixel-title font-pixel text-xl text-space-coral tracking-wider">PILOT LOGIN</h2>
        <p className="auth-pixel-subtitle font-arcade text-xs text-space-muted mt-1">AUTHENTICATE TO ACCESS MISSION TERMINAL</p>
      </div>

      {error && (
        <div className="retro-alert alert-error mx-5 my-2 flex items-center gap-2 p-3 rounded bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-arcade">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="retro-form px-5 py-4 flex flex-col gap-4">
        <div className="retro-form-group flex flex-col gap-1.5 text-left">
          <label htmlFor="login-email" className="font-arcade text-xs text-space-teal">CREW EMAIL</label>
          <div className="input-frame">
            <input
              id="login-email"
              name="email"
              type="email"
              className="retro-input w-full px-3 py-2 bg-space-dark text-space-cream border border-space-border rounded focus:border-space-coral focus:outline-none transition font-body text-sm"
              placeholder="pilot@spacefuel.io"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="retro-form-group flex flex-col gap-1.5 text-left">
          <label htmlFor="login-password" className="font-arcade text-xs text-space-teal">ACCESS KEY (PASSWORD)</label>
          <div className="input-frame password-input-frame relative flex items-center">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="retro-input w-full px-3 py-2 pr-10 bg-space-dark text-space-cream border border-space-border rounded focus:border-space-coral focus:outline-none transition font-body text-sm"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle-btn absolute right-2 text-space-muted hover:text-space-coral transition p-1"
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

        <button
          type="submit"
          className="retro-btn btn-coral btn-block w-full py-2.5 mt-2 transition-all duration-200 hover:scale-102 active:scale-98"
          disabled={loading}
        >
          {loading ? 'AUTHENTICATING...' : '▶ LAUNCH SESSION'}
        </button>

        {onPlayAsGuest && (
          <>
            <div className="auth-separator flex items-center my-1 gap-2">
              <span className="auth-separator-line flex-1 h-px bg-space-border"></span>
              <span className="auth-separator-text font-arcade text-xs text-space-dim">OR</span>
              <span className="auth-separator-line flex-1 h-px bg-space-border"></span>
            </div>

            <button
              type="button"
              className="retro-btn btn-outline btn-block guest-login-btn w-full py-2 transition-all duration-200 hover:scale-102 active:scale-98"
              onClick={onPlayAsGuest}
            >
              👾 PLAY AS GUEST (SKIP LOGIN)
            </button>
          </>
        )}
      </form>

      <div className="auth-footer-prompt flex items-center justify-center gap-2 p-4 bg-space-surface border-t border-space-border text-xs font-arcade text-space-muted">
        <span>NEW PILOT CADET?</span>
        <button type="button" className="inline-link text-space-coral hover:underline font-bold" onClick={onSwitchToRegister}>
          [ CREATE VIRTUAL IDENTITY ]
        </button>
      </div>
    </div>
  );
}
