

import React, { useContext } from 'react';

import { UserContext } from '../context/AppContext';

const Home = () => {
  const { user,navigate } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome to the Cyber Crime Reporting Platform
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Your secure platform to report cybercrimes, track their status, and contribute to a safer digital world.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate('/report-cc')}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Report a Crime
          </button>
          <button
            onClick={() => navigate('/all-reports')}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;