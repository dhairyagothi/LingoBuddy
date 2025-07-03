import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService.js';
import { progressService } from '../services/progressService.js';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  progress: null,
  error: null
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_PROGRESS: 'SET_PROGRESS',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  UPDATE_XP: 'UPDATE_XP',
  UPDATE_HEARTS: 'UPDATE_HEARTS',
  UPDATE_GEMS: 'UPDATE_GEMS',
  UPDATE_STREAK: 'UPDATE_STREAK'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      };
    
    case actionTypes.SET_PROGRESS:
      return { ...state, progress: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case actionTypes.LOGOUT:
      return { ...initialState, loading: false };
    
    case actionTypes.UPDATE_XP:
      return {
        ...state,
        user: state.user ? { ...state.user, xp: action.payload } : null,
        progress: state.progress ? { ...state.progress, totalXP: action.payload } : null
      };
    
    case actionTypes.UPDATE_HEARTS:
      return {
        ...state,
        user: state.user ? { ...state.user, hearts: action.payload } : null,
        progress: state.progress ? { ...state.progress, hearts: action.payload } : null
      };
    
    case actionTypes.UPDATE_GEMS:
      return {
        ...state,
        user: state.user ? { ...state.user, gems: action.payload } : null,
        progress: state.progress ? { ...state.progress, gems: action.payload } : null
      };
    
    case actionTypes.UPDATE_STREAK:
      return {
        ...state,
        user: state.user ? { ...state.user, streak: action.payload } : null,
        progress: state.progress ? { ...state.progress, currentStreak: action.payload } : null
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    
    setProgress: (progress) => dispatch({ type: actionTypes.SET_PROGRESS, payload: progress }),
    
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    
    login: async (email, password) => {
      try {
        actions.setLoading(true);
        const response = await authService.login(email, password);
        actions.setUser(response.user);
        await actions.loadUserProgress(response.user.id);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },
    
    register: async (name, email, password) => {
      try {
        actions.setLoading(true);
        const response = await authService.register(name, email, password);
        actions.setUser(response.user);
        await actions.loadUserProgress(response.user.id);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },
    
    logout: () => {
      authService.logout();
      dispatch({ type: actionTypes.LOGOUT });
    },
    
    loadUserProgress: async (userId) => {
      try {
        const response = await progressService.getUserProgress(userId);
        actions.setProgress(response.progress);
      } catch (error) {
        console.error('Failed to load user progress:', error);
      }
    },
    
    completeLesson: async (lessonId, xpEarned) => {
      try {
        const response = await progressService.completeLesson(
          state.user.id,
          lessonId,
          xpEarned,
          []
        );
        actions.setProgress(response.progress);
        dispatch({ type: actionTypes.UPDATE_XP, payload: response.progress.totalXP });
        dispatch({ type: actionTypes.UPDATE_GEMS, payload: response.progress.gems });
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },
    
    useHeart: async () => {
      try {
        const response = await progressService.useHeart(state.user.id);
        dispatch({ type: actionTypes.UPDATE_HEARTS, payload: response.hearts });
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },
    
    restoreHearts: async (method = 'gems') => {
      try {
        const response = await progressService.restoreHearts(state.user.id, method);
        dispatch({ type: actionTypes.UPDATE_HEARTS, payload: response.hearts });
        if (method === 'gems') {
          dispatch({ type: actionTypes.UPDATE_GEMS, payload: response.gems });
        }
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },
    
    updateStreak: async () => {
      try {
        const response = await progressService.updateStreak(state.user.id);
        dispatch({ type: actionTypes.UPDATE_STREAK, payload: response.streak });
        return response;
      } catch (error) {
        console.error('Failed to update streak:', error);
      }
    }
  };

  // Initialize app - check for stored user
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const storedUser = authService.getStoredUser();
        if (storedUser && authService.isAuthenticated()) {
          actions.setUser(storedUser);
          await actions.loadUserProgress(storedUser.id);
        } else {
          actions.setLoading(false);
        }
      } catch (error) {
        console.error('App initialization error:', error);
        actions.setError('Failed to initialize app');
      }
    };

    initializeApp();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
