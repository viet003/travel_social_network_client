import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white shadow-lg rounded-xl md:flex-row">
        {/* Left: Image & Welcome */}
        <div className="flex flex-col items-center justify-center p-8 md:w-1/2 bg-gradient-to-br from-white to-gray-100">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="adventure"
            className="object-cover w-full mb-6 shadow-lg rounded-2xl h-96"
          />
          <h2 className="w-full mb-2 text-2xl font-bold text-gray-800">Welcome back, adventurer!</h2>
          <p className="w-full text-gray-500">Continue your journey with your travel community.</p>
        </div>
        {/* Right: Login Form */}
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <div className="flex flex-col items-start mb-8">
            <span className="flex items-center mb-2 text-xl font-bold text-blue-600">
              <svg className="mr-2 text-blue-500 w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" /><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              TravelNest
            </span>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-sm text-gray-500">Log in to your account</p>
          </div>
          <div className="mb-4 space-y-3">
            <button className="flex items-center justify-center w-full py-2 font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/><path fill="#FBBC05" d="M24 45c6.1 0 11.2-2 14.9-5.4l-6.9-5.7C29.7 35.7 27 36.5 24 36.5c-6.1 0-11.2-4.1-13-9.6l-7 5.4C6.6 41.1 14.7 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/></g></svg>
              Continue with Google
            </button>
            <button className="flex items-center justify-center w-full py-2 font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5 mr-2" fill="#1877F3" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              Continue with Facebook
            </button>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1" /></svg>
                </span>
                <input type="text" placeholder="Enter your email" className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6a2 2 0 012 2v2a2 2 0 01-2 2m0-6a2 2 0 00-2 2v2a2 2 0 002 2m0-6V7a2 2 0 114 0v2m-4 0V7a2 2 0 10-4 0v2" /></svg>
                </span>
                <input type="password" placeholder="Enter your password" className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 text-blue-500 rounded form-checkbox" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-2 mt-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">Log In</button>
          </form>
          <div className="mt-6 text-sm text-center text-gray-500">
            New to TravelNest? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
