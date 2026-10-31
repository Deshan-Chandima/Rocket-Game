import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Welcome from './components/Welcome.jsx';

export default function App() {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'welcome'
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setView('welcome');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  return (
    <main>
      {view === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setView('register')}
        />
      )}

      {view === 'register' && (
        <Register
          onSwitchToLogin={() => setView('login')}
        />
      )}

      {view === 'welcome' && (
        <Welcome
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </main>
  );
}

