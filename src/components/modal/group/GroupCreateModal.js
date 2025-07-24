import { useState } from 'react';
import { X, Image, Users } from "lucide-react";
import { MdOutlineExplore } from "react-icons/md";
import { apiCreateGroupService } from '../../../services/groupService';
import { toast } from 'react-toastify';

const GroupCreateModal = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Privacy settings
  const [isPrivate, setIsPrivate] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setGroupName("");
    setGroupDesc("");
    setCoverFile(null);
    setIsPrivate(false);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit for cover)
    if (file.size > 10 * 1024 * 1024) {
      alert('Cover file too large! Please select a file smaller than 10MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Cover must be an image!');
      return;
    }
    setCoverFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      alert('Group name is required!');
      return;
    }
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('name', groupName);
      formData.append('description', groupDesc);
      if (coverFile) {
        formData.append('cover', coverFile);
      }
      formData.append('privacy', isPrivate);

      const rs = await apiCreateGroupService(formData);
      if (rs?.status === "SUCCESS") {
        setIsUploading(false);
        handleClose();
        if (onSuccess) onSuccess();
        toast.success('Group created successfully!');
      }
    } catch (error) {
      setIsUploading(false);
      const errMsg = error?.data?.message || error?.message || 'An error occurred while creating the group. Please try again!';
      toast.error(errMsg);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all duration-200 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg"
      >
        <Users className="w-4 h-4" />
        New Group
      </button>

      {/* Modal */}
      {isOpen && (
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
                <h2 className="text-2xl font-bold text-gray-800">Create New Group</h2>
                <p className="text-sm text-gray-500">Build a community for travelers with similar interests</p>
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
              {/* Group Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="Enter group name..."
                  required
                  maxLength={100}
                />
                <p className="mt-1 text-xs text-gray-500">{groupName.length}/100 characters</p>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={groupDesc}
                  onChange={e => setGroupDesc(e.target.value)}
                  rows={4}
                  placeholder="Tell others what this group is about..."
                  maxLength={500}
                />
                <p className="mt-1 text-xs text-gray-500">{groupDesc.length}/500 characters</p>
              </div>

              {/* Privacy Settings */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Private Group</span>
                    <p className="text-xs text-gray-500">Only invited members can see and join this group</p>
                  </div>
                </label>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Cover Image <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <div className="flex flex-col items-center">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                    {coverFile ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(coverFile)}
                          alt="Cover Preview"
                          className="object-cover w-full h-full rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setCoverFile(null);
                          }}
                          className="absolute p-1 text-white transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-8">
                        <Image className="w-12 h-12 mb-4 text-gray-400" />
                        <span className="mb-2 text-sm font-medium text-gray-600">Upload Cover Image</span>
                        <span className="text-xs text-center text-gray-500">
                          Click to browse or drag and drop<br />
                          16:9 ratio recommended • Max 10MB
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isUploading || !groupName.trim()}
                  className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-200 ${groupName.trim() && !isUploading
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Creating Group...
                    </div>
                  ) : (
                    'Create Group'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupCreateModal;