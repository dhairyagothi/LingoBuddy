import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  pointsEarned: {
    type: Number,
    required: true,
    default: 0
  },
  xpEarned: {
    type: Number,
    required: true,
    default: 0
  },
  gemsEarned: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number, // in seconds
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  passed: {
    type: Boolean,
    required: true
  },
  answers: [{
    questionIndex: {
      type: Number,
      required: true
    },
    selectedAnswer: {
      type: Number,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    pointsEarned: {
      type: Number,
      default: 0
    },
    timeSpent: {
      type: Number // in seconds
    }
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  languageId: {
    type: String,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
quizResultSchema.index({ userId: 1, completedAt: -1 });
quizResultSchema.index({ quizId: 1, userId: 1 });
quizResultSchema.index({ languageId: 1, userId: 1 });

// Static method to get user's quiz statistics
quizResultSchema.statics.getUserStats = async function(userId, languageId = null) {
  const query = { userId };
  if (languageId) query.languageId = languageId;
  
  const results = await this.find(query);
  
  return {
    totalQuizzes: results.length,
    averageScore: results.length > 0 ? 
      Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length) : 0,
    totalPointsEarned: results.reduce((sum, r) => sum + r.pointsEarned, 0),
    totalXpEarned: results.reduce((sum, r) => sum + r.xpEarned, 0),
    totalGemsEarned: results.reduce((sum, r) => sum + r.gemsEarned, 0),
    quizzesPassed: results.filter(r => r.passed).length,
    currentStreak: this.calculateStreak(results),
    bestScore: results.length > 0 ? Math.max(...results.map(r => r.percentage)) : 0
  };
};

// Static method to calculate streak
quizResultSchema.statics.calculateStreak = function(results) {
  if (results.length === 0) return 0;
  
  const sortedResults = results.sort((a, b) => b.completedAt - a.completedAt);
  let streak = 0;
  
  for (let result of sortedResults) {
    if (result.passed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;
