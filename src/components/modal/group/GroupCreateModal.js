import { useState } from 'react';
import { X, Image, Camera, Users, MapPin, Hash, Plus } from "lucide-react";
import { MdOutlineExplore } from "react-icons/md";

const GroupCreateModal = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Category/tags for group
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  
  // Privacy settings
  const [isPrivate, setIsPrivate] = useState(false);

  const handleOpen = () => setIsOpen(true);
  
  const handleClose = () => {
    setIsOpen(false);
    setGroupName("");
    setGroupDesc("");
    setAvatarFile(null);
    setCoverFile(null);
    setTags([]);
    setTagInput("");
    setShowTagInput(false);
    setIsPrivate(false);
  };

  // Tag handling functions
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (5MB limit for avatar)
    if (file.size > 5 * 1024 * 1024) {
      alert('Avatar file too large! Please select a file smaller than 5MB.');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert('Avatar must be an image!');
      return;
    }
    setAvatarFile(file);
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
    if (!avatarFile) {
      alert('Group avatar is required!');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // TODO: Call API create group here
      const formData = new FormData();
      formData.append('name', groupName);
      formData.append('description', groupDesc);
      formData.append('avatar', avatarFile);
      if (coverFile) formData.append('cover', coverFile);
      if (tags.length > 0) formData.append('tags', JSON.stringify(tags));
      formData.append('isPrivate', isPrivate);
      
      // Simulate API call
      setTimeout(() => {
        setIsUploading(false);
        alert('Group created successfully!');
        handleClose();
        if (onSuccess) onSuccess();
      }, 1500);
      
      console.log({ groupName, groupDesc, avatarFile, coverFile, tags, isPrivate });
    } catch (error) {
      console.error('Error creating group:', error);
      alert('An error occurred while creating the group. Please try again!');
      setIsUploading(false);
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

              {/* Tags Section */}
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Categories/Tags <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                
                {/* Display existing tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full"
                      >
                        <Hash className="w-3 h-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Add tags button */}
                {!showTagInput && (
                  <button
                    type="button"
                    onClick={() => setShowTagInput(true)}
                    disabled={tags.length >= 5}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Hash className="w-4 h-4" />
                    Add Category Tags ({tags.length}/5)
                  </button>
                )}

                {/* Tag input */}
                {showTagInput && (
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative flex-1">
                        <Hash className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="text"
                          value={tagInput}
                          onChange={handleTagInputChange}
                          onKeyPress={handleTagInputKeyPress}
                          placeholder="Enter category (e.g., adventure, food, culture)..."
                          className="w-full py-2 pr-4 border border-gray-300 rounded-full pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={20}
                          autoFocus
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addTag}
                        disabled={!tagInput.trim() || tags.length >= 5}
                        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowTagInput(false);
                          setTagInput("");
                        }}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Press Enter or comma to add tag • {tags.length}/5 tags
                    </div>
                  </div>
                )}
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

              {/* Image Uploads */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Avatar Upload */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Group Avatar <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-center">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-full cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                      {avatarFile ? (
                        <img 
                          src={URL.createObjectURL(avatarFile)} 
                          alt="Avatar Preview" 
                          className="object-cover w-full h-full rounded-full" 
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                          <span className="mt-2 text-xs text-gray-500">Upload Avatar</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange} 
                        className="hidden" 
                      />
                    </label>
                    <p className="mt-2 text-xs text-center text-gray-500">
                      Square image recommended<br />Max 5MB
                    </p>
                  </div>
                </div>

                {/* Cover Upload */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Cover Image <span className="text-xs text-gray-500">(Optional)</span>
                  </label>
                  <div className="flex flex-col items-center">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                      {coverFile ? (
                        <img 
                          src={URL.createObjectURL(coverFile)} 
                          alt="Cover Preview" 
                          className="object-cover w-full h-full rounded-lg" 
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Image className="w-8 h-8 text-gray-400" />
                          <span className="mt-2 text-xs text-gray-500">Upload Cover</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleCoverChange} 
                        className="hidden" 
                      />
                    </label>
                    <p className="mt-2 text-xs text-center text-gray-500">
                      16:9 ratio recommended<br />Max 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <button 
                  type="submit" 
                  disabled={isUploading || !groupName.trim() || !avatarFile} 
                  className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-200 ${
                    (groupName.trim() && avatarFile) && !isUploading
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