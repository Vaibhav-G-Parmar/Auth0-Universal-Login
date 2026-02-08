import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently
  } = useAuth0();

  const [token, setToken] = React.useState(null);

  const getToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      console.log('Access Token:', accessToken);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔐 Vaibhav's App using Auth0</h1>
        
        {!isAuthenticated ? (
          <div className="login-section">
            <p>Click below to log in with Auth0 Universal Login - it's pretty cool 😎, eh!</p>
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
                <p><strong>Auth0 ID:</strong> {user.sub}</p>
              </div>
            </div>

            <div className="actions">
              <button onClick={getToken} className="token-btn">
                Get Access Token
              </button>
              
              {token && (
                <div className="token-display">
                  <p><strong>Access Token (first 50 chars):</strong></p>
                  <code>{token.substring(0, 50)}...</code>
                </div>
              )}

              <button 
                onClick={() => logout({ returnTo: window.location.origin })}
                className="logout-btn"
              >
                Log Out
              </button>
            </div>

            <details className="user-object">
              <summary>Full User Object (click to expand)</summary>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </details>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;