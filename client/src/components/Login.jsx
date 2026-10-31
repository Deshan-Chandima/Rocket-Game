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
      setError('Please provide registered email and password.');
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
        throw new Error(data.message || 'Access denied. Invalid credentials.');
      }

      if (data.user) {
        onLoginSuccess(data.user);
      } else {
        throw new Error('User information not received from server.');
      }
    } catch (err) {
      setError(err.message || 'Cannot communicate with central station.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-card">
      <div className="card-header-block">
        <span className="card-tag">Access Gate</span>
        <h2 className="card-heading">PILOT LOGIN</h2>
        <p className="card-desc">Authenticate your terminal credentials to commence</p>
      </div>

      {error && (
        <div className="retro-alert alert-error">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
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
            placeholder="Enter security key"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="retro-btn" disabled={loading}>
          {loading ? 'AUTHENTICATING...' : 'LOGIN TO TERMINAL'}
        </button>
      </form>

      <div className="card-footer">
        Unregistered pilot entity?
        <button type="button" className="card-link" onClick={onSwitchToRegister}>
          Register Identity
        </button>
      </div>
    </div>
  );
}
