import api from './api.js';

export const userService = {
  // Get user profile
  getUserProfile: async (userId) => {
    return await api.get(`/users/${userId}`);
  },

  // Update user profile
  updateUserProfile: async (userId, userData) => {
    return await api.put(`/users/${userId}`, userData);
  },

  // Get user achievements
  getUserAchievements: async (userId) => {
    return await api.get(`/users/${userId}/achievements`);
  },

  // Get user statistics
  getUserStats: async (userId) => {
    return await api.get(`/users/${userId}/stats`);
  }
};
