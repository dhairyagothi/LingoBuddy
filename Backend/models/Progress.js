import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  languageId: {
    type: String,
    required: true,
    enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'japanese', 'korean', 'chinese']
  },
  lessonsCompleted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  quizzesCompleted: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: {
      type: Number,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  currentLevel: {
    type: Number,
    default: 1
  },
  xpEarned: {
    type: Number,
    default: 0
  },
  streakCount: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index for user and language
progressSchema.index({ userId: 1, languageId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
