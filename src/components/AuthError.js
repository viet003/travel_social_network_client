import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pathDomain } from '../utilities/pathDomain';

const AuthError = ({ message = 'You need to be logged in to access this page' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <div className="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-800">Access Denied</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(pathDomain.LOGIN)}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={() => navigate(pathDomain.LANDING)}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthError; 