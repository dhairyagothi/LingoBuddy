const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'japanese', 'korean', 'chinese']
  },
  totalXP: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  hearts: {
    type: Number,
    default: 5,
    max: 5
  },
  gems: {
    type: Number,
    default: 500
  },
  streak: {
    type: Number,
    default: 0
  },
  lastStudyDate: {
    type: Date,
    default: null
  },
  completedLessons: [{
    lessonId: {
      type: String,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    xpEarned: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    }
  }],
  quizResults: [{
    quizId: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    correctAnswers: {
      type: Number,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    }
  }],
  achievements: [{
    achievementId: {
      type: String,
      required: true
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }],
  currentSection: {
    type: Number,
    default: 1
  },
  currentUnit: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Create compound index for user and language
progressSchema.index({ userId: 1, language: 1 }, { unique: true });

// Calculate level based on XP
progressSchema.methods.calculateLevel = function() {
  const xpPerLevel = 100;
  this.level = Math.floor(this.totalXP / xpPerLevel) + 1;
  return this.level;
};

// Update streak
progressSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastStudy = this.lastStudyDate;
  
  if (!lastStudy) {
    this.streak = 1;
  } else {
    const daysDiff = Math.floor((today - lastStudy) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      this.streak += 1;
    } else if (daysDiff > 1) {
      this.streak = 1;
    }
    // If daysDiff === 0, keep current streak (studied today already)
  }
  
  this.lastStudyDate = today;
  return this.streak;
};

module.exports = mongoose.model('Progress', progressSchema);
