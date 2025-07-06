import express from 'express';
import mongoose from 'mongoose';
import Quiz from '../models/Quiz.js';
import QuizResult from '../models/QuizResult.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';

const router = express.Router();

// Get all quizzes for a language
router.get('/:languageId', async (req, res) => {
  try {
    const { languageId } = req.params;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.warn('MongoDB not connected, using mock data');
      return res.json({
        success: true,
        quizzes: getMockQuizzes(languageId),
        source: 'mock'
      });
    }
    
    // Fetch from MongoDB Atlas
    const quizzes = await Quiz.find({ languageId, isActive: true }).sort({ level: 1 });
    
    if (quizzes.length > 0) {
      console.log(`✅ Retrieved ${quizzes.length} quizzes for ${languageId} from MongoDB Atlas`);
      return res.json({
        success: true,
        quizzes,
        source: 'database'
      });
    }
    
    // If no quizzes found in database, suggest seeding
    console.log(`⚠️  No quizzes found for ${languageId} in database. Consider running: npm run seed`);
    return res.json({
      success: true,
      quizzes: getMockQuizzes(languageId),
      source: 'mock',
      message: 'No quizzes in database. Run "npm run seed" to add quiz data.'
    });
    
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching quizzes',
      error: error.message
    });
  }
});

// Get a specific quiz by ID
router.get('/:languageId/:quizId', async (req, res) => {
  try {
    const { languageId, quizId } = req.params;
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not available'
      });
    }
    
    const quiz = await Quiz.findOne({ 
      $or: [
        { _id: quizId },
        { quizId: quizId }
      ],
      languageId,
      isActive: true 
    });
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    res.json({
      success: true,
      quiz
    });
    
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz',
      error: error.message
    });
  }
});

// Submit quiz results
router.post('/:languageId/:quizId/submit', async (req, res) => {
  try {
    const { languageId, quizId } = req.params;
    const { userId, answers, timeSpent, score, percentage } = req.body;
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not available for storing results'
      });
    }
    
    // Find the quiz
    const quiz = await Quiz.findOne({
      $or: [{ _id: quizId }, { quizId: quizId }],
      languageId,
      isActive: true
    });
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Calculate points and rewards
    const pointsEarned = score || 0;
    const xpEarned = Math.round(pointsEarned * 0.5) + quiz.xpReward;
    const gemsEarned = percentage >= quiz.passScore ? quiz.gemsReward : Math.round(quiz.gemsReward * 0.5);
    
    // Save quiz result
    const quizResult = new QuizResult({
      userId: userId || 'anonymous',
      quizId: quiz._id,
      languageId,
      answers,
      score: pointsEarned,
      percentage,
      timeSpent,
      pointsEarned,
      xpEarned,
      gemsEarned,
      passed: percentage >= quiz.passScore
    });
    
    await quizResult.save();
    
    // Update quiz completion count
    await Quiz.findByIdAndUpdate(quiz._id, {
      $inc: { completionCount: 1 },
      $set: { 
        averageScore: await calculateAverageScore(quiz._id)
      }
    });
    
    // Update user progress if userId provided
    if (userId && userId !== 'anonymous') {
      await updateUserProgress(userId, languageId, quiz._id, pointsEarned, xpEarned);
    }
    
    res.json({
      success: true,
      result: {
        score: pointsEarned,
        percentage,
        xpEarned,
        gemsEarned,
        passed: percentage >= quiz.passScore,
        resultId: quizResult._id
      },
      message: percentage >= quiz.passScore ? 'Quiz passed!' : 'Keep practicing!'
    });
    
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting quiz results',
      error: error.message
    });
  }
});

// Helper function to calculate average score
const calculateAverageScore = async (quizId) => {
  try {
    const results = await QuizResult.aggregate([
      { $match: { quizId: quizId } },
      { $group: { _id: null, avgScore: { $avg: '$percentage' } } }
    ]);
    return results.length > 0 ? Math.round(results[0].avgScore) : 0;
  } catch (error) {
    console.error('Error calculating average score:', error);
    return 0;
  }
};

// Helper function to update user progress
const updateUserProgress = async (userId, languageId, quizId, points, xp) => {
  try {
    await Progress.findOneAndUpdate(
      { userId, languageId },
      {
        $addToSet: { 'quizzesCompleted.quizId': quizId },
        $inc: { xpEarned: xp },
        $set: { lastActivity: new Date() }
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error updating progress:', error);
  }
};

// Helper function to get mock quizzes (fallback)
const getMockQuizzes = (languageId) => {
  const mockQuizzes = {
    spanish: [
      {
        _id: 'mock-spanish-basic',
        title: 'Spanish Basics',
        languageId: 'spanish',
        category: 'vocabulary',
        difficulty: 'beginner',
        level: 1,
        timeLimit: 30,
        totalPoints: 50,
        xpReward: 25,
        gemsReward: 5,
        questions: [
          {
            question: 'How do you say "Hello" in Spanish?',
            options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
            correctAnswer: 0,
            explanation: 'Hola is the most common way to say hello in Spanish.',
            points: 10
          },
          {
            question: 'What does "Gracias" mean?',
            options: ['Goodbye', 'Please', 'Thank you', 'Sorry'],
            correctAnswer: 2,
            explanation: 'Gracias means "thank you" in Spanish.',
            points: 10
          }
        ]
      }
    ],
    french: [
      {
        _id: 'mock-french-basic',
        title: 'French Basics',
        languageId: 'french',
        category: 'vocabulary',
        difficulty: 'beginner',
        level: 1,
        timeLimit: 30,
        totalPoints: 50,
        xpReward: 25,
        gemsReward: 5,
        questions: [
          {
            question: 'How do you say "Hello" in French?',
            options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
            correctAnswer: 1,
            explanation: 'Bonjour is the most common way to say hello in French.',
            points: 10
          }
        ]
      }
    ]
  };
  
  return mockQuizzes[languageId] || [];
};

export default router;
