import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  updateProgress,
  getAllProgress,
  getStats,
  getSheetProgress,
  resetProgress,
} from '../controllers/progressController.js';

const router = express.Router();

// Apply JWT authentication middleware to all progress endpoints
router.use(protect);

router.post('/update', updateProgress);
router.get('/', getAllProgress);
router.get('/stats', getStats);
router.get('/sheet/:sheet', getSheetProgress);
router.delete('/reset', resetProgress);

export default router;
