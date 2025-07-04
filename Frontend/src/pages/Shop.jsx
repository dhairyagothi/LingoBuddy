import React from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';

const Shop = () => {
  const shopItems = [
    {
      id: 1,
      name: 'Heart Refill',
      description: 'Restore all your hearts instantly',
      price: 350,
      currency: 'gems',
      icon: '❤️',
      category: 'power-ups'
    },
    {
      id: 2,
      name: 'Double XP',
      description: 'Earn 2x XP for the next hour',
      price: 200,
      currency: 'gems',
      icon: '⚡',
      category: 'power-ups'
    },
    {
      id: 3,
      name: 'Streak Freeze',
      description: 'Protect your streak for 1 day',
      price: 150,
      currency: 'gems',
      icon: '🧊',
      category: 'power-ups'
    },
    {
      id: 4,
      name: 'Plus Subscription',
      description: 'Unlimited hearts, no ads, offline lessons',
      price: 9.99,
      currency: 'usd',
      icon: '👑',
      category: 'subscription',
      popular: true
    },
    {
      id: 5,
      name: 'Achievement Hunter',
      description: 'Unlock exclusive achievements',
      price: 500,
      currency: 'gems',
      icon: '🏆',
      category: 'cosmetics'
    },
    {
      id: 6,
      name: 'Custom Avatar',
      description: 'Personalize your profile picture',
      price: 300,
      currency: 'gems',
      icon: '🎨',
      category: 'cosmetics'
    },
    {
      id: 7,
      name: 'Progress Booster',
      description: 'Skip ahead to more advanced lessons',
      price: 800,
      currency: 'gems',
      icon: '🚀',
      category: 'power-ups'
    },
    {
      id: 8,
      name: 'Gem Bundle',
      description: 'Get 1000 gems at a discount',
      price: 4.99,
      currency: 'usd',
      icon: '💎',
      category: 'currency'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '🛒' },
    { id: 'power-ups', name: 'Power-ups', icon: '⚡' },
    { id: 'cosmetics', name: 'Cosmetics', icon: '🎨' },
    { id: 'subscription', name: 'Subscription', icon: '👑' },
    { id: 'currency', name: 'Currency', icon: '💎' }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [userGems] = React.useState(500); // Mock user gems

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item) => {
    alert(`Purchased ${item.name} for ${item.price} ${item.currency === 'gems' ? 'gems' : 'USD'}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <HeaderBar />
      
      <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8 px-4">
        {/* Header */}
        <div className="w-full max-w-6xl mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-4">🛒 Shop</h1>
            <p className="text-gray-400 text-lg">Power up your learning with helpful items</p>
          </div>
          
          {/* User Currency */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-[#1e2d3a] to-[#2a3f52] rounded-xl px-6 py-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💎</span>
                <span className="text-xl font-bold">{userGems.toLocaleString()}</span>
                <span className="text-gray-400">gems</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full max-w-6xl mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer
                  ${selectedCategory === category.id
                    ? 'bg-[#b9e937] text-[#14213d] font-bold'
                    : 'bg-[#1e2d3a] text-white hover:bg-[#2a3f52]'
                  }
                `}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shop Items Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`
                bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-6 transition-all duration-300 hover:scale-102 hover:shadow-xl cursor-pointer relative
                ${item.popular ? 'ring-2 ring-yellow-400' : ''}
              `}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}
              
              {/* Item Icon */}
              <div className="text-center mb-4">
                <span className="text-6xl">{item.icon}</span>
              </div>
              
              {/* Item Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
              
              {/* Price and Purchase */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#b9e937]">
                    {item.currency === 'gems' ? '💎' : '$'} {item.price}
                  </span>
                  {item.currency === 'gems' && (
                    <span className="text-gray-400 text-sm ml-1">gems</span>
                  )}
                </div>
                
                <button
                  onClick={() => handlePurchase(item)}
                  disabled={item.currency === 'gems' && userGems < item.price}
                  className={`
                    w-full py-3 px-4 rounded-xl font-bold transition-colors cursor-pointer
                    ${item.currency === 'gems' && userGems < item.price
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : item.currency === 'usd'
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                        : 'bg-[#b9e937] text-[#14213d] hover:bg-[#a8d429]'
                    }
                  `}
                >
                  {item.currency === 'gems' && userGems < item.price
                    ? 'Not Enough Gems'
                    : 'Purchase'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Earn Gems Section */}
        <div className="w-full max-w-4xl mt-12">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">💎 Need More Gems?</h2>
            <p className="text-lg mb-6">Complete lessons, maintain streaks, and finish quests to earn gems!</p>
            <div className="flex justify-center gap-4">
              <button className="bg-[#b9e937] text-[#14213d] px-6 py-3 rounded-xl font-bold hover:bg-[#a8d429] transition-colors cursor-pointer">
                View Quests
              </button>
              <button className="bg-[#1cb0f6] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1a9bd8] transition-colors cursor-pointer">
                Take Lessons
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <RightSidebar />
      <FooterLinks />
    </div>
  );
};

export default Shop;
