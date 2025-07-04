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
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  timeLimit: {
    type: Number, // in minutes
    default: 10
  },
  questions: [{
    question: {
      type: String,
      required: true
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
      default: 1
    }
  }],
  totalPoints: {
    type: Number,
    default: 0
  },
  passScore: {
    type: Number,
    default: 60 // percentage
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calculate total points
quizSchema.pre('save', function(next) {
  this.totalPoints = this.questions.reduce((total, question) => total + question.points, 0);
  next();
});

// Index for efficient querying
quizSchema.index({ language: 1, difficulty: 1 });

export default mongoose.model('Quiz', quizSchema);
