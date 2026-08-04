import api from '../utils/api.js';

/**
 * Fetch all problem progress for the logged-in user from MongoDB.
 */
export const fetchProgress = async () => {
  const { data } = await api.get('/api/progress');
  return data;
};

/**
 * Update single problem progress in MongoDB.
 */
export const updateProgress = async ({ problemId, sheet, category, difficulty, status, bookmarked, notes, attemptCount }) => {
  const { data } = await api.post('/api/progress/update', {
    problemId,
    sheet,
    category,
    difficulty,
    status,
    bookmarked,
    notes,
    attemptCount,
  });
  return data;
};

/**
 * Fetch stats summary from MongoDB.
 */
export const fetchStats = async () => {
  const { data } = await api.get('/api/progress/stats');
  return data;
};

/**
 * Fetch progress for a single sheet.
 */
export const fetchSheetProgress = async (sheet) => {
  const { data } = await api.get(`/api/progress/sheet/${sheet}`);
  return data;
};

/**
 * Reset progress in MongoDB (all or single sheet).
 */
export const resetProgress = async (sheet) => {
  const { data } = await api.delete('/api/progress/reset', {
    params: sheet ? { sheet } : {},
  });
  return data;
};
