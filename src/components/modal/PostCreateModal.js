import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { X, Users, Image, Smile, MapPin, MoreHorizontal, Edit, Camera, Hash, Plus } from "lucide-react";
import { LoadingSpinner, LocationDropdown } from "../../components";
import avatardf from '../../assets/images/avatardf.jpg'
import { MdOutlineExplore } from "react-icons/md";
import { apiCreatePostService } from '../../services/postService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostCreateModal = ({ setCreateSuccess, location }) => {
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

  const handlePost = async () => {
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
      const response = await apiCreatePostService(formData);

      if (response.status === "SUCCESS") {
        // Reset form and close modal
        if (location === "home") {
          navigate(`/user/${userId}`)
        } else {
          handleClose();
          setCreateSuccess(true);
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
      {/* Button trigger */}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-xl bg-white shadow-lg transition-all duration-300 ease-in-out md:w-[500px] rounded-t-xl rounded-b-xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-xl">
              <div className="flex flex-col items-start">
                <span className="flex items-center mb-2 text-xl font-bold text-blue-600">
                  <MdOutlineExplore className="text-blue-600 w-7 h-7" />
                  TravelNest
                </span>
                <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
                <p className="text-sm text-gray-500">Please fill in the form to share your travel story</p>
              </div>
              <button
                className="absolute flex items-center justify-center w-8 h-8 text-gray-600 rounded-full bg-gray-white right-4 top-4 hover:bg-gray-300"
                onClick={handleClose}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-3 p-4 bg-white">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={`${avatar !== null ? avatar : avatardf}`}
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="ml-4 text-sm font-bold text-gray-800">{firstName} {lastName}</span>
                <div className="relative">
                  <LocationDropdown
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    placeholder="Select location..."
                    type={true}
                  />
                </div>
              </div>
            </div>

            {/* Content Input Area */}
            <div className="px-4 pb-4 bg-white">
              <textarea
                className={`${selectedMedia.length > 0 ? "min-h-[30px]" : "min-h-[120px]"} w-full resize-none border-none bg-transparent text-base text-gray-600 placeholder-gray-500 focus:outline-none`}
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                aria-label="Post content"
              />

              {/* Tags Section - Absolute positioned */}
              <div className="relative">
                {/* Display existing tags */}
                {tags.length > 0 && (
                  <div className={`${selectedMedia.length > 0 ? "-top-[130px]" : "-top-[200px]"} absolute right-0 flex flex-wrap gap-2 justify-end max-w-[300px] `}>
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 text-[14px] text-blue-700 bg-blue-100 rounded-full"
                      >
                        <Hash className="w-3 h-3" />
                        {tag}
                        <button
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

                {/* Tag input - Absolute positioned */}
                {showTagInput && (
                  <div className="absolute left-0 right-0 z-10 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                    <div className="flex items-center gap-2 mb-3">
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
                        onClick={addTag}
                        disabled={!tagInput.trim() || tags.length >= 3}
                        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setShowTagInput(false);
                          setTagInput("");
                        }}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Tag limit indicator inside popup */}
                    <div className="mb-2 text-xs text-gray-500">
                      {tags.length}/3 tags
                    </div>

                    <div className="text-xs text-gray-400">
                      Press Enter or comma to add tag
                    </div>
                  </div>
                )}
              </div>

              {/* Media Preview */}
              {selectedMedia.length > 0 && (
                <div className="mt-4">
                  {/* Media counter and remove all button */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {selectedMedia.length} {hasVideo ? 'video' : 'photo'}(s) selected
                    </span>
                    <button
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

                          {/* Edit controls for first image */}
                          {index === 0 && media.type.startsWith('image/') && (
                            <div className='absolute flex flex-row gap-2 bottom-2 left-2'>
                              <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-200 bg-gray-700 rounded-md bg-opacity-90 hover:bg-opacity-100">
                                <Edit className="w-3 h-3" />
                                Edit
                              </button>
                              <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-200 bg-gray-700 rounded-md bg-opacity-90 hover:bg-opacity-100">
                                <Camera className="w-3 h-3" />
                                Add more
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Media/Action Buttons Row */}
            <div className="p-2 mx-4 mb-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">Add to your post</span>
                <div className="flex gap-1">
                  <label className="flex items-center justify-center w-10 h-10 text-green-500 rounded-full cursor-pointer hover:bg-gray-100">
                    <Image className="w-6 h-6" />
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple={!hasVideo} // Allow multiple only if no video
                      className="hidden"
                      onChange={handleMediaSelect}
                    />
                  </label>
                  <button
                    className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full hover:bg-gray-100"
                    aria-label="Tag people"
                  >
                    <Users className="w-6 h-6" />
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 text-yellow-500 rounded-full hover:bg-gray-100"
                    aria-label="Add feeling/activity"
                  >
                    <Smile className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setShowTagInput(!showTagInput)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 ${showTagInput ? 'text-purple-600 bg-purple-50' : 'text-purple-500'}`}
                    aria-label="Add tags"
                  >
                    <Hash className="w-6 h-6" />
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 text-blue-400 rounded-full hover:bg-gray-100"
                    aria-label="Add GIF"
                  >
                    <span className="text-sm font-bold">GIF</span>
                  </button>
                  <button
                    className="flex items-center justify-center w-10 h-10 text-gray-600 rounded-full hover:bg-gray-100"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Post Button */}
            <div className="p-4 pt-0 bg-white rounded-b-xl">
              <button
                className={`w-full py-2 text-base font-bold rounded-md transition-colors ${(postContent.trim() || selectedMedia.length > 0) && !isUploading
                  ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                  : "bg-gray-300 text-white cursor-not-allowed"
                  }`}
                onClick={handlePost}
                disabled={(!postContent.trim() && selectedMedia.length === 0 && !selectedLocation) || isUploading}
                aria-label="Post"
              >
                {isUploading ? (<LoadingSpinner size={19} />) : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCreateModal;