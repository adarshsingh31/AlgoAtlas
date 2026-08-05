import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import GoogleSignInButton from '../../components/common/GoogleSignInButton.jsx';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, googleLogin } = useAuth();

  const redirectTarget = (location.state?.from && location.state?.from !== '/') ? location.state.from : '/questions';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  // ── Email / Password Registration ─────────────────────────────────────────
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus({ message: "Passwords don't match.", type: 'error' });
      return;
    }

    setLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const data = await register({ name, email, password });

      if (!data.success) {
        setStatus({ message: data.message || "Couldn't create your account.", type: 'error' });
        return;
      }

      setStatus({ message: 'Account created. Redirecting…', type: 'success' });
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Couldn't create your account. Try a different email.";
      setStatus({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // ── Google OAuth Signup/Login ──────────────────────────────────────────────
  const handleGoogleSuccess = async (credential) => {
    setGoogleLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const data = await googleLogin(credential);

      if (!data.success) {
        setStatus({ message: data.message || 'Google sign-up failed. Please try again.', type: 'error' });
        return;
      }

      setStatus({
        message: `Account ready for ${data.user?.email || 'your Google account'}.`,
        type: 'success',
      });
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Google sign-up failed. Please try again.';
      setStatus({ message, type: 'error' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = (message) => {
    setStatus({ message, type: 'error' });
    setGoogleLoading(false);
  };

  return (
    <div className="signup-page">
      <nav>
        <Link to="/" className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4z" stroke="#08090f" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          AlgoAtlas
        </Link>
        <div className="nav-side">Already have an account? <Link to="/login">Log in</Link></div>
      </nav>

      <div className="stage">
        <div className="auth-card">
          <div className="eyebrow">GET STARTED</div>
          <h1>Create your account</h1>
          <p className="sub">Track DP, Tree, and Graph progress in one place — free, forever.</p>

          {/* ── Google Sign-Up ─────────────────────────────────────────────── */}
          <GoogleSignInButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            loading={googleLoading}
          />

          <div className="divider">OR SIGN UP WITH EMAIL</div>

          {/* ── Email / Password Form ──────────────────────────────────────── */}
          <form onSubmit={handleSignup}>
            <div className="field">
              <label htmlFor="name">FULL NAME</label>
              <input
                type="text"
                id="name"
                placeholder="Ada Lovelace"
                required
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
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
                placeholder="At least 8 characters"
                required
                minLength="8"
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="hint">Use 8+ characters with a mix of letters and numbers.</div>
            </div>
            <div className="field">
              <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••"
                required
                minLength="8"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="terms-row">
              <input
                type="checkbox"
                id="terms"
                required
                checked={terms}
                onChange={e => setTerms(e.target.checked)}
              />
              <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</label>
            </div>

            <button type="submit" className="btn-primary" id="signup-submit" disabled={loading || googleLoading}>
              {loading ? 'Creating account…' : 'Create account →'}
            </button>
          </form>

          {/* ── Status Banner ─────────────────────────────────────────────── */}
          <div className={`status ${status.type} ${status.message ? 'show' : ''}`}>
            {status.message}
          </div>

          <div className="foot-link">Already have an account? <Link to="/login">Log in</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
