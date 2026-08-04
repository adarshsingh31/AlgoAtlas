import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import * as authService from '../../services/authService.js';
import {
  User,
  Lock,
  Flame,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
  Eye,
  EyeOff,
  Mail,
  Shield,
  Key
} from 'lucide-react';
import './Settings.css';

// ─── Password Strength Helper ───────────────────────────────────────────
function calcStrength(val) {
  let s = 0;
  if (val.length > 5) s++;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  return Math.min(s, 4);
}

const strengthColors = ['', '#f87171', '#fbbf24', '#34d399', '#60a5fa'];
const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

function StrengthMeter({ password }) {
  if (!password) return null;
  const s = calcStrength(password);
  return (
    <div className="strength-meter">
      <div className="strength-bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="strength-bar"
            style={{
              backgroundColor: i <= Math.max(1, s) ? strengthColors[s] : 'rgba(255,255,255,0.1)'
            }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: strengthColors[s] }}>
        {strengthLabels[s] || 'Weak'}
      </span>
    </div>
  );
}

// ─── Password Input Field ────────────────────────────────────────────────
function PasswordInput({ id, label, value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-password-wrap">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete || 'current-password'}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="toggle-eye-btn"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

// ─── Set Password Form (For Google-only users) ───────────────────────────
function SetPasswordForm({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.setPassword({ password, confirmPassword: confirm });
      if (!data.success) {
        setError(data.message || 'Failed to set password.');
        return;
      }
      onSuccess(data.hasPassword);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to set password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert-banner error">
          <AlertCircle size={18} style={{ shrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <PasswordInput
        id="sp-new"
        label="New Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError('');
        }}
        placeholder="At least 8 characters"
        autoComplete="new-password"
      />
      <StrengthMeter password={password} />

      <div style={{ marginTop: 16 }}>
        <PasswordInput
          id="sp-confirm"
          label="Confirm Password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            if (error) setError('');
          }}
          placeholder="Repeat new password"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 20, width: '100%' }}>
        {loading ? 'Setting Password...' : 'Set Password'}
      </button>
    </form>
  );
}

// ─── Change Password Form (For existing password users) ──────────────────
function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword
      });
      if (!data.success) {
        setError(data.message || 'Failed to change password.');
        return;
      }
      setSuccessMsg(data.message || 'Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password. Check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMsg && (
        <div className="alert-banner success">
          <CheckCircle size={18} style={{ shrink: 0 }} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="alert-banner error">
          <AlertCircle size={18} style={{ shrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <PasswordInput
        id="cp-current"
        label="Current Password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
          if (error) setError('');
        }}
        placeholder="Enter your current password"
        autoComplete="current-password"
      />

      <div style={{ marginTop: 14 }}>
        <PasswordInput
          id="cp-new"
          label="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (error) setError('');
          }}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
        <StrengthMeter password={newPassword} />
      </div>

      <div style={{ marginTop: 14 }}>
        <PasswordInput
          id="cp-confirm"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (error) setError('');
          }}
          placeholder="Repeat new password"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 20, width: '100%' }}>
        {loading ? 'Updating Password...' : 'Update Password'}
      </button>
    </form>
  );
}

// ─── Provider Badge Config ───────────────────────────────────────────────
const PROVIDER_BADGE = {
  local: { label: 'Email & Password', icon: Mail, className: 'email' },
  google: { label: 'Google', icon: Shield, className: 'google' },
  both: { label: 'Google + Email', icon: Key, className: 'both' }
};

// ─── Main Settings Component ─────────────────────────────────────────────
const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [passwordSet, setPasswordSet] = useState(false);

  const authProvider = user?.authProvider || 'local';
  const badge = PROVIDER_BADGE[authProvider] || PROVIDER_BADGE.local;
  const BadgeIcon = badge.icon;

  const hasPassword = user?.hasPassword === true || passwordSet;

  const handlePasswordSetSuccess = (newHasPasswordStatus) => {
    setPasswordSet(true);
    if (updateUser) {
      updateUser({ hasPassword: newHasPasswordStatus ?? true, authProvider: 'both' });
    }
  };

  return (
    <div className="settings-page">
      {/* ── Top Navbar / Header ── */}
      <header className="settings-header">
        <div className="settings-header-inner">
          <Link to="/questions" className="settings-brand">
            <div className="brand-icon-wrap" style={{ width: 32, height: 32 }}>
              <Flame size={18} className="brand-icon" />
            </div>
            <span>AlgoAtlas</span>
          </Link>

          <button onClick={() => navigate('/questions')} className="settings-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Question Set</span>
          </button>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="settings-container">
        <div className="settings-title-section">
          <h1>Account Settings</h1>
          <p>Manage your profile and account security settings.</p>
        </div>

        {/* ── Profile Information ── */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-header-icon">
              <User size={18} />
            </div>
            <h2>Profile Information</h2>
          </div>
          <div className="settings-card-body">
            <div className="profile-flex">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name || 'User Avatar'} className="profile-avatar-lg" />
              ) : (
                <div className="profile-avatar-placeholder">
                  {user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
                </div>
              )}

              <div className="profile-details">
                <p className="profile-name">{user?.name || 'Unknown User'}</p>
                <p className="profile-email">{user?.email || '—'}</p>

                <div className={`provider-badge ${badge.className}`}>
                  <BadgeIcon size={13} />
                  <span>{badge.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Password Settings ── */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-header-icon">
              <Lock size={18} />
            </div>
            <h2>Password Settings</h2>
          </div>

          <div className="settings-card-body">
            {passwordSet ? (
              <div className="alert-banner success">
                <CheckCircle size={18} style={{ shrink: 0 }} />
                <div>
                  <strong>Password Set Successfully!</strong>
                  <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.9 }}>
                    You can now log in using either Google or your email and password.
                  </p>
                </div>
              </div>
            ) : !hasPassword ? (
              <div>
                <div className="alert-banner info">
                  <Info size={18} style={{ shrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ margin: 0 }}>
                      You signed in with Google. Set a password to also log in using your email and password in the future.
                    </p>
                  </div>
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px', color: 'var(--text-hi)' }}>
                  Set Account Password
                </h3>
                <SetPasswordForm onSuccess={handlePasswordSetSuccess} />
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px', color: 'var(--text-hi)' }}>
                  Change Password
                </h3>
                <ChangePasswordForm />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
