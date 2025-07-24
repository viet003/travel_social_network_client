import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { MdOutlineExplore } from "react-icons/md";
import { LocationDropdown } from "../../../components";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit?.(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm({
      userName: "",
      firstName: "",
      lastName: "",
      location: "",
      gender: "",
      dateOfBirth: "",
      about: "",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed -left-3 top-0 flex items-center justify-center p-6 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 w-[100vw]"
      style={{ zIndex: 1000 }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white shadow-lg transition-all duration-300 ease-in-out rounded-xl overflow-hidden max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-200">
          <div className="flex flex-col items-start">
            <span className="flex items-center mb-2 text-xl font-bold text-blue-600">
              <MdOutlineExplore className="text-blue-600 w-7 h-7" />
              TravelNest
            </span>
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <p className="text-sm text-gray-500">Update your personal information and preferences</p>
          </div>
          <button
            className="absolute flex items-center justify-center w-8 h-8 text-gray-600 rounded-full bg-gray-white right-6 top-6 hover:bg-gray-300"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Account Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  {GENDER_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Additional Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <LocationDropdown
                  value={form.location}
                  onChange={(value) => setForm(prev => ({ ...prev, location: value }))}
                  placeholder="Search for a city..."
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              About Me <span className="text-xs text-gray-500">(Optional)</span>
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself, your travel interests, favorite destinations..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={500}
            />
            <p className="mt-1 text-xs text-gray-500">{form.about.length}/500 characters</p>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !form.firstName.trim() || !form.lastName.trim() || !form.userName.trim()}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  !isSubmitting && form.firstName.trim() && form.lastName.trim() && form.userName.trim()
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;