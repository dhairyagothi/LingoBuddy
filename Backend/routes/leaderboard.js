import express from 'express';

const router = express.Router();

// Mock users data for leaderboard
const mockUsers = [
  { id: 1, name: "Demo User", xp: 1250, level: 3, streak: 5, profileImage: null },
  { id: 2, name: "Alice Johnson", xp: 2890, level: 6, streak: 12, profileImage: null },
  { id: 3, name: "Bob Smith", xp: 2150, level: 5, streak: 8, profileImage: null },
  { id: 4, name: "Carol Davis", xp: 1875, level: 4, streak: 3, profileImage: null },
  { id: 5, name: "David Wilson", xp: 3250, level: 7, streak: 15, profileImage: null },
  { id: 6, name: "Eva Brown", xp: 1650, level: 4, streak: 6, profileImage: null },
  { id: 7, name: "Frank Miller", xp: 2420, level: 5, streak: 10, profileImage: null },
  { id: 8, name: "Grace Lee", xp: 1320, level: 3, streak: 4, profileImage: null },
  { id: 9, name: "Henry Chen", xp: 2750, level: 6, streak: 9, profileImage: null },
  { id: 10, name: "Iris Taylor", xp: 1980, level: 4, streak: 7, profileImage: null }
];

// Get weekly leaderboard
router.get('/weekly', (req, res) => {
  // Sort users by XP in descending order
  const sortedUsers = [...mockUsers].sort((a, b) => b.xp - a.xp);
  
  // Add rank and weekly XP (simulated)
  const leaderboard = sortedUsers.map((user, index) => ({
    rank: index + 1,
    ...user,
    weeklyXP: Math.floor(user.xp * 0.3), // Simulate weekly XP as 30% of total
    change: Math.floor(Math.random() * 5) - 2 // Random rank change (-2 to +2)
  }));

  res.json({
    success: true,
    leaderboard: leaderboard.slice(0, 10), // Top 10
    userRank: leaderboard.findIndex(user => user.id === 1) + 1 // Demo user rank
  });
});

// Get monthly leaderboard
router.get('/monthly', (req, res) => {
  // Sort users by XP in descending order
  const sortedUsers = [...mockUsers].sort((a, b) => b.xp - a.xp);
  
  // Add rank and monthly XP (simulated)
  const leaderboard = sortedUsers.map((user, index) => ({
    rank: index + 1,
    ...user,
    monthlyXP: Math.floor(user.xp * 0.8), // Simulate monthly XP as 80% of total
    change: Math.floor(Math.random() * 8) - 4 // Random rank change (-4 to +4)
  }));

  res.json({
    success: true,
    leaderboard: leaderboard.slice(0, 20), // Top 20
    userRank: leaderboard.findIndex(user => user.id === 1) + 1
  });
});

// Get friends leaderboard
router.get('/friends/:userId', (req, res) => {
  // Mock friends data (subset of users)
  const friendIds = [1, 3, 5, 8, 10]; // Demo user + 4 friends
  const friends = mockUsers.filter(user => friendIds.includes(user.id));
  
  // Sort friends by XP
  const sortedFriends = friends.sort((a, b) => b.xp - a.xp);
  
  const friendsLeaderboard = sortedFriends.map((user, index) => ({
    rank: index + 1,
    ...user,
    weeklyXP: Math.floor(user.xp * 0.3),
    isFriend: user.id !== 1, // All except demo user are friends
    isCurrentUser: user.id === 1
  }));

  res.json({
    success: true,
    leaderboard: friendsLeaderboard,
    userRank: friendsLeaderboard.findIndex(user => user.id === 1) + 1
  });
});

// Get user's league info
router.get('/league/:userId', (req, res) => {
  const leagues = [
    'Bronze', 'Silver', 'Gold', 'Sapphire', 'Ruby', 
    'Emerald', 'Amethyst', 'Pearl', 'Obsidian', 'Diamond'
  ];
  
  // Determine league based on XP (simplified)
  const userXP = 1250; // Demo user XP
  const leagueIndex = Math.min(Math.floor(userXP / 500), leagues.length - 1);
  const currentLeague = leagues[leagueIndex];
  
  // XP needed for next league
  const nextLeagueXP = (leagueIndex + 1) * 500;
  const xpToNext = Math.max(0, nextLeagueXP - userXP);
  
  res.json({
    success: true,
    league: {
      current: currentLeague,
      level: leagueIndex + 1,
      xpToNext: xpToNext,
      nextLeague: leagueIndex < leagues.length - 1 ? leagues[leagueIndex + 1] : null,
      promotion: leagueIndex < leagues.length - 1,
      demotion: leagueIndex > 0 && userXP < (leagueIndex * 500) + 100
    }
  });
});

export default router;
