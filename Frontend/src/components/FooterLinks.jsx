import React from 'react';

const FooterLinks = () => {
  const links = [
    'ABOUT', 'BLOG', 'STORE', 'EFFICACY', 'CAREERS',
    'INVESTORS', 'TERMS', 'PRIVACY'
  ];

  return (
    <div className="fixed bottom-6 right-6 w-80">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[#6c7a89] text-xs">
        {links.map((link, index) => (
          <button
            key={index}
            className="hover:text-white transition-colors cursor-pointer"
            aria-label={link}
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
