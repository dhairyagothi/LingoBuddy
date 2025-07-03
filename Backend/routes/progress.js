import express from 'express';

const router = express.Router();

// Mock progress data
let userProgress = {
  userId: 1,
  currentStreak: 5,
  longestStreak: 12,
  totalXP: 1250,
  level: 3,
  gems: 500,
  hearts: 5,
  completedLessons: [1, 2, 3],
  currentLesson: 4,
  lastActivity: new Date(),
  dailyGoal: 50,
  weeklyXP: 280,
  achievements: [
    { id: 1, name: "First Step", description: "Complete your first lesson", earned: true },
    { id: 2, name: "Streak Keeper", description: "Maintain a 5-day streak", earned: true },
    { id: 3, name: "XP Hunter", description: "Earn 1000 XP", earned: true }
  ]
};

// Get user progress
router.get('/:userId', (req, res) => {
  res.json({
    success: true,
    progress: userProgress
  });
});

// Update lesson completion
router.post('/complete-lesson', (req, res) => {
  const { userId, lessonId, xpEarned, exercisesCompleted } = req.body;

  if (!lessonId || !xpEarned) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  // Update progress
  if (!userProgress.completedLessons.includes(lessonId)) {
    userProgress.completedLessons.push(lessonId);
    userProgress.totalXP += xpEarned;
    userProgress.currentLesson = lessonId + 1;
    userProgress.lastActivity = new Date();
    
    // Update level based on XP
    userProgress.level = Math.floor(userProgress.totalXP / 500) + 1;
    
    // Add gems as reward
    userProgress.gems += Math.floor(xpEarned / 2);
  }

  res.json({
    success: true,
    message: 'Lesson completed successfully',
    progress: userProgress,
    rewards: {
      xp: xpEarned,
      gems: Math.floor(xpEarned / 2)
    }
  });
});

// Update daily streak
router.post('/update-streak', (req, res) => {
  const { userId } = req.body;
  
  const today = new Date();
  const lastActivity = new Date(userProgress.lastActivity);
  const diffTime = Math.abs(today - lastActivity);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day - increment streak
    userProgress.currentStreak += 1;
    if (userProgress.currentStreak > userProgress.longestStreak) {
      userProgress.longestStreak = userProgress.currentStreak;
    }
  } else if (diffDays > 1) {
    // Streak broken - reset to 1
    userProgress.currentStreak = 1;
  }
  // Same day - no change

  userProgress.lastActivity = today;

  res.json({
    success: true,
    streak: userProgress.currentStreak,
    longestStreak: userProgress.longestStreak
  });
});

// Use heart (for wrong answers)
router.post('/use-heart', (req, res) => {
  const { userId } = req.body;

  if (userProgress.hearts > 0) {
    userProgress.hearts -= 1;
  }

  res.json({
    success: true,
    hearts: userProgress.hearts,
    message: userProgress.hearts === 0 ? 'No hearts remaining! Take a break or use gems to restore.' : 'Heart used'
  });
});

// Restore hearts (with gems or time)
router.post('/restore-hearts', (req, res) => {
  const { userId, method } = req.body; // method: 'gems' or 'time'

  if (method === 'gems') {
    const cost = 50; // 50 gems to restore all hearts
    if (userProgress.gems >= cost) {
      userProgress.gems -= cost;
      userProgress.hearts = 5;
      res.json({
        success: true,
        hearts: userProgress.hearts,
        gems: userProgress.gems,
        message: 'Hearts restored with gems!'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Not enough gems'
      });
    }
  } else {
    // Time-based restoration (every 30 minutes in real app)
    userProgress.hearts = Math.min(5, userProgress.hearts + 1);
    res.json({
      success: true,
      hearts: userProgress.hearts,
      message: 'Heart restored over time!'
    });
  }
});

// Get daily quests
router.get('/quests/:userId', (req, res) => {
  const dailyQuests = [
    {
      id: 1,
      title: "Earn 10 XP",
      description: "Complete lessons to earn 10 XP",
      progress: Math.min(userProgress.totalXP % 50, 10),
      target: 10,
      reward: { type: 'gems', amount: 5 },
      completed: (userProgress.totalXP % 50) >= 10
    },
    {
      id: 2,
      title: "Complete 2 lessons",
      description: "Finish 2 lessons today",
      progress: Math.min(userProgress.completedLessons.length % 5, 2),
      target: 2,
      reward: { type: 'xp', amount: 20 },
      completed: (userProgress.completedLessons.length % 5) >= 2
    },
    {
      id: 3,
      title: "Perfect lesson",
      description: "Complete a lesson without losing hearts",
      progress: 0,
      target: 1,
      reward: { type: 'gems', amount: 10 },
      completed: false
    }
  ];

  res.json({
    success: true,
    quests: dailyQuests
  });
});

export default router;
