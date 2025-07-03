import React from 'react';
import mascot from '../assets/mascot.svg';

const LearningPath = () => {
  const nodes = [
    { id: 1, type: 'start', active: true, completed: false },
    { id: 2, type: 'lesson', active: false, completed: false },
    { id: 3, type: 'chest', active: false, completed: false },
    { id: 4, type: 'lesson', active: false, completed: false },
    { id: 5, type: 'lesson', active: false, completed: false },
  ];

  return (
    <div className="flex flex-col items-center mt-16 relative min-h-[600px]">
      <div className="space-y-16 relative">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex items-center justify-center relative">
            {/* Path Line */}
            {index < nodes.length - 1 && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-2 h-16 bg-[#3a4a5c] rounded-full"></div>
            )}
            
            {/* Node */}
            <div className="relative z-10 flex items-center">
              <div className="flex flex-col items-center">
                {node.type === 'start' && (
                  <>
                    <div className="text-white text-sm font-bold mb-3 tracking-wide">START</div>
                    <button
                      className="w-20 h-20 bg-[#b9e937] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform border-4 border-[#8bc34a] relative cursor-pointer"
                      aria-label="Start lesson"
                    >
                      <span className="text-white text-3xl">⭐</span>
                      <div className="absolute -top-1 -left-1 w-22 h-22 bg-[#8bc34a] rounded-full -z-10"></div>
                    </button>
                  </>
                )}
                
                {node.type === 'lesson' && (
                  <button
                    className="w-16 h-16 bg-[#3a4a5c] rounded-full flex items-center justify-center shadow-lg border-4 border-[#2c3e50]"
                    disabled
                    aria-label="Locked lesson"
                  >
                    <span className="text-[#5a6c7d] text-2xl">⭐</span>
                  </button>
                )}
                
                {node.type === 'chest' && (
                  <button
                    className="w-20 h-16 bg-[#3a4a5c] rounded-lg flex items-center justify-center shadow-lg border-4 border-[#2c3e50]"
                    disabled
                    aria-label="Locked chest"
                  >
                    <span className="text-[#5a6c7d] text-2xl">�</span>
                  </button>
                )}
              </div>
              
              {/* Mascot positioned next to the active node */}
              {node.active && (
                <div className="absolute left-28 top-1/2 transform -translate-y-1/2">
                  <img 
                    src={mascot} 
                    alt="LingoBuddy mascot" 
                    className="w-32 h-32 drop-shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
