import express from 'express';
import Quiz from '../models/Quiz.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';

const router = express.Router();

// Get all quizzes for a language
router.get('/:languageId', async (req, res) => {
  try {
    const { languageId } = req.params;
    
    // Try to fetch from MongoDB first
    try {
      const quizzes = await Quiz.find({ languageId }).sort({ level: 1 });
      if (quizzes.length > 0) {
        return res.json({
          success: true,
          quizzes
        });
      }
    } catch (dbError) {
      console.warn('Database not available, using mock data');
    }
    
    // Fallback to mock data
    const mockQuizzes = {
      spanish: [{
        _id: 'mock-spanish-quiz',
        title: 'Spanish Basic Quiz',
        languageId: 'spanish',
        level: 1,
        questions: [
          {
            question: 'How do you say "Hello" in Spanish?',
            options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
            correctAnswer: 0,
            explanation: 'Hola is the most common way to say hello in Spanish.'
          },
          {
            question: 'What does "Gracias" mean?',
            options: ['Goodbye', 'Please', 'Thank you', 'Sorry'],
            correctAnswer: 2,
            explanation: 'Gracias means "thank you" in Spanish.'
          },
          {
            question: 'How do you say "Good morning" in Spanish?',
            options: ['Buenas tardes', 'Buenos días', 'Buenas noches', 'Hasta luego'],
            correctAnswer: 1,
            explanation: 'Buenos días means "good morning" in Spanish.'
          }
        ]
      }],
      french: [{
        _id: 'mock-french-quiz',
        title: 'French Basic Quiz',
        languageId: 'french',
        level: 1,
        questions: [
          {
            question: 'How do you say "Hello" in French?',
            options: ['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
            correctAnswer: 1,
            explanation: 'Bonjour is the formal way to say hello in French.'
          },
          {
            question: 'What does "Merci" mean?',
            options: ['Hello', 'Please', 'Thank you', 'Sorry'],
            correctAnswer: 2,
            explanation: 'Merci means "thank you" in French.'
          }
        ]
      }]
    };

    const quizzes = mockQuizzes[languageId] || mockQuizzes.spanish;

    res.json({
      success: true,
      quizzes
    });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get specific quiz
router.get('/:languageId/:quizId', async (req, res) => {
  try {
    const { languageId, quizId } = req.params;
    const quiz = await Quiz.findOne({ 
      _id: quizId, 
      languageId 
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      quiz
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create seed quizzes for a language (for development)
router.post('/seed/:languageId', async (req, res) => {
  try {
    const { languageId } = req.params;
    
    // Check if quizzes already exist
    const existingQuizzes = await Quiz.find({ languageId });
    if (existingQuizzes.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Quizzes already exist for this language'
      });
    }

    const seedQuizzes = [
      {
        languageId,
        title: "Basic Vocabulary Quiz",
        description: "Test your knowledge of basic vocabulary",
        level: 1,
        difficulty: "beginner",
        xpReward: 25,
        questions: [
          {
            type: "multiple-choice",
            question: "How do you say 'Hello'?",
            options: [
              languageId === 'spanish' ? 'Hola' : 'Bonjour',
              languageId === 'spanish' ? 'Adiós' : 'Au revoir',
              languageId === 'spanish' ? 'Gracias' : 'Merci',
              languageId === 'spanish' ? 'Por favor' : 'S\'il vous plaît'
            ],
            correctAnswer: 0,
            explanation: "This is the standard greeting."
          },
          {
            type: "multiple-choice",
            question: "What does 'Gracias/Merci' mean?",
            options: [
              "Thank you",
              "Hello",
              "Goodbye",
              "Please"
            ],
            correctAnswer: 0,
            explanation: "This is how you express gratitude."
          },
          {
            type: "multiple-choice",
            question: "How do you say 'One'?",
            options: [
              languageId === 'spanish' ? 'Uno' : 'Un',
              languageId === 'spanish' ? 'Dos' : 'Deux',
              languageId === 'spanish' ? 'Tres' : 'Trois',
              languageId === 'spanish' ? 'Cuatro' : 'Quatre'
            ],
            correctAnswer: 0,
            explanation: "This is the number one."
          }
        ]
      },
      {
        languageId,
        title: "Numbers Quiz",
        description: "Test your knowledge of numbers 1-10",
        level: 2,
        difficulty: "beginner",
        xpReward: 30,
        questions: [
          {
            type: "multiple-choice",
            question: "What is 'Five'?",
            options: [
              languageId === 'spanish' ? 'Cinco' : 'Cinq',
              languageId === 'spanish' ? 'Cuatro' : 'Quatre',
              languageId === 'spanish' ? 'Seis' : 'Six',
              languageId === 'spanish' ? 'Siete' : 'Sept'
            ],
            correctAnswer: 0,
            explanation: "This is the number five."
          },
          {
            type: "multiple-choice",
            question: "How do you say 'Ten'?",
            options: [
              languageId === 'spanish' ? 'Diez' : 'Dix',
              languageId === 'spanish' ? 'Nueve' : 'Neuf',
              languageId === 'spanish' ? 'Ocho' : 'Huit',
              languageId === 'spanish' ? 'Siete' : 'Sept'
            ],
            correctAnswer: 0,
            explanation: "This is the number ten."
          }
        ]
      },
      {
        languageId,
        title: "Intermediate Quiz",
        description: "Test your intermediate vocabulary",
        level: 3,
        difficulty: "intermediate",
        xpReward: 40,
        questions: [
          {
            type: "multiple-choice",
            question: "How do you say 'Family'?",
            options: [
              languageId === 'spanish' ? 'Familia' : 'Famille',
              languageId === 'spanish' ? 'Casa' : 'Maison',
              languageId === 'spanish' ? 'Amigo' : 'Ami',
              languageId === 'spanish' ? 'Trabajo' : 'Travail'
            ],
            correctAnswer: 0,
            explanation: "This word refers to family members."
          },
          {
            type: "multiple-choice",
            question: "What color is 'Blue'?",
            options: [
              languageId === 'spanish' ? 'Azul' : 'Bleu',
              languageId === 'spanish' ? 'Rojo' : 'Rouge',
              languageId === 'spanish' ? 'Verde' : 'Vert',
              languageId === 'spanish' ? 'Amarillo' : 'Jaune'
            ],
            correctAnswer: 0,
            explanation: "This is the color blue."
          }
        ]
      }
    ];

    const createdQuizzes = await Quiz.insertMany(seedQuizzes);

    res.status(201).json({
      success: true,
      message: `${createdQuizzes.length} quizzes created for ${languageId}`,
      quizzes: createdQuizzes
    });
  } catch (error) {
    console.error('Seed quizzes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
