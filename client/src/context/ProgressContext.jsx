import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useAuth from '../hooks/useAuth.js';
import * as progressService from '../services/progressService.js';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Map of problemId -> boolean (true if status === 'Solved')
  const [checkedState, setCheckedState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch user progress from MongoDB on login / session restore ────────────
  const loadProgress = useCallback(async () => {
    if (!isAuthenticated) {
      setCheckedState({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await progressService.fetchProgress();
      if (data.success && Array.isArray(data.progress)) {
        const stateMap = {};
        data.progress.forEach((item) => {
          if (item.status === 'Solved') {
            stateMap[item.problemId] = true;
          }
        });
        setCheckedState(stateMap);
      }
    } catch (err) {
      console.error('Failed to fetch progress from MongoDB:', err);
      setError('Failed to sync progress with database.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      loadProgress();
    }
  }, [authLoading, loadProgress]);

  // ── Optimistic update problem status ───────────────────────────────────────
  const toggleProblem = useCallback(
    async (slug, metadata = {}) => {
      const isCurrentlySolved = !!checkedState[slug];
      const nextSolvedState = !isCurrentlySolved;
      const nextStatus = nextSolvedState ? 'Solved' : 'Not Started';

      // 1. Optimistic UI update immediately
      setCheckedState((prev) => ({
        ...prev,
        [slug]: nextSolvedState,
      }));

      // 2. Persist change to MongoDB
      try {
        await progressService.updateProgress({
          problemId: slug,
          sheet: metadata.sheet || 'dp',
          category: metadata.category || '',
          difficulty: metadata.difficulty || 'E',
          status: nextStatus,
        });
      } catch (err) {
        console.error(`Failed to update problem ${slug} in MongoDB`, err);
        // Revert optimistic update on failure
        setCheckedState((prev) => ({
          ...prev,
          [slug]: isCurrentlySolved,
        }));
      }
    },
    [checkedState]
  );

  // ── Reset progress for current sheet or all sheets ─────────────────────────
  const resetSheetProgress = useCallback(
    async (sheet, sheetCategorySlugs = []) => {
      // Optimistically clear matching slugs in local state
      setCheckedState((prev) => {
        const nextState = { ...prev };
        sheetCategorySlugs.forEach((slug) => {
          delete nextState[slug];
        });
        return nextState;
      });

      try {
        await progressService.resetProgress(sheet);
      } catch (err) {
        console.error(`Failed to reset progress for sheet '${sheet}' in MongoDB`, err);
        // Reload from server to restore correct state
        loadProgress();
      }
    },
    [loadProgress]
  );

  const value = {
    checkedState,
    loading,
    error,
    toggleProblem,
    resetSheetProgress,
    refetchProgress: loadProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useProgressContext = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgressContext must be used inside <ProgressProvider>');
  }
  return ctx;
};

export default ProgressContext;
