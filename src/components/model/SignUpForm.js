import React, { useState } from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { apiSignupService } from '../../services/authService';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';

const SignUpForm = ({ modalType, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    password: '',
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate input
    if (!form.userName || !form.firstName || !form.lastName || !form.gender || !form.dateOfBirth || !form.email || !form.password) {
      toast.error("Please enter all in all fields.");
      return;
    }
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (!form.agree) {
      toast.error("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiSignupService({
        userName: form.userName.toLowerCase().trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        email: form.email.toLowerCase().trim(),
        password: form.password.trim()
      });
      console.log(res)
      if (res.status === "SUCCESS") {
        toast.success(res?.message);
        setForm({
          userName: '',
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          email: '',
          password: '',
          agree: false,
        });
        onSwitchToLogin();
      } else {
        toast.error(res.message || "Registration failed.");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl p-4 mx-auto">
      <div className="flex flex-col items-start mb-6">
        <span className="flex items-center mb-2 text-xl font-bold text-blue-600">
          <MdOutlineExplore className="text-blue-600 w-7 h-7" />
          TravelNest
        </span>
        <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
        <p className="text-sm text-gray-500">Start sharing your travel adventures</p>
      </div>
      {/* <div className="mb-4 space-y-3">
        <button className="flex items-center justify-center w-full py-2 font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50" type="button" disabled>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/><path fill="#FBBC05" d="M24 45c6.1 0 11.2-2 14.9-5.4l-6.9-5.7C29.7 35.7 27 36.5 24 36.5c-6.1 0-11.2-4.1-13-9.6l-7 5.4C6.6 41.1 14.7 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/></g></svg>
          Continue with Google
        </button>
      </div>
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-200" />
        <span className="mx-3 text-sm text-gray-400">or</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div> */}
      <form className="space-y-4" onSubmit={handleSignUp}>
        {/* First row: FirstName, LastName, Gender */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="given-name"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="family-name"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        {/* Second row: UserName, Date of Birth */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-gray-700">UserName</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Choose a userName"
                className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                autoComplete="userName"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1" /></svg>
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="email"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6a2 2 0 012 2v2a2 2 0 01-2 2m0-6a2 2 0 00-2 2v2a2 2 0 002 2m0-6V7a2 2 0 114 0v2m-4 0V7a2 2 0 10-4 0v2" /></svg>
            </span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full py-2 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="new-password"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mr-2 text-blue-500 rounded form-checkbox"
          />
          <span className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
          </span>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size={20}/> : "Create Account"}
        </button>
      </form>
      <div className="mt-6 text-sm text-center text-gray-500">
        Already have an account? <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">Log in</button>
      </div>
    </div>
  );
};

export default SignUpForm;