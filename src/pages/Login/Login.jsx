import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com";
const API_BASE = "/api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [token, setToken] = useState('');
  const [googleScriptFailed, setGoogleScriptFailed] = useState(false);

  useEffect(() => {
    // Load Google script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential
        });
        window.google.accounts.id.renderButton(
          document.getElementById('google-btn-slot'),
          { theme: 'filled_black', size: 'large', width: 336, shape: 'pill' }
        );
      } else {
        setGoogleScriptFailed(true);
      }
    };
    script.onerror = () => {
      setGoogleScriptFailed(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleCredential = async (response) => {
    setStatus({ message: '', type: '' });
    setToken('');
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential })
      });
      if (!res.ok) throw new Error("Google sign-in failed. Please try again.");

      const data = await res.json();
      setStatus({ message: `Signed in as ${data.user?.email || "Google user"}.`, type: "success" });
      setToken(data.token);
    } catch (err) {
      setStatus({ message: err.message, type: "error" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: '', type: '' });
    setToken('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Invalid email or password.");
      }

      const data = await res.json();
      setStatus({ message: "Logged in successfully. Redirecting…", type: "success" });
      setToken(data.token);
    } catch (err) {
      setStatus({ message: err.message || "Something went wrong. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <nav>
        <Link to="/" className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4z" stroke="#08090f" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          AlgoAtlas
        </Link>
        <div className="nav-side">New here? <Link to="/signup">Create an account</Link></div>
      </nav>

      <div className="stage">
        <div className="auth-card">
          <div className="eyebrow">WELCOME BACK</div>
          <h1>Log in to AlgoAtlas</h1>
          <p className="sub">Pick up your sheets right where you left off.</p>

          <div id="google-btn-slot"></div>
          
          {googleScriptFailed && (
            <button 
              type="button" 
              className="btn-google" 
              onClick={() => setStatus({ message: "Google Sign-In script didn't load. Check GOOGLE_CLIENT_ID and network access.", type: "error" })}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"/>
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>
          )}

          <div className="divider">OR LOG IN WITH EMAIL</div>

          <form onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="email">EMAIL</label>
              <input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                required 
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">PASSWORD</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required 
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="row-between"><a href="#">Forgot password?</a></div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in →'}
            </button>
          </form>

          <div className={`status ${status.type} ${status.message ? 'show' : ''}`}>
            {status.message}
          </div>
          
          <div className={`token-preview ${token ? 'show' : ''}`}>
            JWT received: {token}
          </div>

          <div className="foot-link">Don't have an account? <Link to="/signup">Sign up</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
