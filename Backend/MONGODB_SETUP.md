# MongoDB Setup Guide for LingoBuddy

## 🚀 Quick Start

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Sign up for MongoDB Atlas** (Free tier available)
   - Go to https://www.mongodb.com/atlas
   - Create a free account
   - Create a new cluster

2. **Get your connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update your .env file**
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/lingobuddy?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - Run the installer with default settings

2. **Start MongoDB Service**
   ```powershell
   # Start MongoDB service (Windows)
   net start MongoDB
   
   # Or use MongoDB Compass to start
   ```

3. **Your .env is already configured for local MongoDB**
   ```env
   MONGODB_URI=mongodb://localhost:27017/lingobuddy
   ```

## 🧪 Testing Your Setup

### Test Database Connection
```bash
npm run test-db
```

### Setup Database (Run once)
```bash
npm run setup-db
```

### Seed Quiz Data
```bash
npm run seed
```

### Start the Backend Server
```bash
npm run dev
```

## 📊 Available NPM Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run start` - Start production server
- `npm run test-db` - Test MongoDB connection
- `npm run setup-db` - Setup and test database
- `npm run seed` - Seed quiz data into database

## 🔧 Troubleshooting

### MongoDB Connection Issues

1. **ECONNREFUSED Error**
   - MongoDB service is not running
   - Start MongoDB service or use MongoDB Atlas

2. **Authentication Failed**
   - Check username/password in .env file
   - Verify database user permissions

3. **Network Error**
   - Check internet connection
   - Verify firewall settings
   - For Atlas: Check IP whitelist

### Common Solutions

1. **Install MongoDB Compass** (GUI tool)
   - Download: https://www.mongodb.com/try/download/compass
   - Connect to your database visually

2. **Check MongoDB Status**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB
   ```

3. **Manual MongoDB Start**
   ```powershell
   # Start MongoDB manually
   mongod --dbpath "C:\data\db"
   ```

## 📁 Project Structure

```
Backend/
├── models/
│   ├── Quiz.js          # Quiz schema
│   ├── User.js          # User schema
│   ├── Progress.js      # Progress tracking
│   └── QuizResult.js    # Quiz results
├── routes/
│   ├── quiz.js          # Quiz API endpoints
│   └── ...
├── scripts/
│   ├── testConnection.js    # Test DB connection
│   ├── setupDatabase.js     # Setup DB
│   └── seedQuizzes.js       # Seed quiz data
└── server.js            # Main server file
```

## 🎯 Next Steps

After successful setup:

1. **Test connection**: `npm run test-db`
2. **Seed data**: `npm run seed`
3. **Start server**: `npm run dev`
4. **Test API**: Visit `http://localhost:5000/health`

## 🆘 Need Help?

- Check the terminal output for specific error messages
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- MongoDB Community: https://community.mongodb.com/
