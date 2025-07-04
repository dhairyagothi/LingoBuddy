import express from 'express';
import Progress from '../models/Progress.js';
import User from '../models/User.js';

const router = express.Router();

// Get user progress for a language
router.get('/:userId/:languageId', async (req, res) => {
  try {
    const { userId, languageId } = req.params;
    
    const progress = await Progress.findOne({ userId, languageId });
    const user = await User.findById(userId).select('streak gems hearts xp level');
    
    if (!progress || !user) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found'
      });
    }

    res.json({
      success: true,
      progress: {
        userId: progress.userId,
        languageId: progress.languageId,
        lessonsCompleted: progress.lessonsCompleted,
        quizzesCompleted: progress.quizzesCompleted,
        currentLevel: progress.currentLevel,
        xpEarned: progress.xpEarned,
        streakCount: progress.streakCount,
        lastActivity: progress.lastActivity,
        user: {
          streak: user.streak,
          gems: user.gems,
          hearts: user.hearts,
          xp: user.xp,
          level: user.level
        }
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Complete a lesson
router.post('/complete-lesson', async (req, res) => {
  try {
    const { userId, languageId, lessonId, xpEarned } = req.body;

    if (!userId || !languageId || !lessonId || xpEarned === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Find or create progress
    let progress = await Progress.findOne({ userId, languageId });
    if (!progress) {
      progress = await Progress.create({
        userId,
        languageId,
        lessonsCompleted: [],
        quizzesCompleted: [],
        currentLevel: 1,
        xpEarned: 0,
        streakCount: 0
      });
    }

    // Update progress if lesson not already completed
    if (!progress.lessonsCompleted.includes(lessonId)) {
      progress.lessonsCompleted.push(lessonId);
      progress.xpEarned += xpEarned;
      progress.lastActivity = new Date();
      await progress.save();

      // Update user XP and level
      const user = await User.findById(userId);
      user.xp += xpEarned;
      
      // Calculate new level (every 100 XP = 1 level)
      const newLevel = Math.floor(user.xp / 100) + 1;
      user.level = newLevel;
      
      await user.save();

      res.json({
        success: true,
        message: 'Lesson completed successfully',
        progress: {
          xpEarned: progress.xpEarned,
          totalUserXP: user.xp,
          level: user.level,
          lessonsCompleted: progress.lessonsCompleted.length
        }
      });
    } else {
      res.json({
        success: true,
        message: 'Lesson already completed',
        progress: {
          xpEarned: progress.xpEarned,
          lessonsCompleted: progress.lessonsCompleted.length
        }
      });
    }
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Complete a quiz
router.post('/complete-quiz', async (req, res) => {
  try {
    const { userId, languageId, quizId, score, xpEarned } = req.body;

    if (!userId || !languageId || !quizId || score === undefined || xpEarned === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Find or create progress
    let progress = await Progress.findOne({ userId, languageId });
    if (!progress) {
      progress = await Progress.create({
        userId,
        languageId,
        lessonsCompleted: [],
        quizzesCompleted: [],
        currentLevel: 1,
        xpEarned: 0,
        streakCount: 0
      });
    }

    // Add quiz completion
    const quizCompletion = {
      quizId,
      score,
      completedAt: new Date()
    };

    progress.quizzesCompleted.push(quizCompletion);
    progress.xpEarned += xpEarned;
    progress.lastActivity = new Date();
    await progress.save();

    // Update user XP and level
    const user = await User.findById(userId);
    user.xp += xpEarned;
    
    // Calculate new level
    const newLevel = Math.floor(user.xp / 100) + 1;
    user.level = newLevel;
    
    await user.save();

    res.json({
      success: true,
      message: 'Quiz completed successfully',
      progress: {
        score,
        xpEarned: progress.xpEarned,
        totalUserXP: user.xp,
        level: user.level,
        quizzesCompleted: progress.quizzesCompleted.length
      }
    });
  } catch (error) {
    console.error('Complete quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;

