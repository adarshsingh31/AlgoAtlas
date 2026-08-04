import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import GoogleSignInButton from '../../components/common/GoogleSignInButton.jsx';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin, isAuthenticated, loading: authLoading } = useAuth();

  const redirectTarget = (location.state?.from && location.state?.from !== '/') ? location.state.from : '/questions';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  // Redirect authenticated users away from the login page to their target destination
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, redirectTarget]);

  // ── Email / Password Login ─────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const data = await login({ email, password });

      if (!data.success) {
        setStatus({ message: data.message || 'Login failed. Please try again.', type: 'error' });
        return;
      }

      setStatus({ message: 'Logged in successfully. Redirecting…', type: 'success' });
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Cannot connect to server. Please check your connection.';
      setStatus({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // ── Google OAuth Login ─────────────────────────────────────────────────────
  const handleGoogleSuccess = async (credential) => {
    setGoogleLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const data = await googleLogin(credential);

      if (!data.success) {
        setStatus({ message: data.message || 'Google login failed. Please try again.', type: 'error' });
        return;
      }

      setStatus({ message: `Signed in as ${data.user?.email || 'Google user'}.`, type: 'success' });
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Google login failed. Please try again.';
      setStatus({ message, type: 'error' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = (message) => {
    setStatus({ message, type: 'error' });
    setGoogleLoading(false);
  };

  // Show nothing while auth is resolving on first load
  if (authLoading) return null;

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

          {/* ── Google Sign-In ─────────────────────────────────────────────── */}
          <GoogleSignInButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            loading={googleLoading}
          />

          <div className="divider">OR LOG IN WITH EMAIL</div>

          {/* ── Email / Password Form ──────────────────────────────────────── */}
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
            <button type="submit" className="btn-primary" disabled={loading || googleLoading}>
              {loading ? 'Logging in…' : 'Log in →'}
            </button>
          </form>

          {/* ── Status Banner ─────────────────────────────────────────────── */}
          <div className={`status ${status.type} ${status.message ? 'show' : ''}`}>
            {status.message}
          </div>

          <div className="foot-link">Don't have an account? <Link to="/signup">Sign up</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
