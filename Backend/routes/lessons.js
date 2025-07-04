import express from 'express';
import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';

const router = express.Router();

// Get all lessons (no language filter)
router.get('/', async (req, res) => {
  try {
    const { language } = req.query;
    
    // Try to fetch from MongoDB first
    try {
      let lessons;
      if (language) {
        lessons = await Lesson.find({ languageId: language }).sort({ order: 1 });
      } else {
        lessons = await Lesson.find({}).sort({ languageId: 1, order: 1 });
      }
      
      if (lessons.length > 0) {
        return res.json({
          success: true,
          lessons
        });
      }
    } catch (dbError) {
      console.warn('Database not available, using mock data');
    }
    
    // Fallback to mock data
    const mockLessons = [
      { 
        _id: 'mock-1',
        title: 'Basics', 
        description: 'Start with the basics!', 
        languageId: language || 'spanish',
        order: 1,
        locked: false,
        progress: 100,
        xp: 120
      },
      { 
        _id: 'mock-2',
        title: 'Greetings', 
        description: 'Learn common greetings.', 
        languageId: language || 'spanish',
        order: 2,
        locked: false,
        progress: 75,
        xp: 90
      },
      { 
        _id: 'mock-3',
        title: 'Food & Drinks', 
        description: 'Talk about food and beverages.', 
        languageId: language || 'spanish',
        order: 3,
        locked: false,
        progress: 50,
        xp: 60
      },
      { 
        _id: 'mock-4',
        title: 'Family', 
        description: 'Learn family vocabulary.', 
        languageId: language || 'spanish',
        order: 4,
        locked: false,
        progress: 25,
        xp: 30
      },
      { 
        _id: 'mock-5',
        title: 'Numbers', 
        description: 'Count from 1 to 100.', 
        languageId: language || 'spanish',
        order: 5,
        locked: false,
        progress: 0,
        xp: 0
      },
      { 
        _id: 'mock-6',
        title: 'Colors', 
        description: 'Learn colors and descriptions.', 
        languageId: language || 'spanish',
        order: 6,
        locked: true,
        progress: 0,
        xp: 0
      }
    ];

    res.json({
      success: true,
      lessons: mockLessons
    });
  } catch (error) {
    console.error('Get all lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get all lessons for a language
router.get('/:languageId', async (req, res) => {
  try {
    const { languageId } = req.params;
    
    // Try to fetch from MongoDB first
    try {
      const lessons = await Lesson.find({ languageId }).sort({ order: 1 });
      if (lessons.length > 0) {
        return res.json({
          success: true,
          lessons
        });
      }
    } catch (dbError) {
      console.warn('Database not available, using mock data');
    }
    
    // Fallback to mock data
    const mockLessons = [
      { 
        _id: 'mock-1',
        title: 'Basics', 
        description: 'Start with the basics!', 
        languageId,
        order: 1,
        locked: false,
        progress: 100,
        xp: 120
      },
      { 
        _id: 'mock-2',
        title: 'Greetings', 
        description: 'Learn common greetings.', 
        languageId,
        order: 2,
        locked: false,
        progress: 75,
        xp: 90
      },
      { 
        _id: 'mock-3',
        title: 'Food & Drinks', 
        description: 'Talk about food and beverages.', 
        languageId,
        order: 3,
        locked: false,
        progress: 50,
        xp: 60
      },
      { 
        _id: 'mock-4',
        title: 'Family', 
        description: 'Learn family vocabulary.', 
        languageId,
        order: 4,
        locked: false,
        progress: 25,
        xp: 30
      },
      { 
        _id: 'mock-5',
        title: 'Numbers', 
        description: 'Count from 1 to 100.', 
        languageId,
        order: 5,
        locked: false,
        progress: 0,
        xp: 0
      },
      { 
        _id: 'mock-6',
        title: 'Colors', 
        description: 'Learn colors and descriptions.', 
        languageId,
        order: 6,
        locked: true,
        progress: 0,
        xp: 0
      }
    ];

    res.json({
      success: true,
      lessons: mockLessons
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get specific lesson
router.get('/:languageId/:lessonId', async (req, res) => {
  try {
    const { languageId, lessonId } = req.params;
    const lesson = await Lesson.findOne({ 
      _id: lessonId, 
      languageId 
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    res.json({
      success: true,
      lesson
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create seed lessons for a language (for development)
router.post('/seed/:languageId', async (req, res) => {
  try {
    const { languageId } = req.params;
    
    // Check if lessons already exist
    const existingLessons = await Lesson.find({ languageId });
    if (existingLessons.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Lessons already exist for this language'
      });
    }

    const seedLessons = [
      {
        languageId,
        title: "Basic Greetings",
        description: "Learn essential greeting phrases",
        level: 1,
        order: 1,
        xpReward: 10,
        content: {
          vocabulary: [
            { word: "Hello", translation: languageId === 'spanish' ? 'Hola' : 'Bonjour', pronunciation: 'oh-lah' },
            { word: "Goodbye", translation: languageId === 'spanish' ? 'Adiós' : 'Au revoir', pronunciation: 'ah-dee-ohs' }
          ],
          exercises: [
            {
              type: "multiple-choice",
              question: "How do you say 'Hello'?",
              options: [
                languageId === 'spanish' ? 'Hola' : 'Bonjour',
                languageId === 'spanish' ? 'Adiós' : 'Au revoir',
                languageId === 'spanish' ? 'Gracias' : 'Merci',
                languageId === 'spanish' ? 'Por favor' : 'S\'il vous plaît'
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        languageId,
        title: "Numbers 1-10",
        description: "Learn to count from 1 to 10",
        level: 1,
        order: 2,
        xpReward: 15,
        content: {
          vocabulary: [
            { word: "One", translation: languageId === 'spanish' ? 'Uno' : 'Un', pronunciation: 'oo-no' },
            { word: "Two", translation: languageId === 'spanish' ? 'Dos' : 'Deux', pronunciation: 'dohs' }
          ],
          exercises: [
            {
              type: "multiple-choice",
              question: "What is 'One'?",
              options: [
                languageId === 'spanish' ? 'Uno' : 'Un',
                languageId === 'spanish' ? 'Dos' : 'Deux',
                languageId === 'spanish' ? 'Tres' : 'Trois',
                languageId === 'spanish' ? 'Cuatro' : 'Quatre'
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      {
        languageId,
        title: "Common Phrases",
        description: "Essential phrases for daily conversation",
        level: 1,
        order: 3,
        xpReward: 20,
        content: {
          vocabulary: [
            { word: "Please", translation: languageId === 'spanish' ? 'Por favor' : 'S\'il vous plaît', pronunciation: 'por fah-vor' },
            { word: "Thank you", translation: languageId === 'spanish' ? 'Gracias' : 'Merci', pronunciation: 'grah-see-ahs' }
          ],
          exercises: [
            {
              type: "multiple-choice",
              question: "How do you say 'Thank you'?",
              options: [
                languageId === 'spanish' ? 'Gracias' : 'Merci',
                languageId === 'spanish' ? 'Por favor' : 'S\'il vous plaît',
                languageId === 'spanish' ? 'Hola' : 'Bonjour',
                languageId === 'spanish' ? 'Adiós' : 'Au revoir'
              ],
              correctAnswer: 0
            }
          ]
        }
      }
    ];

    const createdLessons = await Lesson.insertMany(seedLessons);

    res.status(201).json({
      success: true,
      message: `${createdLessons.length} lessons created for ${languageId}`,
      lessons: createdLessons
    });
  } catch (error) {
    console.error('Seed lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;

