import mongoose from 'mongoose';
import Quiz from '../models/Quiz.js';
import dotenv from 'dotenv';

dotenv.config();

const quizData = [
  // Spanish Quizzes
  {
    quizId: 'spanish-basics-001',
    title: 'Spanish Basics',
    description: 'Learn essential Spanish greetings and basic phrases',
    languageId: 'spanish',
    category: 'vocabulary',
    difficulty: 'beginner',
    level: 1,
    timeLimit: 30,
    xpReward: 25,
    gemsReward: 5,
    questions: [
      {
        question: 'How do you say "Hello" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
        correctAnswer: 0,
        explanation: 'Hola is the most common way to say hello in Spanish.',
        points: 10
      },
      {
        question: 'What does "Gracias" mean?',
        questionType: 'multiple-choice',
        options: ['Goodbye', 'Please', 'Thank you', 'Sorry'],
        correctAnswer: 2,
        explanation: 'Gracias means "thank you" in Spanish.',
        points: 10
      },
      {
        question: 'How do you say "Good morning" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Buenas tardes', 'Buenos días', 'Buenas noches', 'Hasta luego'],
        correctAnswer: 1,
        explanation: 'Buenos días means "good morning" in Spanish.',
        points: 10
      },
      {
        question: 'What does "Adiós" mean?',
        questionType: 'multiple-choice',
        options: ['Hello', 'Thank you', 'Goodbye', 'Please'],
        correctAnswer: 2,
        explanation: 'Adiós means "goodbye" in Spanish.',
        points: 10
      },
      {
        question: 'How do you say "Please" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Gracias', 'Por favor', 'De nada', 'Perdón'],
        correctAnswer: 1,
        explanation: 'Por favor means "please" in Spanish.',
        points: 10
      }
    ],
    tags: ['greetings', 'basic', 'phrases'],
    isActive: true
  },
  {
    quizId: 'spanish-numbers-001',
    title: 'Spanish Numbers 1-10',
    description: 'Master basic Spanish numbers from one to ten',
    languageId: 'spanish',
    category: 'vocabulary',
    difficulty: 'beginner',
    level: 2,
    timeLimit: 25,
    xpReward: 30,
    gemsReward: 8,
    questions: [
      {
        question: 'How do you say "One" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Dos', 'Uno', 'Tres', 'Cuatro'],
        correctAnswer: 1,
        explanation: 'Uno means "one" in Spanish.',
        points: 10
      },
      {
        question: 'What number is "Cinco"?',
        questionType: 'multiple-choice',
        options: ['Four', 'Five', 'Six', 'Seven'],
        correctAnswer: 1,
        explanation: 'Cinco means "five" in Spanish.',
        points: 10
      },
      {
        question: 'How do you say "Ten" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Nueve', 'Ocho', 'Diez', 'Siete'],
        correctAnswer: 2,
        explanation: 'Diez means "ten" in Spanish.',
        points: 10
      },
      {
        question: 'What does "Tres" mean?',
        questionType: 'multiple-choice',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctAnswer: 1,
        explanation: 'Tres means "three" in Spanish.',
        points: 10
      },
      {
        question: 'How do you say "Seven" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Seis', 'Siete', 'Ocho', 'Nueve'],
        correctAnswer: 1,
        explanation: 'Siete means "seven" in Spanish.',
        points: 10
      },
      {
        question: 'What number is "Cuatro"?',
        questionType: 'multiple-choice',
        options: ['Three', 'Four', 'Five', 'Six'],
        correctAnswer: 1,
        explanation: 'Cuatro means "four" in Spanish.',
        points: 10
      }
    ],
    tags: ['numbers', 'counting', 'basic'],
    isActive: true
  },
  {
    quizId: 'spanish-family-001',
    title: 'Spanish Family Vocabulary',
    description: 'Learn family member names in Spanish',
    languageId: 'spanish',
    category: 'vocabulary',
    difficulty: 'intermediate',
    level: 3,
    timeLimit: 35,
    xpReward: 35,
    gemsReward: 10,
    questions: [
      {
        question: 'How do you say "Father" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Madre', 'Padre', 'Hermano', 'Hijo'],
        correctAnswer: 1,
        explanation: 'Padre means "father" in Spanish.',
        points: 10
      },
      {
        question: 'What does "Familia" mean?',
        questionType: 'multiple-choice',
        options: ['Friend', 'Family', 'House', 'School'],
        correctAnswer: 1,
        explanation: 'Familia means "family" in Spanish.',
        points: 10
      },
      {
        question: 'How do you say "Sister" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Hermana', 'Hermano', 'Prima', 'Tía'],
        correctAnswer: 0,
        explanation: 'Hermana means "sister" in Spanish.',
        points: 10
      },
      {
        question: 'What does "Abuelo" mean?',
        questionType: 'multiple-choice',
        options: ['Uncle', 'Father', 'Grandfather', 'Brother'],
        correctAnswer: 2,
        explanation: 'Abuelo means "grandfather" in Spanish.',
        points: 10
      },
      {
        question: 'How do you say "Daughter" in Spanish?',
        questionType: 'multiple-choice',
        options: ['Hijo', 'Hija', 'Madre', 'Esposa'],
        correctAnswer: 1,
        explanation: 'Hija means "daughter" in Spanish.',
        points: 10
      }
    ],
    tags: ['family', 'relationships', 'intermediate'],
    isActive: true
  },
  // French Quizzes
  {
    quizId: 'french-basics-001',
    title: 'French Basics',
    description: 'Essential French greetings and polite expressions',
    languageId: 'french',
    category: 'vocabulary',
    difficulty: 'beginner',
    level: 1,
    timeLimit: 30,
    xpReward: 25,
    gemsReward: 5,
    questions: [
      {
        question: 'How do you say "Hello" in French?',
        questionType: 'multiple-choice',
        options: ['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
        correctAnswer: 1,
        explanation: 'Bonjour is the formal way to say hello in French.',
        points: 10
      },
      {
        question: 'What does "Merci" mean?',
        questionType: 'multiple-choice',
        options: ['Hello', 'Please', 'Thank you', 'Sorry'],
        correctAnswer: 2,
        explanation: 'Merci means "thank you" in French.',
        points: 10
      },
      {
        question: 'How do you say "Goodbye" in French?',
        questionType: 'multiple-choice',
        options: ['Bonjour', 'Salut', 'Au revoir', 'Merci'],
        correctAnswer: 2,
        explanation: 'Au revoir means "goodbye" in French.',
        points: 10
      },
      {
        question: 'What does "S\'il vous plaît" mean?',
        questionType: 'multiple-choice',
        options: ['Thank you', 'Please', 'Excuse me', 'Sorry'],
        correctAnswer: 1,
        explanation: 'S\'il vous plaît means "please" in French.',
        points: 10
      },
      {
        question: 'How do you say "Yes" in French?',
        questionType: 'multiple-choice',
        options: ['Non', 'Oui', 'Peut-être', 'Jamais'],
        correctAnswer: 1,
        explanation: 'Oui means "yes" in French.',
        points: 10
      }
    ],
    tags: ['greetings', 'basic', 'polite'],
    isActive: true
  },
  // German Quizzes
  {
    quizId: 'german-basics-001',
    title: 'German Basics',
    description: 'Basic German greetings and common phrases',
    languageId: 'german',
    category: 'vocabulary',
    difficulty: 'beginner',
    level: 1,
    timeLimit: 30,
    xpReward: 25,
    gemsReward: 5,
    questions: [
      {
        question: 'How do you say "Hello" in German?',
        questionType: 'multiple-choice',
        options: ['Hallo', 'Tschüss', 'Danke', 'Bitte'],
        correctAnswer: 0,
        explanation: 'Hallo means "hello" in German.',
        points: 10
      },
      {
        question: 'What does "Danke" mean?',
        questionType: 'multiple-choice',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctAnswer: 2,
        explanation: 'Danke means "thank you" in German.',
        points: 10
      },
      {
        question: 'How do you say "Good morning" in German?',
        questionType: 'multiple-choice',
        options: ['Guten Tag', 'Guten Morgen', 'Gute Nacht', 'Guten Abend'],
        correctAnswer: 1,
        explanation: 'Guten Morgen means "good morning" in German.',
        points: 10
      },
      {
        question: 'What does "Bitte" mean?',
        questionType: 'multiple-choice',
        options: ['Thank you', 'Please', 'Sorry', 'Excuse me'],
        correctAnswer: 1,
        explanation: 'Bitte means "please" in German.',
        points: 10
      },
      {
        question: 'How do you say "Goodbye" in German?',
        questionType: 'multiple-choice',
        options: ['Hallo', 'Danke', 'Tschüss', 'Bitte'],
        correctAnswer: 2,
        explanation: 'Tschüss means "goodbye" in German.',
        points: 10
      }
    ],
    tags: ['greetings', 'basic', 'phrases'],
    isActive: true
  }
];

const seedQuizzes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('📱 Connected to MongoDB');
    
    // Clear existing quiz data
    await Quiz.deleteMany({});
    console.log('🗑️  Cleared existing quiz data');
    
    // Insert new quiz data
    const createdQuizzes = await Quiz.insertMany(quizData);
    console.log(`✅ Successfully seeded ${createdQuizzes.length} quizzes`);
    
    // Display summary
    const summary = {};
    createdQuizzes.forEach(quiz => {
      if (!summary[quiz.languageId]) {
        summary[quiz.languageId] = 0;
      }
      summary[quiz.languageId]++;
    });
    
    console.log('\n📊 Quiz Summary:');
    Object.entries(summary).forEach(([language, count]) => {
      console.log(`   ${language}: ${count} quizzes`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the seeding script
seedQuizzes();
