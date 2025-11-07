import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white p-4 mt-8 border-t border-gray-700 dark:border-gray-800 transition-colors">
      <div className="container mx-auto text-center">
        <p className="text-gray-300 dark:text-gray-400">&copy; {new Date().getFullYear()} CyberLens . All rights reserved.</p>
        <p className="text-sm mt-2">
          <a href="#" className="text-blue-400 dark:text-blue-500 hover:underline transition-colors">Privacy Policy</a> | 
          <a href="#" className="text-blue-400 dark:text-blue-500 hover:underline transition-colors">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;