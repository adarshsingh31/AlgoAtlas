import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { Layers, GitFork, Share2, Flame, Menu, X, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';
import '../../pages/Home/Home.css';

const Navbar = ({ activeTab, setActiveTab, sheetStats }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSheetPage = ['/questions', '/dashboard', '/dp', '/tree', '/graph'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';

  const tabs = [
    {
      id: 'dp',
      label: 'Dynamic Programming',
      shortLabel: 'DP Sheet',
      icon: Layers,
      stats: sheetStats?.dp || { done: 0, total: 0 }
    },
    {
      id: 'tree',
      label: 'Binary Trees & BST',
      shortLabel: 'Tree Sheet',
      icon: GitFork,
      stats: sheetStats?.tree || { done: 0, total: 0 }
    },
    {
      id: 'graph',
      label: 'Graph Algorithms',
      shortLabel: 'Graph Sheet',
      icon: Share2,
      stats: sheetStats?.graph || { done: 0, total: 0 }
    }
  ];

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/', { replace: true });
  };

  const handleSelectTab = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    setMobileOpen(false);
    navigate(`/${tabId}`);
  };

  const currentPath = location.pathname + location.search;

  return (
    <nav className="top-navbar">
      <div className="nav-header-row">
        {/* Brand */}
        <Link to="/" className="nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="brand-icon-wrap">
            <Flame size={20} className="brand-icon" />
          </div>
          <span className="brand-title">AlgoAtlas</span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navigation Content (Tabs or Links) */}
      <div className={`nav-tabs ${mobileOpen ? 'mobile-open' : ''}`}>
        {isSheetPage ? (
          tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id || location.pathname === `/${tab.id}`;
            const pct = tab.stats.total > 0 ? Math.round((tab.stats.done / tab.stats.total) * 100) : 0;

            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectTab(tab.id)}
              >
                <Icon size={16} />
                <span className="tab-label">{tab.shortLabel}</span>
                {tab.stats.total > 0 && (
                  <span className={`tab-badge ${pct === 100 ? 'complete' : ''}`}>
                    {tab.stats.done}/{tab.stats.total}
                  </span>
                )}
              </button>
            );
          })
        ) : (
          <div className="nav-links">
            <a href="#sheets" onClick={() => setMobileOpen(false)}>Sheets</a>
            <a href="#how" onClick={() => setMobileOpen(false)}>How it works</a>
            <a href="#difficulty" onClick={() => setMobileOpen(false)}>Coverage</a>
          </div>
        )}

        {/* Mobile Auth Row */}
        {!loading && (
          <div className="mobile-user-row">
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user?.name || 'User'}
                      style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--accent)', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'var(--accent-glow)',
                        border: '1px solid var(--accent)',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14
                      }}
                    >
                      {user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                  )}
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-hi)' }}>
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate('/settings');
                    }}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: 12, gap: 6, flex: 1 }}
                  >
                    <Settings size={14} />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="btn-secondary danger"
                    style={{ padding: '6px 12px', fontSize: 12, gap: 6, flex: 1 }}
                  >
                    <LogOut size={13} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                <Link
                  to="/login"
                  state={{ from: currentPath }}
                  className="btn-secondary"
                  style={{ textDecoration: 'none', padding: '8px 14px', fontSize: 13, flex: 1, textAlign: 'center' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  state={{ from: currentPath }}
                  className="nav-cta"
                  style={{ flex: 1, textAlign: 'center' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Auth Controls */}
      {!loading && (
        isAuthenticated ? (
          <div className="desktop-user-profile">
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '2px solid var(--accent)',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'var(--accent-glow)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14
                  }}
                >
                  {user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
                </div>
              )}
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-hi)', maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || user?.email?.split('@')[0]}
              </span>
            </div>

            <button
              onClick={() => navigate('/settings')}
              className="btn-secondary"
              style={{
                padding: '7px 10px',
                fontSize: 12.5,
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              title="Settings"
              aria-label="Settings"
            >
              <Settings size={15} />
            </button>

            <button
              onClick={handleLogout}
              className="btn-secondary danger"
              style={{ padding: '7px 14px', fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              title="Log out"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="desktop-user-profile" style={{ gap: 12 }}>
            <Link
              to="/login"
              state={{ from: currentPath }}
              style={{
                color: 'var(--text-hi)',
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 8,
                transition: 'all 0.15s ease',
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              state={{ from: currentPath }}
              className="nav-cta"
            >
              Sign Up →
            </Link>
          </div>
        )
      )}
    </nav>
  );
};

export default Navbar;
export { Navbar as NavBar };
