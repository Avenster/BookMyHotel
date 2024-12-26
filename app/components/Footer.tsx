import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600 text-sm">
          Built by Ankur Kaushal
        </p>
        <a 
          href="https://portfolio-group.vercel.app/" 
          className="text-blue-600 hover:text-blue-800 text-sm mt-2 sm:mt-0"
        >
          View my portfolio
        </a>
      </div>
    </footer>
  );
};

export default Footer;