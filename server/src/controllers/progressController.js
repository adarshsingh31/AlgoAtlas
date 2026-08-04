import UserProgress from '../models/UserProgress.js';

// Total problems across all 3 sheets in AlgoAtlas (221 DP + 35 Tree + 34 Graph)
const TOTAL_PROBLEMS_COUNT = 290;

/**
 * POST /api/progress/update
 * Upsert a single problem progress for the authenticated user.
 */
export const updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      problemId,
      sheet = 'dp',
      category = '',
      difficulty = 'E',
      status = 'Solved',
      bookmarked,
      notes,
      attemptCount,
    } = req.body;

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: 'problemId is required',
      });
    }

    const updateFields = {
      sheet,
      category,
      difficulty,
      status,
    };

    if (status === 'Solved') {
      updateFields.lastSolved = new Date();
    } else {
      updateFields.lastSolved = null;
    }

    if (typeof bookmarked === 'boolean') updateFields.bookmarked = bookmarked;
    if (typeof notes === 'string') updateFields.notes = notes;
    if (typeof attemptCount === 'number') updateFields.attemptCount = attemptCount;

    const progress = await UserProgress.findOneAndUpdate(
      { user: userId, problemId },
      { $set: updateFields },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('Error in updateProgress:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update progress',
      error: error.message,
    });
  }
};

/**
 * GET /api/progress
 * Get all problem progress entries for the logged-in user.
 */
export const getAllProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progressList = await UserProgress.find({ user: userId });

    return res.status(200).json({
      success: true,
      count: progressList.length,
      progress: progressList,
    });
  } catch (error) {
    console.error('Error in getAllProgress:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
      error: error.message,
    });
  }
};

/**
 * GET /api/progress/stats
 * Return overall and per-sheet solved statistics.
 */
export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const solvedRecords = await UserProgress.find({
      user: userId,
      status: 'Solved',
    });

    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    let dpSolved = 0;
    let treeSolved = 0;
    let graphSolved = 0;

    solvedRecords.forEach((record) => {
      totalSolved++;

      // Difficulty counters
      const diff = (record.difficulty || '').toUpperCase();
      if (diff === 'E' || diff === 'EASY') easySolved++;
      else if (diff === 'M' || diff === 'MEDIUM') mediumSolved++;
      else if (diff === 'H' || diff === 'HARD') hardSolved++;

      // Sheet counters
      const sheet = (record.sheet || '').toLowerCase();
      if (sheet === 'dp') dpSolved++;
      else if (sheet === 'tree') treeSolved++;
      else if (sheet === 'graph') graphSolved++;
    });

    const completionPercentage =
      TOTAL_PROBLEMS_COUNT > 0
        ? Math.round((totalSolved / TOTAL_PROBLEMS_COUNT) * 100 * 100) / 100
        : 0;

    return res.status(200).json({
      success: true,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      dpSolved,
      treeSolved,
      graphSolved,
      completionPercentage,
    });
  } catch (error) {
    console.error('Error in getStats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate stats',
      error: error.message,
    });
  }
};

/**
 * GET /api/progress/sheet/:sheet
 * Get all progress entries for a specific sheet (e.g. dp, tree, graph).
 */
export const getSheetProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sheet } = req.params;

    const progressList = await UserProgress.find({
      user: userId,
      sheet: new RegExp(`^${sheet}$`, 'i'),
    });

    return res.status(200).json({
      success: true,
      sheet,
      count: progressList.length,
      progress: progressList,
    });
  } catch (error) {
    console.error('Error in getSheetProgress:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sheet progress',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/progress/reset
 * Reset current user's progress (all or single sheet via ?sheet=...).
 */
export const resetProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sheet } = req.query;

    const filter = { user: userId };
    if (sheet) {
      filter.sheet = new RegExp(`^${sheet}$`, 'i');
    }

    const result = await UserProgress.deleteMany(filter);

    return res.status(200).json({
      success: true,
      message: sheet
        ? `Progress for sheet '${sheet}' reset successfully.`
        : 'All progress reset successfully.',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error in resetProgress:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reset progress',
      error: error.message,
    });
  }
};
