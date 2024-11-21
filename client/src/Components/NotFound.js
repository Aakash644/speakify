// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';


const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700 mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
