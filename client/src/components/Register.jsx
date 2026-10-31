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
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
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
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="brand-header">
        <span className="brand-icon">🚀</span>
        <h1 className="brand-title">SPACE FUEL</h1>
        <p className="brand-subtitle">Create your virtual pilot identity</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="e.g. Neil Armstrong"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nickname">Pilot Nickname</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            className="form-control"
            placeholder="e.g. StarVoyager"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="pilot@spacefuel.io"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Initializing Pilot...' : 'Register Identity'}
        </button>
      </form>

      <div className="auth-footer">
        Already registered?
        <button type="button" className="auth-link" onClick={onSwitchToLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}

