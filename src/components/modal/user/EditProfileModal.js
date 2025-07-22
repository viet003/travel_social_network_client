import React, { useState, useEffect } from "react";
import { MdOutlineExplore } from "react-icons/md";
import { LocationDropdown} from "../../../components";


const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const EditProfileModal = ({ open, onClose, onSubmit, initialValues = {} }) => {
  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    location: "",
    gender: "",
    dateOfBirth: "",
    about: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        userName: initialValues.userName || "",
        firstName: initialValues.userProfile?.firstName || "",
        lastName: initialValues.userProfile?.lastName || "",
        location: initialValues.userProfile?.location || "",
        gender: initialValues.userProfile?.gender || "",
        dateOfBirth: initialValues.userProfile?.dateOfBirth || "",
        about: initialValues.userProfile?.about || "",
      });
    }
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'} bg-black/40`}>
      <div className="relative w-full max-w-xl p-6 bg-white shadow-lg rounded-xl">
        <button
          className="absolute text-gray-400 top-3 right-3 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-start mb-6">
          <span className="flex items-center mb-2 text-xl font-bold text-blue-600">
            <MdOutlineExplore className="text-blue-600 w-7 h-7" />
            TravelNest
          </span>
          <h2 className="text-2xl font-bold text-gray-800">Edit profile</h2>
          <p className="text-sm text-gray-500">Please fill in the form to update your profile</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First row: FirstName, LastName, Gender */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[120px]">
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
            <div className="flex-1 min-w-[120px]">
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
            <div className="flex-1 min-w-[120px]">
              <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Second row: UserName, Date of Birth */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[120px]">
              <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                autoComplete="username"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
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
          {/* Third row: Location */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
            <LocationDropdown
              value={form.location}
              onChange={(value) => setForm(prev => ({ ...prev, location: value }))}
              placeholder="Search for a city..."
            />
          </div>
          {/* Fourth row: About */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">About</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal; 

