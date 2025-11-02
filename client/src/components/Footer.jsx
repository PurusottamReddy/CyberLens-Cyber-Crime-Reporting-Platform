import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Cyber Crime Reporting Platform. All rights reserved.</p>
        <p className="text-sm mt-2">
          <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> | 
          <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;