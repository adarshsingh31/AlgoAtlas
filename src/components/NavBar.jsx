import React from 'react';
import { Layers, GitFork, Share2, Flame } from 'lucide-react';

export function NavBar({ activeTab, setActiveTab, sheetStats }) {
  const tabs = [
    {
      id: 'dp',
      label: 'Dynamic Programming',
      shortLabel: 'DP Sheet',
      icon: Layers,
      stats: sheetStats.dp
    },
    {
      id: 'tree',
      label: 'Binary Trees & BST',
      shortLabel: 'Tree Sheet',
      icon: GitFork,
      stats: sheetStats.tree
    },
    {
      id: 'graph',
      label: 'Graph Algorithms',
      shortLabel: 'Graph Sheet',
      icon: Share2,
      stats: sheetStats.graph
    }
  ];

  return (
    <nav className="top-navbar">
      <div className="nav-brand">
        <div className="brand-icon-wrap">
          <Flame size={20} className="brand-icon" />
        </div>
        <span className="brand-title">Nahi Kar Paoge</span>
      </div>

      <div className="nav-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const pct = tab.stats.total > 0 ? Math.round((tab.stats.done / tab.stats.total) * 100) : 0;

          return (
            <button
              key={tab.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span className="tab-label">{tab.shortLabel}</span>
              <span className={`tab-badge ${pct === 100 ? 'complete' : ''}`}>
                {tab.stats.done}/{tab.stats.total}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
