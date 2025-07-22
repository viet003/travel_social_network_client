import React, { useState } from 'react';
import { SlActionRedo } from "react-icons/sl";
import { SlBubble, SlHeart } from "react-icons/sl";
import { FaHeart } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostDetailModal from './PostDetailModal';
import { useSelector } from 'react-redux';
import avatardf from '../../../assets/images/avatardf.jpg';
import * as helperFunction from "../../../utilities/helperFunction"
import { useNavigate } from 'react-router-dom';

const PostModal = ({
  postId,
  userId,
  avatar,
  userName,
  location,
  timeAgo,
  content,
  image,
  video,
  mediaList = [],
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  tags = [],
  isShare = false,
  status,
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { avatar: currentUserAvatar } = useSelector(state => state.auth);
  const [postLikeCount, setPostLikeCount] = useState(likeCount);
  const [postCommentCount, setPostCommentCount] = useState(commentCount);
  const [postShareCount, setPostShareCount] = useState(shareCount);


  const navigate = useNavigate()

  // Process mediaList to separate images and videos
  const imageMedia = mediaList.filter(media => media.type === 'IMAGE');
  const videoMedia = mediaList.filter(media => media.type === 'VIDEO');

  // Handle both single image and multiple images from mediaList
  const displayImages = imageMedia.length > 0 ? imageMedia.map(media => media.url) : (image ? [image] : []);
  const displayVideo = videoMedia.length > 0 ? videoMedia[0].url : video;

  const handleImageClick = (img, index) => {
    setSelectedImageIndex(index);
    if (onImageClick) {
      onImageClick(img, index);
    }
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPostLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    if (onLike) {
      onLike(!isLiked);
    }
  };

  const handleComment = () => {
    setPostCommentCount(prev => prev + 1);
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
        className="object-cover w-full max-h-[350px] rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
        onClick={() => handleImageClick(img, index)}
      />
    </div>
  );

  const renderVideo = (videoUrl) => (
    <div className="relative mb-3">
      <video
        src={videoUrl}
        controls
        className="object-cover w-full max-h-[350px] rounded-xl"
        poster="" // You can add a poster image if available
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );

  const renderImageSlider = () => {
    if (displayImages.length === 0) return null;

    if (displayImages.length === 1) {
      return renderSingleImage(displayImages[0], 0);
    }

    return (
      <div className="relative mb-3">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-xl max-h-[350px]">
          <img
            src={displayImages[currentImageIndex]}
            alt={`post-${currentImageIndex}`}
            className="object-cover w-full max-h-[350px] transition-transform duration-300 ease-in-out cursor-pointer hover:opacity-95"
            onClick={() => handleImageClick(displayImages[currentImageIndex], currentImageIndex)}
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
            key={index} // Ideally, use tag.tagId if it's unique
            className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-[620px] p-4 mb-6 bg-white shadow rounded-xl">
        {/* Share indicator */}
        {isShare && (
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <SlActionRedo className="w-4 h-4" />
            <span>Shared a post</span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-2">
          <img src={avatar} alt="avatar" className="object-cover w-10 h-10 rounded-full cursor-pointer"
            onClick={() => { console.log(userId); navigate(`/user/${userId}`) }}
          />
          <div className='flex flex-col'>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 cursor-pointer hover:underline hover:text-blue-600"
                onClick={() => { navigate(`/user/${userId}`) }}
              >{userName}</span>
              {location && <span className="text-xs text-gray-500">• {location}</span>}
            </div>
            <span className="flex items-center gap-1 text-xs text-gray-400 align-item-center">
              {helperFunction.formatTimeAgo(timeAgo)}
              <IoEarth className="w-3 h-3" />
              {status && <span className="ml-1 text-xs">• {status}</span>}
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

        {/* Tags */}
        {renderTags()}

        {/* Media rendering logic */}
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
            {isLiked ? <FaHeart className='w-5 h-5 fill-current' /> : <SlHeart className='w-5 h-5' />}
            {postLikeCount}
          </div>
          <div className="flex items-center gap-1 transition-colors cursor-pointer hover:text-red-500" onClick={openCommentModal}>
            <SlBubble className="w-5 h-5" />
            {postCommentCount}
          </div>
          <div className="flex items-center gap-1 transition-colors cursor-pointer hover:text-red-500" onClick={onShare}>
            <SlActionRedo className="w-5 h-5" />
            {postShareCount}
          </div>
        </div>

        {/* Comment button - just a button to open modal */}
        <button className="w-full mt-3" onClick={openCommentModal}>
          <div className="flex items-center gap-3 p-2 transition-colors rounded-lg hover:bg-gray-50">
            <img
              src={currentUserAvatar || avatardf}
              alt="current user"
              className="flex-shrink-0 object-cover w-8 h-8 rounded-full"
            />
            <div className="relative flex-1">
              <div className="w-full px-4 py-2 text-left text-gray-500 bg-gray-100 rounded-full cursor-pointer">
                Write a comment...
              </div>
              <div className="absolute text-gray-400 transform -translate-y-1/2 right-2 top-1/2">
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
        postId={postId}
        avatar={avatar}
        userName={userName}
        location={location}
        timeAgo={helperFunction.formatTimeAgo(timeAgo)}
        content={content}
        displayImages={displayImages}
        displayVideo={displayVideo}
        selectedImageIndex={selectedImageIndex}
        comments={comments}
        postLikeCount={postLikeCount}
        handleLike={handleLike}
        isLiked={isLiked}
        postCommentCount={postCommentCount}
        handleComment={handleComment}
        currentUserAvatar={currentUserAvatar}
        tags={tags}
        isShare={isShare}
        status={status}
      />
    </>
  );
};

export default PostModal;