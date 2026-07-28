import React, { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DP_CATEGORIES, titleFromSlug } from './data/dpData';
import { TREE_CATEGORIES } from './data/treeData';
import { GRAPH_CATEGORIES } from './data/graphData';

import { NavBar } from './components/NavBar';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { Controls } from './components/Controls';
import { CategoryAccordion } from './components/CategoryAccordion';

export default function App() {
  // Navigation active tab: 'dp' | 'tree' | 'graph'
  const [activeTab, setActiveTab] = useState('dp');

  // Apply theme class to body for full-page gradient
  useEffect(() => {
    document.body.classList.remove('theme-dp', 'theme-tree', 'theme-graph');
    document.body.classList.add(`theme-${activeTab}`);
  }, [activeTab]);

  // Independent LocalStorage states for each sheet
  const [dpChecked, setDpChecked] = useLocalStorage('dp_sheet_solved_v1', {});
  const [treeChecked, setTreeChecked] = useLocalStorage('tree_sheet_solved_v1', {});
  const [graphChecked, setGraphChecked] = useLocalStorage('graph_sheet_solved_v1', {});

  // Search & filter states
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('ALL');

  // Open categories state
  const [openCategories, setOpenCategories] = useState(() => new Set([0]));

  // Get current active sheet categories & state setters
  const { categories, checkedState, setCheckedState } = useMemo(() => {
    if (activeTab === 'tree') {
      return { categories: TREE_CATEGORIES, checkedState: treeChecked, setCheckedState: setTreeChecked };
    }
    if (activeTab === 'graph') {
      return { categories: GRAPH_CATEGORIES, checkedState: graphChecked, setCheckedState: setGraphChecked };
    }
    return { categories: DP_CATEGORIES, checkedState: dpChecked, setCheckedState: setDpChecked };
  }, [activeTab, dpChecked, treeChecked, graphChecked, setDpChecked, setTreeChecked, setGraphChecked]);

  // Helper helper to calculate total and done for any sheet
  const calculateSheetTotals = (cats, checkedMap) => {
    let total = 0;
    let done = 0;
    cats.forEach((cat) => {
      cat.problems.forEach(([slug]) => {
        total += 1;
        if (checkedMap[slug]) done += 1;
      });
    });
    return { total, done };
  };

  // Nav stats summary for all 3 sheets
  const sheetStats = useMemo(() => {
    return {
      dp: calculateSheetTotals(DP_CATEGORIES, dpChecked),
      tree: calculateSheetTotals(TREE_CATEGORIES, treeChecked),
      graph: calculateSheetTotals(GRAPH_CATEGORIES, graphChecked)
    };
  }, [dpChecked, treeChecked, graphChecked]);

  // Toggle single problem solved state in active sheet
  const handleToggleProblem = (slug) => {
    setCheckedState((prev) => {
      const next = { ...prev };
      if (next[slug]) {
        delete next[slug];
      } else {
        next[slug] = true;
      }
      return next;
    });
  };

  // Reset active sheet progress
  const handleResetProgress = () => {
    setCheckedState({});
  };

  // Expand all categories
  const handleExpandAll = () => {
    const allIndices = new Set(categories.map((_, idx) => idx));
    setOpenCategories(allIndices);
  };

  // Collapse all categories
  const handleCollapseAll = () => {
    setOpenCategories(new Set());
  };

  // Toggle category collapse
  const handleToggleCategory = (catIndex) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catIndex)) {
        next.delete(catIndex);
      } else {
        next.add(catIndex);
      }
      return next;
    });
  };

  // Compute difficulty breakdown stats for active sheet
  const statsByDiff = useMemo(() => {
    const stats = {
      E: { done: 0, total: 0 },
      M: { done: 0, total: 0 },
      H: { done: 0, total: 0 }
    };

    categories.forEach((cat) => {
      cat.problems.forEach(([slug, diff]) => {
        if (stats[diff]) {
          stats[diff].total += 1;
          if (checkedState[slug]) {
            stats[diff].done += 1;
          }
        }
      });
    });

    return stats;
  }, [categories, checkedState]);

  const totalSolved = statsByDiff.E.done + statsByDiff.M.done + statsByDiff.H.done;

  // Filter categories and problems by search and difficulty
  const processedCategories = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();

    return categories.map((category, catIndex) => {
      const filteredProblems = category.problems.filter(([slug, diff]) => {
        if (diffFilter !== 'ALL' && diff !== diffFilter) return false;
        if (cleanSearch) {
          const title = titleFromSlug(slug).toLowerCase();
          if (!title.includes(cleanSearch) && !slug.toLowerCase().includes(cleanSearch)) {
            return false;
          }
        }
        return true;
      });

      return {
        category,
        catIndex,
        filteredProblems
      };
    }).filter(({ filteredProblems }) => {
      if ((search || diffFilter !== 'ALL') && filteredProblems.length === 0) {
        return false;
      }
      return true;
    });
  }, [categories, search, diffFilter]);

  return (
    <>
      <NavBar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSearch('');
          setDiffFilter('ALL');
          setOpenCategories(new Set([0]));
        }}
        sheetStats={sheetStats}
      />

      <div className="wrap" data-theme={activeTab}>
        <Header
          activeTab={activeTab}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          onResetProgress={handleResetProgress}
          totalSolved={totalSolved}
        />

        <StatsCard statsByDiff={statsByDiff} />

        <Controls
          search={search}
          setSearch={setSearch}
          diffFilter={diffFilter}
          setDiffFilter={setDiffFilter}
        />

        <div className="category-list">
          {processedCategories.length === 0 ? (
            <div className="empty-msg">
              No problems match your current search "{search}" or difficulty filter "{diffFilter}".
            </div>
          ) : (
            processedCategories.map(({ category, catIndex, filteredProblems }) => {
              const isOpen = search.trim().length > 0 ? true : openCategories.has(catIndex);

              return (
                <CategoryAccordion
                  key={category.name}
                  category={category}
                  catIndex={catIndex}
                  isOpen={isOpen}
                  onToggleOpen={() => handleToggleCategory(catIndex)}
                  filteredProblems={filteredProblems}
                  checkedState={checkedState}
                  onToggleProblem={handleToggleProblem}
                />
              );
            })
          )}
        </div>

        <footer className="footer-note">
          Difficulty tags are approximate — verify on the LeetCode problem page if needed for tracking. Progress is saved independently in browser storage for each sheet topic.
        </footer>
      </div>
    </>
  );
}
