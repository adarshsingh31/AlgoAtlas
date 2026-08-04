import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, X, LogIn, UserPlus } from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, message }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const currentPath = location.pathname + location.search;

  const handleSignIn = () => {
    onClose();
    navigate('/login', { state: { from: currentPath } });
  };

  const handleSignUp = () => {
    onClose();
    navigate('/signup', { state: { from: currentPath } });
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-icon-wrap">
            <Lock size={22} />
          </div>
          <h2>Sign in to save your progress</h2>
        </div>

        <p className="auth-modal-message">
          {message || 'Sign in to save your progress across all devices.'}
        </p>

        <div className="auth-modal-actions">
          <button onClick={handleSignIn} className="auth-modal-btn primary">
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
          <button onClick={handleSignUp} className="auth-modal-btn secondary">
            <UserPlus size={16} />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
}
