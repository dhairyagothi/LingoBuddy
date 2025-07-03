import api from './api.js';

export const lessonService = {
  // Get all lessons
  getAllLessons: async () => {
    return await api.get('/lessons');
  },

  // Get lesson by ID
  getLessonById: async (id) => {
    return await api.get(`/lessons/${id}`);
  },

  // Get learning path structure
  getLearningPath: async () => {
    return await api.get('/lessons/path/structure');
  }
};
