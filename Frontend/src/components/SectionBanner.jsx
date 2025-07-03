import React from 'react';

const SectionBanner = () => {
  return (
    <div className="bg-[#b9e937] rounded-xl px-8 py-6 mt-8 mx-auto max-w-2xl shadow-lg">
      <div className="flex items-center">
        <button className="text-white mr-6 text-2xl hover:text-gray-200 transition-colors cursor-pointer" aria-label="Go back">
          ←
        </button>
        <div>
          <div className="text-white text-sm font-bold tracking-wide mb-1">SECTION 1, UNIT 1</div>
          <div className="text-white font-bold text-xl">Pair letters and sounds</div>
        </div>
      </div>
    </div>
  );
};

export default SectionBanner;
