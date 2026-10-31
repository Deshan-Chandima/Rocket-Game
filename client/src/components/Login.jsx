import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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

      if (data.user) {
        onLoginSuccess(data.user);
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
        <span className="terminal-title">AUTH_GATEWAY // PORT_5000</span>
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
          <div className="input-frame">
            <input
              id="login-password"
              name="password"
              type="password"
              className="retro-input"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <button type="submit" className="retro-btn btn-coral btn-block" disabled={loading}>
          {loading ? 'AUTHENTICATING...' : '▶ LAUNCH SESSION'}
        </button>
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
