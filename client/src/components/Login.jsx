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
      setError('Please provide both email and password.');
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
        throw new Error(data.message || 'Invalid login credentials.');
      }

      // Login successful: pass user object to parent
      if (data.user) {
        onLoginSuccess(data.user);
      } else {
        throw new Error('User data missing in server response.');
      }
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
        <p className="brand-subtitle">Access your virtual pilot terminal</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Authenticating...' : 'Launch Session (Login)'}
        </button>
      </form>

      <div className="auth-footer">
        Don't have a pilot identity yet?
        <button type="button" className="auth-link" onClick={onSwitchToRegister}>
          Register Here
        </button>
      </div>
    </div>
  );
}

