import React, { useState } from 'react';
import { IoEarth } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const PostDetailModal = ({
  isOpen,
  onClose,
  avatar,
  userName,
  location,
  timeAgo,
  content,
  displayImages,
  selectedImageIndex,
  comments = [],
  currentUserAvatar,
  onCommentSubmit
}) => {
  const [commentText, setCommentText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(selectedImageIndex || 0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
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

  const renderSingleImage = (img, index) => (
    <div key={index} className="mb-3">
      <img
        src={img}
        alt="post"
        className="object-cover w-full max-h-[300px] rounded-lg"
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
              className={`object-cover w-full h-[150px] rounded-lg cursor-pointer hover:opacity-95 transition-opacity ${
                index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleImageClick(index)}
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
              className={`object-cover w-full h-[200px] rounded-lg cursor-pointer hover:opacity-95 transition-opacity ${
                0 === currentImageIndex ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleImageClick(0)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {displayImages.slice(1).map((img, index) => (
              <img
                key={index + 1}
                src={img}
                alt={`post-${index + 1}`}
                className={`object-cover w-full h-[120px] rounded-lg cursor-pointer hover:opacity-95 transition-opacity ${
                  index + 1 === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleImageClick(index + 1)}
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
              className={`object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity ${
                index === 0 ? 'col-span-2 h-[150px]' : 'h-[120px]'
              } ${index === currentImageIndex ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
          <div className="relative h-[120px]">
            <img
              src={displayImages[3]}
              alt="post-3"
              className={`object-cover w-full h-full rounded-lg cursor-pointer hover:opacity-95 transition-opacity ${
                3 === currentImageIndex ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleImageClick(3)}
            />
            {displayImages.length > 4 && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-opacity-60 transition-all"
                onClick={() => handleImageClick(3)}
              >
                <span className="text-white text-xl font-semibold">+{displayImages.length - 4}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  const renderImageNavigation = () => {
    if (displayImages.length <= 1) return null;
    
    return (
      <div className="flex justify-center gap-2 mb-3">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="relative flex items-center justify-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Post by {userName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 absolute right-4 top-3"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Original Post */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <img src={avatar} alt="avatar" className="object-cover w-10 h-10 rounded-full" />
              <div className='flex flex-col'>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{userName}</span>
                  <span className="text-xs text-gray-500">• {location}</span>
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  {timeAgo}
                  <IoEarth className="w-3 h-3" />
                </span>
              </div>
            </div>

            <div className="mb-3 text-gray-700">
              {content}
            </div>

            {/* Main Image Display */}
            {displayImages.length > 0 && (
              <div className="mb-3">
                <img
                  src={displayImages[currentImageIndex]}
                  alt="post"
                  className="object-cover w-full max-h-[500px] rounded-lg"
                />
              </div>
            )}

            {/* Image Navigation Dots */}
            {renderImageNavigation()}

            {/* Image Thumbnails */}
            {displayImages.length > 0 && (
              displayImages.length === 1
                ? null
                : renderMultipleImages()
            )}
          </div>

          {/* Comments List */}
          <div className="p-4 space-y-3">
            {comments.map((ucomment, idx) => (
              <div key={idx} className="flex gap-3 w-full max-w-lg">
                <img src={ucomment.avatar} alt="avatar" className="mt-3 object-cover rounded-full w-8 h-8 flex-shrink-0" />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-3 py-2">
                    <span className="font-semibold text-gray-800 text-sm">{ucomment.userName}</span>
                    <p className="text-gray-700 text-sm mt-1">{ucomment.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="cursor-pointer hover:text-blue-500">Like</span>
                    <span className="cursor-pointer hover:text-blue-500">Reply</span>
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
              src={currentUserAvatar}
              alt="current user"
              className="object-cover w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HiOutlineEmojiHappy className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium text-sm"
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