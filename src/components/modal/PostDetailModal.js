import React, { useState } from 'react';
import { IoEarth } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { SlActionRedo } from "react-icons/sl";
import { SlBubble } from "react-icons/sl";
import { SlHeart } from "react-icons/sl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import avatardf from "../../assets/images/avatardf.jpg"

const PostDetailModal = ({
  isOpen,
  onClose,
  postId,
  avatar,
  userName,
  location,
  timeAgo,
  content,
  displayImages = [],
  displayVideo,
  selectedImageIndex,
  comments = [],
  currentUserAvatar,
  onCommentSubmit,
  tags = [],
  isShare = false,
  status,
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  onLike,
  onShare,
  liked = false
}) => {
  const [commentText, setCommentText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(selectedImageIndex || 0);
  const [isLiked, setIsLiked] = useState(liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && onCommentSubmit) {
      onCommentSubmit(commentText.trim());
      setCommentText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    if (onLike) {
      onLike(!isLiked);
    }
  };

  const renderVideo = (videoUrl) => (
    <div className="relative mb-3">
      <video
        src={videoUrl}
        controls
        className="object-cover w-full max-h-[350px] rounded-lg"
        poster=""
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );

  const renderSingleImage = (img, index) => (
    <div key={index} className="mb-3">
      <img
        src={img}
        alt="post"
        className="object-cover w-full max-h-[350px] rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
        onClick={() => handleImageClick(img, index)}
      />
    </div>
  );

  const renderImageSlider = () => {
    if (displayImages.length === 0) return null;

    if (displayImages.length === 1) {
      return renderSingleImage(displayImages[0], 0)
    }

    return (
      <div className="relative mb-3">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg max-h-[350px]">
          <img
            src={displayImages[currentImageIndex]}
            alt={`post-${currentImageIndex}`}
            className="object-cover w-full max-h-[350px] transition-transform duration-300 ease-in-out"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute p-2 text-white transition-all duration-200 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-2 top-1/2 hover:bg-opacity-70"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute p-2 text-white transition-all duration-200 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-2 top-1/2 hover:bg-opacity-70"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image Counter */}
          <div className="absolute px-2 py-1 text-sm text-white bg-black bg-opacity-50 rounded-full bottom-2 right-2">
            {currentImageIndex + 1} / {displayImages.length}
          </div>
        </div>
      </div>
    );
  };

  const renderTags = () => {
    if (!tags || tags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={tag.tagId || index}
            className="px-2 py-1 text-xs text-blue-600 transition-colors bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center h-full p-4 bg-black bg-opacity-50 -inset-6">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="relative flex items-center justify-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Post by {userName}</h2>
          <button
            onClick={onClose}
            className="absolute p-1 text-gray-500 transition-colors hover:text-gray-700 right-4 top-3"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Original Post */}
          <div className="p-4 border-b border-gray-100">
            {isShare && (
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                <SlActionRedo className="w-4 h-4" />
                <span>Shared a post</span>
              </div>
            )}
            <div className="flex items-center gap-3 mb-3">
              <img src={avatar} alt="avatar" className="object-cover w-10 h-10 rounded-full" />
              <div className='flex flex-col'>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{userName}</span>
                  {location && <span className="text-xs text-gray-500">• {location}</span>}
                </div>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  {timeAgo}
                  <IoEarth className="w-3 h-3" />
                  {status && <span className="ml-1 text-xs">• {status}</span>}
                </span>
              </div>
            </div>

            <div className="mb-3 text-gray-700">
              {content}
            </div>

            {/* Tags */}
            {renderTags()}

            {/* Main Media Display */}
            {displayVideo && renderVideo(displayVideo)}
            {displayImages.length > 0 && renderImageSlider()}

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
              <div className="flex items-center gap-1 transition-colors cursor-pointer hover:text-blue-500">
                <SlBubble className="w-5 h-5" />
                {commentCount}
              </div>
              <div className="flex items-center gap-1 transition-colors cursor-pointer hover:text-green-500" onClick={onShare}>
                <SlActionRedo className="w-5 h-5" />
                {shareCount}
              </div>
            </div>
          </div>
          
          
          {/* Comments List */}
          <div className="p-4 space-y-3">
            {comments.map((ucomment, idx) => (
              <div key={idx} className="flex w-full max-w-lg gap-3">
                <img src={ucomment.avatar} alt="avatar" className="flex-shrink-0 object-cover w-8 h-8 mt-3 rounded-full" />
                <div className="flex-1">
                  <div className="px-3 py-2 bg-gray-100 rounded-2xl">
                    <span className="text-sm font-semibold text-gray-800">{ucomment.userName}</span>
                    <p className="mt-1 text-sm text-gray-700">{ucomment.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="transition-colors cursor-pointer hover:text-blue-500">Like</span>
                    <span className="transition-colors cursor-pointer hover:text-blue-500">Reply</span>
                    <span>{ucomment.timeAgo || '2 hours ago'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Comment Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={currentUserAvatar || avatardf}
              alt="current user"
              className="flex-shrink-0 object-cover w-8 h-8 rounded-full"
            />
            <div className="relative flex-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 transition-all bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
              >
                <HiOutlineEmojiHappy className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;