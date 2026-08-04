import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import useProgress from '../../hooks/useProgress.js';

import Navbar from '../../components/common/Navbar.jsx';
import { Header } from '../../components/Header.jsx';
import { StatsCard } from '../../components/StatsCard.jsx';
import { Controls } from '../../components/Controls.jsx';
import { CategoryAccordion } from '../../components/CategoryAccordion.jsx';
import AuthModal from '../../components/common/AuthModal.jsx';

import { DP_CATEGORIES, titleFromSlug } from '../../data/dpData.js';
import { TREE_CATEGORIES } from '../../data/treeData.js';
import { GRAPH_CATEGORIES } from '../../data/graphData.js';

/**
 * Dashboard.jsx — Question Set page for AlgoAtlas.
 * Anonymous browsing allowed; progress actions prompt AuthModal.
 */
const Dashboard = ({ defaultTab }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { checkedState, toggleProblem, resetSheetProgress } = useProgress();
  const navigate = useNavigate();
  const location = useLocation();

  // Derive initial tab from prop or pathname (/dp, /tree, /graph)
  const pathTab = location.pathname.replace('/', '');
  const initialTab = defaultTab || (['dp', 'tree', 'graph'].includes(pathTab) ? pathTab : 'dp');

  const [activeTab, setActiveTab] = useState(initialTab); // 'dp' | 'tree' | 'graph'
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('ALL'); // 'ALL' | 'E' | 'M' | 'H'
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Open/closed state for categories per tab: { [catIndex]: boolean }
  const [openCategories, setOpenCategories] = useState({});

  // Sync activeTab when pathname changes (/dp, /tree, /graph)
  useEffect(() => {
    const currentTabFromPath = location.pathname.replace('/', '');
    if (['dp', 'tree', 'graph'].includes(currentTabFromPath)) {
      setActiveTab(currentTabFromPath);
    }
  }, [location.pathname]);

  // Set theme class on body
  useEffect(() => {
    document.body.className = `theme-${activeTab}`;
    return () => {
      document.body.className = '';
    };
  }, [activeTab]);

  // Reset category expansion when switching tabs
  useEffect(() => {
    setOpenCategories({});
  }, [activeTab]);

  const categories = useMemo(() => {
    if (activeTab === 'tree') return TREE_CATEGORIES;
    if (activeTab === 'graph') return GRAPH_CATEGORIES;
    return DP_CATEGORIES;
  }, [activeTab]);

  // Compute stats across all 3 sheets for NavBar badges & overall tracking
  const sheetStats = useMemo(() => {
    const calcStats = (cats) => {
      let total = 0;
      let done = 0;
      cats.forEach((cat) => {
        cat.problems.forEach(([slug]) => {
          total++;
          if (checkedState[slug]) done++;
        });
      });
      return { done, total };
    };

    return {
      dp: calcStats(DP_CATEGORIES),
      tree: calcStats(TREE_CATEGORIES),
      graph: calcStats(GRAPH_CATEGORIES),
    };
  }, [checkedState]);

  // Stats by difficulty for current sheet (StatsCard)
  const statsByDiff = useMemo(() => {
    const stats = {
      E: { done: 0, total: 0 },
      M: { done: 0, total: 0 },
      H: { done: 0, total: 0 },
    };

    categories.forEach((cat) => {
      cat.problems.forEach(([slug, diff]) => {
        if (stats[diff]) {
          stats[diff].total++;
          if (checkedState[slug]) stats[diff].done++;
        }
      });
    });

    return stats;
  }, [categories, checkedState]);

  const totalSolvedInCurrentSheet = useMemo(() => {
    return statsByDiff.E.done + statsByDiff.M.done + statsByDiff.H.done;
  }, [statsByDiff]);

  const handleToggleProblem = (slug, categoryName, diff) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    let catName = categoryName;
    let difficulty = diff;

    if (!catName || !difficulty) {
      for (const cat of categories) {
        const found = cat.problems.find(([pSlug]) => pSlug === slug);
        if (found) {
          catName = catName || cat.name;
          difficulty = difficulty || found[1];
          break;
        }
      }
    }

    toggleProblem(slug, {
      sheet: activeTab,
      category: catName || '',
      difficulty: difficulty || 'E',
    });
  };

  const handleToggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: prev[index] === undefined ? false : !prev[index],
    }));
  };

  const handleExpandAll = () => {
    const newOpen = {};
    categories.forEach((_, idx) => {
      newOpen[idx] = true;
    });
    setOpenCategories(newOpen);
  };

  const handleCollapseAll = () => {
    const newOpen = {};
    categories.forEach((_, idx) => {
      newOpen[idx] = false;
    });
    setOpenCategories(newOpen);
  };

  const handleResetProgress = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const sheetSlugs = [];
    categories.forEach((cat) => {
      cat.problems.forEach(([slug]) => {
        sheetSlugs.push(slug);
      });
    });
    resetSheetProgress(activeTab, sheetSlugs);
  };

  return (
    <div className="wrap" data-theme={activeTab}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sheetStats={sheetStats}
      />

      <Header
        activeTab={activeTab}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        onResetProgress={handleResetProgress}
        totalSolved={totalSolvedInCurrentSheet}
      />

      <StatsCard statsByDiff={statsByDiff} />

      <Controls
        search={search}
        setSearch={setSearch}
        diffFilter={diffFilter}
        setDiffFilter={setDiffFilter}
      />

      <div className="categories-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {categories.map((category, catIndex) => {
          const filteredProblems = category.problems.filter(([slug, diff]) => {
            const matchesDiff = diffFilter === 'ALL' || diff === diffFilter;
            const title = titleFromSlug(slug).toLowerCase();
            const query = search.toLowerCase();
            const matchesSearch =
              !query || title.includes(query) || slug.includes(query);
            return matchesDiff && matchesSearch;
          });

          // Keep category open when actively searching or filtering by difficulty
          const isOpen =
            search || diffFilter !== 'ALL'
              ? true
              : openCategories[catIndex] !== false;

          return (
            <CategoryAccordion
              key={category.name}
              category={category}
              catIndex={catIndex}
              isOpen={isOpen}
              onToggleOpen={() => handleToggleCategory(catIndex)}
              filteredProblems={filteredProblems}
              checkedState={checkedState}
              onToggleProblem={(slug) => handleToggleProblem(slug, category.name)}
            />
          );
        })}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message="Sign in to save your progress across all devices."
      />
    </div>
  );
};

export default Dashboard;
