import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');

    const { name, nickname, email, password, confirmPassword } = formData;

    // Field Validation
    if (!name || !nickname || !email || !password || !confirmPassword) {
      setError('ALL FIELDS ARE REQUIRED TO ISSUE PILOT CREDENTIALS.');
      return;
    }

    if (password !== confirmPassword) {
      setError('PASSWORDS DO NOT MATCH. VERIFY AND RETRY.');
      return;
    }

    if (password.length < 6) {
      setError('SECURITY KEY MUST BE AT LEAST 6 CHARACTERS.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          nickname: nickname.trim(),
          email: email.trim(),
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'REGISTRATION FAILED AT HOST.');
      }

      setSuccess('PILOT RECORD REGISTERED! REDIRECTING TO AUTH TERMINAL...');
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      setError(err.message || 'COULD NOT REACH MISSION CONTROL DATABASE.');
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
        <span className="terminal-title">CREW_ENLISTMENT // NEW_RECORD</span>
      </div>

      <div className="auth-header">
        <h2 className="auth-pixel-title">ENLIST PILOT</h2>
        <p className="auth-pixel-subtitle">CREATE TAMPER-PROOF VIRTUAL IDENTITY</p>
      </div>

      {error && (
        <div className="retro-alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="retro-alert alert-success">
          <span className="alert-icon">✅</span>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="retro-form">
        <div className="retro-form-group">
          <label htmlFor="reg-name">FULL NAME</label>
          <div className="input-frame">
            <input
              id="reg-name"
              name="name"
              type="text"
              className="retro-input"
              placeholder="e.g. Neil Armstrong"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className="retro-form-group">
          <label htmlFor="reg-nickname">PILOT NICKNAME / CALLSIGN</label>
          <div className="input-frame">
            <input
              id="reg-nickname"
              name="nickname"
              type="text"
              className="retro-input"
              placeholder="e.g. StarVoyager"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="retro-form-group">
          <label htmlFor="reg-email">COMMUNICATION EMAIL</label>
          <div className="input-frame">
            <input
              id="reg-email"
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

        <div className="form-row-2">
          <div className="retro-form-group">
            <label htmlFor="reg-password">PASSWORD</label>
            <div className="input-frame">
              <input
                id="reg-password"
                name="password"
                type="password"
                className="retro-input"
                placeholder="Min 6 chars"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="retro-form-group">
            <label htmlFor="reg-confirm">CONFIRM KEY</label>
            <div className="input-frame">
              <input
                id="reg-confirm"
                name="confirmPassword"
                type="password"
                className="retro-input"
                placeholder="Re-enter"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="retro-btn btn-coral btn-block" disabled={loading}>
          {loading ? 'ENROLLING IDENTITY...' : '▶ REGISTER PILOT'}
        </button>
      </form>

      <div className="auth-footer-prompt">
        <span>ALREADY HAVE CREDENTIALS?</span>
        <button type="button" className="inline-link" onClick={onSwitchToLogin}>
          [ RETURN TO LOGIN ]
        </button>
      </div>
    </div>
  );
}
