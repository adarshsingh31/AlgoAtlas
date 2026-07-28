import React from 'react';
import { Layers, GitFork, Share2, RotateCcw, ChevronDown, ChevronUp, Database } from 'lucide-react';

const SHEET_INFO = {
  dp: {
    eyebrow: "Category-Wise DP Problem Sheet",
    title: "Dynamic Programming",
    subtitle: "Curated DP problems from the LeetCode discuss list, grouped by pattern instead of difficulty — so you drill one recurrence idea at a time. Progress auto-saves to browser storage.",
    icon: Layers
  },
  tree: {
    eyebrow: "Binary Trees & BST Problem Sheet",
    title: "Binary Trees & BST",
    subtitle: "Essential Tree patterns covering traversals, BST operations, tree construction, view problems, and path algorithms. Progress auto-saves to browser storage.",
    icon: GitFork
  },
  graph: {
    eyebrow: "Graph Algorithms Problem Sheet",
    title: "Graph Algorithms",
    subtitle: "Comprehensive graph problem sheet categorized by BFS/DFS, Shortest Path, Union-Find (DSU), Topological Sort, Graph Coloring, MST, and Connectivity. Progress auto-saves to browser storage.",
    icon: Share2
  }
};

export function Header({ activeTab, onExpandAll, onCollapseAll, onResetProgress, totalSolved }) {
  const currentSheet = SHEET_INFO[activeTab] || SHEET_INFO.dp;
  const SheetIcon = currentSheet.icon;

  const handleReset = () => {
    if (totalSolved === 0) return;
    if (window.confirm(`Are you sure you want to reset all your solved problems in ${currentSheet.title}?`)) {
      onResetProgress();
    }
  };

  return (
    <header className="header-container">
      <div className="eyebrow-badge">
        <SheetIcon size={13} />
        <span>{currentSheet.eyebrow}</span>
      </div>

      <h1 className="main-title">{currentSheet.title}</h1>
      <p className="subtitle">{currentSheet.subtitle}</p>

      <div className="header-actions">
        <button className="btn-secondary" onClick={onExpandAll} title="Expand all categories">
          <ChevronDown size={14} />
          <span>Expand All</span>
        </button>
        <button className="btn-secondary" onClick={onCollapseAll} title="Collapse all categories">
          <ChevronUp size={14} />
          <span>Collapse All</span>
        </button>
        <button
          className="btn-secondary danger"
          onClick={handleReset}
          disabled={totalSolved === 0}
          style={{ opacity: totalSolved === 0 ? 0.5 : 1, cursor: totalSolved === 0 ? 'not-allowed' : 'pointer' }}
          title="Reset solved state for this sheet"
        >
          <RotateCcw size={14} />
          <span>Reset Progress</span>
        </button>

         
      </div>
    </header>
  );
}
