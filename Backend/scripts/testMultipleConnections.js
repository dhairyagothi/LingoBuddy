import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testMultipleConnections = async () => {
  console.log('🔄 Testing Multiple MongoDB Connection Options...\n');
  
  const connectionOptions = [
    {
      name: 'MongoDB Atlas (Current)',
      uri: process.env.MONGODB_URI,
      timeout: 8000
    },
    {
      name: 'Local MongoDB (Fallback)',
      uri: 'mongodb://localhost:27017/lingobuddy',
      timeout: 3000
    }
  ];

  for (const option of connectionOptions) {
    console.log(`📍 Testing: ${option.name}`);
    console.log(`🔗 URI: ${option.uri?.replace(/\/\/.*@/, '//***:***@') || 'Not configured'}`);
    
    if (!option.uri) {
      console.log('❌ No URI configured for this option\n');
      continue;
    }

    try {
      const timeout = setTimeout(() => {
        console.log(`⏱️  Connection timeout after ${option.timeout / 1000}s`);
      }, option.timeout);

      const conn = await mongoose.connect(option.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: option.timeout,
        connectTimeoutMS: option.timeout,
      });
      
      clearTimeout(timeout);
      
      console.log('✅ Connection Successful!');
      console.log(`🏠 Host: ${conn.connection.host}`);
      console.log(`🗄️  Database: ${conn.connection.name}`);
      
      // Test basic operations
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log(`📁 Collections: ${collections.length}`);
      
      await mongoose.connection.close();
      console.log('🔌 Connection closed\n');
      
      // If we get here, connection was successful
      console.log(`🎉 SUCCESS: Use ${option.name} for your project!`);
      if (option.name.includes('Atlas')) {
        console.log('💡 Your MongoDB Atlas is working correctly!');
      }
      return;
      
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
      
      if (error.message.includes('authentication')) {
        console.log('💡 Check your username/password in Atlas');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.log('💡 MongoDB not running locally');
      } else if (error.message.includes('timeout')) {
        console.log('💡 Connection timeout - check network/firewall');
      }
      console.log('');
      
      // Clean up connection
      try {
        await mongoose.connection.close();
      } catch (closeError) {
        // Ignore close errors
      }
    }
  }

  console.log('🔍 All connection attempts failed.');
  console.log('\n📋 Next Steps:');
  console.log('1. Check ATLAS_SETUP.md for MongoDB Atlas setup');
  console.log('2. Verify your .env file has the correct connection string');
  console.log('3. For now, the app will use mock data (which is working fine)');
};

testMultipleConnections();
