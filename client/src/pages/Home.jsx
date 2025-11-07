

import React, { useContext } from 'react';

import { UserContext } from '../context/AppContext';

const Home = () => {
  const { user,navigate } = useContext(UserContext);

  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-100 dark:bg-gray-900 px-5 sm:px-12 transition-colors">
    <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-300 text-center"> Welcome to the CyberLens - Cyber Crime Reporting Platform</h1>
    <p className="text-lg text-indigo-700 dark:text-indigo-200 mt-2 text-center">Your secure platform to report cybercrimes, track their status, and contribute to a safer digital world.</p>
    <div className="mt-8 flex justify-center space-x-4">
      <button className="bg-indigo-800 dark:bg-indigo-600 font-bold p-2 text-white rounded-md hover:bg-indigo-900 dark:hover:bg-indigo-700 transition-colors" onClick={()=>navigate('/report-cc')}>Report a Crime</button>
      <button className="bg-indigo-500 dark:bg-indigo-700 font-bold p-2 text-white rounded-md hover:bg-indigo-300 dark:hover:bg-indigo-600 transition-colors" onClick={()=>navigate('/all-reports')}>View all reports</button>
    </div>
   </div>
  );
};

export default Home;