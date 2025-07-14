import React from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthStatus = () => {
  const { token, isLoggedIn, isAuthenticated, logout } = useAuth();

  return (
    <div className="fixed top-4 right-4 p-4 bg-white rounded-lg shadow-md border">
      <h3 className="mb-2 text-sm font-semibold text-gray-800">Auth Status</h3>
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Token:</span>
          <span className={`px-2 py-1 rounded ${token ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {token ? 'Present' : 'None'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">isLoggedIn:</span>
          <span className={`px-2 py-1 rounded ${isLoggedIn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isLoggedIn ? 'True' : 'False'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Authenticated:</span>
          <span className={`px-2 py-1 rounded ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isAuthenticated ? 'True' : 'False'}
          </span>
        </div>
      </div>
      {isAuthenticated && (
        <button
          onClick={logout}
          className="mt-3 w-full px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthStatus; 