import api from './api.js';

export const leaderboardService = {
  // Get weekly leaderboard
  getWeeklyLeaderboard: async () => {
    return await api.get('/leaderboard/weekly');
  },

  // Get monthly leaderboard
  getMonthlyLeaderboard: async () => {
    return await api.get('/leaderboard/monthly');
  },

  // Get friends leaderboard
  getFriendsLeaderboard: async (userId) => {
    return await api.get(`/leaderboard/friends/${userId}`);
  },

  // Get user's league info
  getUserLeague: async (userId) => {
    return await api.get(`/leaderboard/league/${userId}`);
  }
};
