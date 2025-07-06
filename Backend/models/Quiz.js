import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  languageId: {
    type: String,
    required: true,
    enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'japanese', 'korean', 'chinese']
  },
  category: {
    type: String,
    required: true,
    enum: ['vocabulary', 'grammar', 'listening', 'reading', 'speaking', 'culture', 'mixed']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  timeLimit: {
    type: Number, // in seconds per question
    default: 30
  },
  xpReward: {
    type: Number,
    required: true,
    default: 10
  },
  gemsReward: {
    type: Number,
    default: 5
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      enum: ['multiple-choice', 'fill-blank', 'true-false', 'matching'],
      default: 'multiple-choice'
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    },
    explanation: {
      type: String,
      default: ''
    },
    points: {
      type: Number,
      default: 10
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy'
    }
  }],
  passScore: {
    type: Number,
    default: 60 // percentage
  },
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  completionCount: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Calculate total points before saving
quizSchema.pre('save', function(next) {
  if (this.questions && this.questions.length > 0) {
    this.totalPoints = this.questions.reduce((total, question) => total + (question.points || 10), 0);
  }
  next();
});

// Instance method to calculate score percentage
quizSchema.methods.calculateScorePercentage = function(correctAnswers) {
  return Math.round((correctAnswers / this.questions.length) * 100);
};

// Static method to find quizzes by difficulty and language
quizSchema.statics.findByLanguageAndDifficulty = function(languageId, difficulty) {
  return this.find({ languageId, difficulty, isActive: true }).sort({ level: 1 });
};

// Index for efficient querying
quizSchema.index({ languageId: 1, difficulty: 1 });
quizSchema.index({ level: 1 });
quizSchema.index({ isActive: 1 });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
