import api from './api.js';

export const progressService = {
  // Get user progress
  getUserProgress: async (userId) => {
    return await api.get(`/progress/${userId}`);
  },

  // Complete a lesson
  completeLesson: async (userId, lessonId, xpEarned, exercisesCompleted) => {
    return await api.post('/progress/complete-lesson', {
      userId,
      lessonId,
      xpEarned,
      exercisesCompleted
    });
  },

  // Update daily streak
  updateStreak: async (userId) => {
    return await api.post('/progress/update-streak', { userId });
  },

  // Use a heart
  useHeart: async (userId) => {
    return await api.post('/progress/use-heart', { userId });
  },

  // Restore hearts
  restoreHearts: async (userId, method = 'gems') => {
    return await api.post('/progress/restore-hearts', { userId, method });
  },

  // Get daily quests
  getDailyQuests: async (userId) => {
    return await api.get(`/progress/quests/${userId}`);
  }
};
