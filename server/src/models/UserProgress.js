import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    problemId: {
      type: String,
      required: true,
      index: true,
    },
    sheet: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      default: '',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'E', 'M', 'H'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Not Started', 'Solved'],
      default: 'Not Started',
    },
    bookmarked: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: '',
    },
    attemptCount: {
      type: Number,
      default: 0,
    },
    lastSolved: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to guarantee one document per user + problemId
userProgressSchema.index({ user: 1, problemId: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
