import { useState } from 'react';
import { useSelector } from 'react-redux';
import { X, Users, Image, Smile, MapPin, MoreHorizontal, Edit, Camera, Hash, Plus } from "lucide-react";
import { LoadingSpinner, LocationDropdown } from "../..";
import avatardf from '../../../assets/images/avatardf.jpg'
import { MdOutlineExplore } from "react-icons/md";
import { apiCreatePostByUserOnGroupService, apiCreatePostByUserService } from '../../../services/postService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostCreateModal = ({ setCreateSuccess, location, groupId = null }) => {
  const { userId, avatar, firstName, lastName } = useSelector(state => state.auth);

  const [postContent, setPostContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]); // Changed to array
  const [isUploading, setIsUploading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigate = useNavigate()
  
  // Tag states
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);

  const handleOpen = () => setIsOpen(true);
  
  const handleClose = () => {
    setIsOpen(false);
    setSelectedMedia([]);
    setPostContent("");
    setTags([]);
    setTagInput("");
    setShowTagInput(false);
    setSelectedLocation(null)
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
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 3) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleMediaSelect = (event) => {
    const files = Array.from(event.target.files);

    for (let file of files) {
      // Check file size (20MB = 20 * 1024 * 1024 bytes)
      if (file.size > 20 * 1024 * 1024) {
        toast.error('File too large! Please select files smaller than 20MB.');
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only image files (JPEG, PNG, GIF) and video files (MP4, MOV, AVI) are supported!');
        return;
      }

      const isVideo = file.type.startsWith('video/');
      const currentVideos = selectedMedia.filter(media => media.type.startsWith('video/'));

      // Check video restrictions
      if (isVideo && currentVideos.length > 0) {
        toast.error('You can only add one video per post!');
        return;
      }

      // Check if adding video when images exist
      if (isVideo && selectedMedia.some(media => media.type.startsWith('image/'))) {
        toast.error('You cannot mix videos with images. Please remove all images first or choose only images.');
        return;
      }

      // Check if adding image when video exists
      if (!isVideo && selectedMedia.some(media => media.type.startsWith('video/'))) {
        toast.error('You cannot mix images with videos. Please remove the video first or choose only a video.');
        return;
      }

      // Check maximum images (e.g., 10 images max)
      if (!isVideo && selectedMedia.length >= 10) {
        toast.error('You can add maximum 10 images per post!');
        return;
      }
    }

    // Process files
    const processFiles = async (files) => {
      const newMedia = [];

      for (let file of files) {
        const mediaItem = {
          file: file,
          type: file.type,
          preview: null,
          id: Date.now() + Math.random() // Generate unique ID
        };

        // Create preview
        const reader = new FileReader();
        await new Promise((resolve) => {
          reader.onload = (e) => {
            mediaItem.preview = e.target.result;
            resolve();
          };
          reader.readAsDataURL(file);
        });

        newMedia.push(mediaItem);
      }

      setSelectedMedia(prev => [...prev, ...newMedia]);
    };

    processFiles(files);
  };

  const removeMedia = (mediaId) => {
    setSelectedMedia(prev => prev.filter(media => media.id !== mediaId));
  };

  const removeAllMedia = () => {
    setSelectedMedia([]);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!postContent.trim() && selectedMedia.length === 0) {
      toast.error('Please enter content or select media!');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('content', postContent);

      // Add all media files
      selectedMedia.forEach((media, index) => {
        formData.append(`media`, media.file);
      });

      formData.append('mediaCount', selectedMedia.length);

      if (selectedLocation) {
        formData.append('location', selectedLocation);
      }
      if (tags.length > 0) {
        formData.append('tags', tags);
      }

      formData.forEach((value, key) => {
        console.log(key, ':', value);
      });

      // Call API to create post
      let response;
      if (groupId) {
        formData.append('groupId', groupId);
        response = await apiCreatePostByUserOnGroupService(formData, groupId);
      } else {
        response = await apiCreatePostByUserService(formData);
      }

      if (response.status === "SUCCESS") {
        // Reset form and close modal
        if (location === "home" || location === "user") {
          navigate(`/user/${userId}`)
        } else {
          handleClose();
          setCreateSuccess && setCreateSuccess(true);
          toast.success('Post created successfully!');
        }
      } else {
        throw new Error('Failed to create post');
      }

    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An error occurred while creating the post. Please try again!');
    } finally {
      setIsUploading(false);
    }
  };

  const hasVideo = selectedMedia.some(media => media.type.startsWith('video/'));
  const hasImages = selectedMedia.some(media => media.type.startsWith('image/'));

  return (
    <>
      {/* Trigger Button */}
      <div
        className="flex items-center gap-3 p-4 mb-6 transition-colors bg-white shadow cursor-pointer w rounded-xl hover:bg-gray-50 w-[620px]"
        onClick={handleOpen}
      >
        <img
          src={`${avatar !== null ? avatar : avatardf}`}
          alt="avatar"
          className="object-cover w-10 h-10 rounded-full"
        />
        <input
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none pointer-events-none"
          placeholder="Share your travel story..."
          readOnly
        />
        <button
          className="flex items-center gap-1 px-3 py-1 font-medium text-blue-600 rounded bg-blue-50 hover:bg-blue-100"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <Image className="w-5 h-5" />
          Photo
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 font-medium text-blue-600 rounded bg-blue-50 hover:bg-blue-100"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <MapPin className="w-5 h-5" />
          Location
        </button>
      </div>

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
                <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
                <p className="text-sm text-gray-500">Share your travel story with the community</p>
              </div>
              <button
                className="absolute flex items-center justify-center w-8 h-8 text-gray-600 rounded-full bg-gray-white right-6 top-6 hover:bg-gray-300"
                onClick={handleClose}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePost} className="p-6 space-y-6">
              {/* User Profile Section */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={`${avatar !== null ? avatar : avatardf}`}
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-base font-semibold text-gray-800">{firstName} {lastName}</span>
                  <div className="mt-1">
                    <LocationDropdown
                      value={selectedLocation}
                      onChange={setSelectedLocation}
                      placeholder="Add location..."
                      type={true}
                    />
                  </div>
                </div>
              </div>

              {/* Content Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">What's on your mind?</label>
                <textarea
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={4}
                  placeholder="Share your travel experience, thoughts, or memories..."
                  maxLength={2000}
                />
                <p className="mt-1 text-xs text-gray-500">{postContent.length}/2000 characters</p>
              </div>

              {/* Tags Section */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tags <span className="text-xs text-gray-500">(Optional, max 3)</span>
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

                {/* Tag input */}
                {showTagInput ? (
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
                    <div className="relative flex-1">
                      <Hash className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyPress={handleTagInputKeyPress}
                        placeholder="Enter tag and press Enter..."
                        className="w-full py-2 pr-4 border border-gray-300 rounded-full pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={20}
                        autoFocus
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!tagInput.trim() || tags.length >= 3}
                      className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowTagInput(false);
                        setTagInput("");
                      }}
                      className="px-3 py-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowTagInput(true)}
                    disabled={tags.length >= 3}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    <Hash className="w-4 h-4" />
                    Add Tags ({tags.length}/3)
                  </button>
                )}
              </div>

              {/* Media Upload Section */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Media <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                
                {selectedMedia.length > 0 ? (
                  <div className="space-y-3">
                    {/* Media counter and remove all button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        {selectedMedia.length} {hasVideo ? 'video' : 'photo'}(s) selected
                      </span>
                      <button
                        type="button"
                        onClick={removeAllMedia}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove all
                      </button>
                    </div>

                    {/* Video preview (single video) */}
                    {hasVideo && (
                      <div className="relative border border-gray-200 rounded-lg h-[250px] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => removeMedia(selectedMedia[0].id)}
                          className="absolute flex items-center justify-center w-8 h-8 text-white bg-gray-800 rounded-full z-9 top-2 right-2 bg-opacity-70 hover:bg-opacity-90"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <video
                          src={selectedMedia[0].preview}
                          className="object-cover w-full h-full"
                          controls
                        />
                      </div>
                    )}

                    {/* Images preview (multiple images) */}
                    {hasImages && (
                      <div className="grid grid-cols-2 gap-2">
                        {selectedMedia.slice(0, 4).map((media, index) => (
                          <div
                            key={media.id}
                            className={`relative border border-gray-200 rounded-lg overflow-hidden ${selectedMedia.length === 1 ? 'col-span-2 h-[250px]' :
                              selectedMedia.length === 2 ? 'h-[200px]' :
                                selectedMedia.length === 3 && index === 0 ? 'col-span-2 h-[200px]' :
                                  'h-[150px]'
                              }`}
                          >
                            <button
                              type="button"
                              onClick={() => removeMedia(media.id)}
                              className="absolute z-10 flex items-center justify-center w-6 h-6 text-white bg-gray-800 rounded-full top-1 right-1 bg-opacity-70 hover:bg-opacity-90"
                            >
                              <X className="w-3 h-3" />
                            </button>

                            <img
                              src={media.preview}
                              alt={`Preview ${index + 1}`}
                              className="object-cover w-full h-full"
                            />

                            {/* Show count overlay for more than 4 images */}
                            {index === 3 && selectedMedia.length > 4 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <span className="text-2xl font-bold text-white">
                                  +{selectedMedia.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add more media button */}
                    <label className="flex items-center justify-center w-full py-3 text-sm font-medium text-blue-600 border border-blue-300 border-dashed rounded-lg cursor-pointer hover:bg-blue-50">
                      <Camera className="w-4 h-4 mr-2" />
                      Add more {hasVideo ? 'is not allowed' : 'photos'}
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple={!hasVideo}
                        className="hidden"
                        onChange={handleMediaSelect}
                        disabled={hasVideo}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                      <div className="flex flex-col items-center py-8">
                        <Image className="w-12 h-12 mb-4 text-gray-400" />
                        <span className="mb-2 text-sm font-medium text-gray-600">Upload Photos or Videos</span>
                        <span className="text-xs text-center text-gray-500">
                          Click to browse or drag and drop<br />
                          JPG, PNG, GIF, MP4, MOV, AVI • Max 20MB per file
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleMediaSelect}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <span className="block mb-3 text-sm font-medium text-gray-700">Quick Actions</span>
                <div className="flex gap-2">
                  <label className="flex items-center justify-center w-10 h-10 text-green-500 rounded-full cursor-pointer hover:bg-gray-100">
                    <Image className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple={!hasVideo}
                      className="hidden"
                      onChange={handleMediaSelect}
                    />
                  </label>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full hover:bg-gray-100"
                    aria-label="Tag people"
                  >
                    <Users className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 text-yellow-500 rounded-full hover:bg-gray-100"
                    aria-label="Add feeling/activity"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTagInput(!showTagInput)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 ${showTagInput ? 'text-purple-600 bg-purple-100' : 'text-purple-500'}`}
                    aria-label="Add tags"
                  >
                    <Hash className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 text-blue-400 rounded-full hover:bg-gray-100"
                    aria-label="Add GIF"
                  >
                    <span className="text-xs font-bold">GIF</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 text-gray-600 rounded-full hover:bg-gray-100"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isUploading || (!postContent.trim() && selectedMedia.length === 0)}
                  className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-200 ${(postContent.trim() || selectedMedia.length > 0) && !isUploading
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Creating Post...
                    </div>
                  ) : (
                    'Create Post'
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

export default PostCreateModal;