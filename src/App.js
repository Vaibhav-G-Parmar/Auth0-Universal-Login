import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading
  } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔐 Vaibhav's App using Auth0</h1>
        
        {!isAuthenticated ? (
          <div className="login-section">
            <p>Secure authentication powered by Auth0 Universal Login - it's pretty cool 😎, eh!</p>
            <button 
              onClick={() => loginWithRedirect()}
              className="login-btn"
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="profile-section">
            <h2>Welcome!</h2>
            
            <div className="profile-card">
              <img 
                src={user.picture} 
                alt={user.name}
                className="profile-pic"
              />
              <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Email Verified:</strong> {user.email_verified ? '✅' : '❌'}</p>
              </div>
            </div>

            <div className="actions">
              <button 
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="logout-btn"
              >
                Log Out
              </button>
            </div>

          </div>
        )}
      </header>
    </div>
  );
}

export default App;