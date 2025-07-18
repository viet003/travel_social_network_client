import React, { useState } from 'react';
import { SlActionRedo } from "react-icons/sl";
import { SlBubble } from "react-icons/sl";
import { SlHeart } from "react-icons/sl";
import { IoEarth } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import PostDetailModal from './PostDetailModal';
import { useSelector } from 'react-redux';

const PostModal = ({
  avatar,
  userName,
  location,
  timeAgo,
  content,
  image,
  images = [],
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  comments = [],
  onShare,
  onImageClick,
  onComment,
  onLike,
  liked = false
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const { avatar: currentUserAvatar } = useSelector(state => state.auth);
  // Handle both single image and multiple images
  const displayImages = images.length > 0 ? images : (image ? [image] : []);

  const handleImageClick = (img, index) => {
    setSelectedImageIndex(index);
    if (onImageClick) {
      onImageClick(img, index);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    if (onLike) {
      onLike(!isLiked);
    }
  };

  const openCommentModal = () => {
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  const handleCommentSubmit = (commentText) => {
    if (onComment) {
      onComment(commentText);
    }
  };

  const renderSingleImage = (img, index) => (
    <div key={index} className="mb-3">
      <img
        src={img}
        alt="post"
        className="object-cover w-full max-h-[450px] rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
        onClick={() => handleImageClick(img, index)}
      />
    </div>
  );

  const renderMultipleImages = () => {
    if (displayImages.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {displayImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`post-${index}`}
              className="object-cover w-full h-[200px] rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => handleImageClick(img, index)}
            />
          ))}
        </div>
      );
    }

    if (displayImages.length === 3) {
      return (
        <div className="mb-3">
          <div className="mb-2">
            <img
              src={displayImages[0]}
              alt="post-0"
              className="object-cover w-full h-[250px] rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => handleImageClick(displayImages[0], 0)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {displayImages.slice(1).map((img, index) => (
              <img
                key={index + 1}
                src={img}
                alt={`post-${index + 1}`}
                className="object-cover w-full h-[150px] rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => handleImageClick(img, index + 1)}
              />
            ))}
          </div>
        </div>
      );
    }

    if (displayImages.length >= 4) {
      return (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {displayImages.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`post-${index}`}
              className={`object-cover rounded-xl cursor-pointer hover:opacity-95 transition-opacity ${index === 0 ? 'col-span-2 h-[200px]' : 'h-[150px]'
                }`}
              onClick={() => handleImageClick(img, index)}
            />
          ))}
          <div className="relative h-[150px]">
            <img
              src={displayImages[3]}
              alt="post-3"
              className="object-cover w-full h-full rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => handleImageClick(displayImages[3], 3)}
            />
            {displayImages.length > 4 && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-opacity-60 transition-all"
                onClick={() => handleImageClick(displayImages[3], 3)}
              >
                <span className="text-white text-xl font-semibold">+{displayImages.length - 4}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="p-4 mb-6 bg-white shadow rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <img src={avatar} alt="avatar" className="object-cover w-10 h-10 rounded-full" />
          <div className='flex flex-col'>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{userName}</span>
              <span className="text-xs text-gray-500">• {location}</span>
            </div>
            <span className="text-xs text-gray-400 flex items-center gap-1 align-item-center">
              {timeAgo}
              <IoEarth className="w-3 h-3" />
            </span>
          </div>
          <div className="ml-auto">
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-3 text-gray-700">
          {content}
        </div>

        {/* Image rendering logic */}
        {displayImages.length > 0 && (
          displayImages.length === 1
            ? renderSingleImage(displayImages[0], 0)
            : renderMultipleImages()
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-6 pt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-2-2-2 2m0 6l2 2 2-2" />
            </svg>
          </div>
          <div className={`flex items-center gap-1 cursor-pointer transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`} onClick={handleLike}>
            <SlHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            {currentLikeCount}
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors" onClick={openCommentModal}>
            <SlBubble className="w-5 h-5" />
            {commentCount}
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 transition-colors" onClick={onShare}>
            <SlActionRedo className="w-5 h-5" />
            {shareCount}
          </div>
        </div>

        {/* Comment button - just a button to open modal */}
        <button className="mt-3 w-full" onClick={openCommentModal}>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <img
              src={currentUserAvatar}
              alt="current user"
              className="object-cover w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 relative">
              <div className="w-full px-4 py-2 bg-gray-100 rounded-full text-left text-gray-500 cursor-pointer">
                Write a comment...
              </div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <HiOutlineEmojiHappy className="w-5 h-5" />
              </div>
            </div>
          </div>
        </button>

        <div className="flex justify-end mt-2">
          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-500" onClick={onShare}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12v.01M12 12v.01M20 12v.01" /></svg>
            Share
          </button>
        </div>

      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        isOpen={showCommentModal}
        onClose={closeCommentModal}
        avatar={avatar}
        userName={userName}
        location={location}
        timeAgo={timeAgo}
        content={content}
        displayImages={displayImages}
        selectedImageIndex={selectedImageIndex}
        comments={comments}
        currentUserAvatar={currentUserAvatar}
        onCommentSubmit={handleCommentSubmit}
      />
    </>
  );
};

export default PostModal;