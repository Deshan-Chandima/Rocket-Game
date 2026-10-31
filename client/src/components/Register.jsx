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

    // Validation
    if (!name || !nickname || !email || !password || !confirmPassword) {
      setError('All fields are mandatory for pilot registration.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Re-verify coordinates.');
      return;
    }

    if (password.length < 6) {
      setError('Security key must contain at least 6 characters.');
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
        throw new Error(data.message || 'Registration sequence aborted.');
      }

      setSuccess('Identity registered in registry! Initializing login...');
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Cannot communicate with central station.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-card">
      <div className="card-header-block">
        <span className="card-tag">Identity Terminal</span>
        <h2 className="card-heading">PILOT REGISTRY</h2>
        <p className="card-desc">Initialize your virtual credentials for mission access</p>
      </div>

      {error && (
        <div className="retro-alert alert-error">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="retro-alert alert-success">
          <span>✅</span>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            id="name"
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

        <div className="form-group">
          <label className="form-label" htmlFor="nickname">Pilot Nickname</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            className="retro-input"
            placeholder="e.g. StarVoyager"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Comms Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="retro-input"
            placeholder="pilot@spacefuel.station"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Security Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="retro-input"
            placeholder="Min 6 characters"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Verify Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="retro-input"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        <button type="submit" className="retro-btn" disabled={loading}>
          {loading ? 'REGISTERING...' : 'REGISTER IDENTITY'}
        </button>
      </form>

      <div className="card-footer">
        Already an authorized pilot?
        <button type="button" className="card-link" onClick={onSwitchToLogin}>
          Log In Here
        </button>
      </div>
    </div>
  );
}
