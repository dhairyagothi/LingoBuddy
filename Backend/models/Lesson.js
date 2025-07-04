import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  lessonId: {
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
  section: {
    type: Number,
    required: true,
    default: 1
  },
  unit: {
    type: Number,
    required: true,
    default: 1
  },
  order: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['vocabulary', 'grammar', 'pronunciation', 'conversation', 'listening'],
    default: 'vocabulary'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  xpReward: {
    type: Number,
    default: 10
  },
  content: {
    words: [{
      word: String,
      translation: String,
      pronunciation: String,
      example: String,
      exampleTranslation: String
    }],
    grammar: {
      rule: String,
      explanation: String,
      examples: [String]
    },
    exercises: [{
      type: {
        type: String,
        enum: ['multiple-choice', 'translation', 'listening', 'speaking']
      },
      question: String,
      options: [String],
      correctAnswer: String,
      explanation: String
    }]
  },
  prerequisites: [{
    type: String // lessonId references
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
lessonSchema.index({ language: 1, section: 1, unit: 1, order: 1 });

export default mongoose.model('Lesson', lessonSchema);
