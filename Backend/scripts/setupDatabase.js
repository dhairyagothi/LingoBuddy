import mongoose from 'mongoose';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import QuizResult from '../models/QuizResult.js';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lingobuddy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');

    // Check if collections exist and have data
    const quizCount = await Quiz.countDocuments();
    const userCount = await User.countDocuments();
    
    console.log(`📊 Current database status:`);
    console.log(`   - Quizzes: ${quizCount}`);
    console.log(`   - Users: ${userCount}`);

    if (quizCount === 0) {
      console.log('📝 No quizzes found. Would you like to seed quiz data?');
      console.log('   Run: npm run seed');
    }

    // Test database operations
    console.log('\n🧪 Testing database operations...');
    
    // Test creating a sample quiz
    const testQuiz = {
      quizId: 'test-connection-quiz',
      title: 'Database Connection Test',
      description: 'Test quiz to verify database connection',
      languageId: 'spanish',
      category: 'vocabulary',
      difficulty: 'beginner',
      level: 1,
      questions: [
        {
          question: 'This is a test question?',
          questionType: 'multiple-choice',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: 0,
          explanation: 'This is a test explanation',
          points: 10
        }
      ]
    };

    // Try to create and then delete the test quiz
    const createdQuiz = await Quiz.create(testQuiz);
    console.log('✅ Quiz creation: SUCCESS');
    
    await Quiz.findByIdAndDelete(createdQuiz._id);
    console.log('✅ Quiz deletion: SUCCESS');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n🚀 Next steps:');
    console.log('   1. Seed quiz data: npm run seed');
    console.log('   2. Start the server: npm run dev');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting MongoDB Connection:');
      console.log('   • Make sure MongoDB is installed and running');
      console.log('   • For local MongoDB: Start MongoDB service');
      console.log('   • For MongoDB Atlas: Check your connection string in .env');
      console.log('   • Verify network connectivity');
    }
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

setupDatabase();
