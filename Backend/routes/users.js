import express from 'express';

const router = express.Router();

// Mock user data
const users = [
  {
    id: 1,
    email: 'demo@lingobuddy.com',
    name: 'Demo User',
    streak: 5,
    gems: 500,
    hearts: 5,
    xp: 1250,
    level: 3,
    profileImage: null,
    createdAt: new Date('2024-01-01'),
    completedLessons: [1, 2, 3],
    currentLesson: 4,
    settings: {
      dailyGoal: 50,
      notifications: true,
      sound: true,
      language: 'Spanish'
    }
  }
];

// Get user profile
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Remove sensitive data
  const { password, ...userProfile } = user;
  
  res.json({
    success: true,
    user: userProfile
  });
});

// Update user profile
router.put('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const { name, settings } = req.body;
  
  // Update user data
  if (name) users[userIndex].name = name;
  if (settings) users[userIndex].settings = { ...users[userIndex].settings, ...settings };
  
  // Remove sensitive data from response
  const { password, ...userProfile } = users[userIndex];
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: userProfile
  });
});

// Get user achievements
router.get('/:userId/achievements', (req, res) => {
  const achievements = [
    {
      id: 1,
      name: "First Step",
      description: "Complete your first lesson",
      icon: "🎯",
      earned: true,
      earnedAt: new Date('2024-01-02')
    },
    {
      id: 2,
      name: "Streak Keeper",
      description: "Maintain a 5-day streak",
      icon: "🔥",
      earned: true,
      earnedAt: new Date('2024-01-06')
    },
    {
      id: 3,
      name: "XP Hunter",
      description: "Earn 1000 XP",
      icon: "⭐",
      earned: true,
      earnedAt: new Date('2024-01-15')
    },
    {
      id: 4,
      name: "Scholar",
      description: "Complete 10 lessons",
      icon: "📚",
      earned: false,
      progress: 3,
      target: 10
    },
    {
      id: 5,
      name: "Perfectionist",
      description: "Complete 5 lessons without mistakes",
      icon: "💎",
      earned: false,
      progress: 1,
      target: 5
    }
  ];

  res.json({
    success: true,
    achievements
  });
});

// Get user statistics
router.get('/:userId/stats', (req, res) => {
  const stats = {
    totalXP: 1250,
    totalLessons: 3,
    currentStreak: 5,
    longestStreak: 12,
    totalStudyTime: 450, // minutes
    averageSessionTime: 15, // minutes
    accuracy: 85, // percentage
    weeklyGoalProgress: 280, // XP this week
    weeklyGoal: 350, // XP goal
    monthlyXP: 1250,
    favoriteTime: "Evening", // Based on activity patterns
    strongestSkill: "Vocabulary",
    weakestSkill: "Listening"
  };

  res.json({
    success: true,
    stats
  });
});

export default router;
