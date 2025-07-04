import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get global leaderboard
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select('name xp level streak')
      .sort({ xp: -1 })
      .limit(50);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      name: user.name,
      xp: user.xp,
      level: user.level,
      streak: user.streak
    }));

    res.json({
      success: true,
      leaderboard
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get weekly leaderboard (based on recent activity)
router.get('/weekly', async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const users = await User.find({
      updatedAt: { $gte: oneWeekAgo }
    })
      .select('name xp level streak')
      .sort({ xp: -1 })
      .limit(25);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      name: user.name,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      weeklyActive: true
    }));

    res.json({
      success: true,
      leaderboard
    });
  } catch (error) {
    console.error('Get weekly leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;


