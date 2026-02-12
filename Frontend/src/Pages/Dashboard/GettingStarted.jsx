import React from 'react';
import { Link } from 'react-router-dom';

const GettingStarted = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Expense Tracker!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your personal finance companion to track income and expenses effortlessly.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2 font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
