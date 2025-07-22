import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoEarth } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { SlActionRedo } from "react-icons/sl";
import { SlBubble } from "react-icons/sl";
import { SlHeart } from "react-icons/sl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CommentCreateModal from '../comment/CommentCreateModal';
import { formatTimeAgo } from '../../../utilities/helperFunction';
import { apiGetAllCommentsByPost } from '../../../services/commentService';
import { FaHeart } from 'react-icons/fa6';

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
  currentUserAvatar,
  tags = [],
  isShare = false,
  status,
  postLikeCount = 0,
  handleLike,
  isLiked,
  postCommentCount,
  handleComment,
  postShareCount = 0,
  onShare,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(selectedImageIndex || 0);
  const [newComment, setNewComment] = useState(null)
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(0); // Trạng thái để theo dõi số trang
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn bài viết để tải
  const [loading, setLoading] = useState(false);
  const observer = useRef(); // Lưu trữ Intersection Observer


  // Hàm callback để theo dõi bài viết cuối cùng
  const lastCommentElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { rootMargin: '100px' } // Tải sớm hơn khi cách mép 100px
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Hàm tải bài viết của người dùng, hỗ trợ phân trang
  const fetchPostComments = async (pageNum) => {
    setLoading(true);
    try {
      const commetResponse = await apiGetAllCommentsByPost(postId, pageNum);
      console.log("User comments data:", commetResponse);
      const comments = commetResponse?.data?.content || [];
      if (pageNum === 0) {
        setComments(comments);
      } else {
        setComments((prevPosts) => [...prevPosts, ...comments]);
      }
      setHasMore(comments.length > 0);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tải bài viết khi page hoặc userId thay đổi
  useEffect(() => {
    if (!isOpen || !hasMore) return;
    fetchPostComments(page);
  }, [page, isOpen]);

  useEffect(() => {
    if (newComment) {
      setComments(prev => [newComment, ...prev]);
    }
  }, [newComment]);


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
    <div className="fixed z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 h-[vh] -inset-6">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[99vh] overflow-hidden relative">
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
                {isLiked ? <FaHeart className='w-5 h-5 fill-current' /> : <SlHeart className='w-5 h-5' />}
                {postLikeCount}
              </div>
              <div className="flex items-center gap-1 transition-colors cursor-pointer hover:text-blue-500">
                <SlBubble className="w-5 h-5" />
                {postCommentCount}
              </div>
              <div className="flex items-center gap-1 transition-colors cursor-pointer hover:text-green-500" onClick={onShare}>
                <SlActionRedo className="w-5 h-5" />
                {postShareCount}
              </div>
            </div>
          </div>


          {/* Comments List */}
          <div className="p-4 space-y-3">
            {comments.map((ucomment, idx) => {
              if (comments.length === idx + 1) {
                return (
                  <div ref={lastCommentElementRef} key={idx} className="flex w-full max-w-lg gap-3">
                    <img src={ucomment?.avatarImg} alt="avatar" className="flex-shrink-0 object-cover w-8 h-8 mt-3 rounded-full" />
                    <div className="flex-1">
                      <div className="px-3 py-2 bg-gray-100 rounded-2xl">
                        <span className="text-sm font-semibold text-gray-800">{ucomment?.firstName} {ucomment?.lastName}</span>
                        <p className="mt-1 text-sm text-gray-700">{ucomment?.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span className="transition-colors cursor-pointer hover:text-blue-500">Like</span>
                        <span className="transition-colors cursor-pointer hover:text-blue-500">Reply</span>
                        <span>{formatTimeAgo(ucomment?.createdAt) || '2 hours ago'}</span>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={idx} className="flex w-full max-w-lg gap-3">
                    <img src={ucomment?.avatarImg} alt="avatar" className="flex-shrink-0 object-cover w-8 h-8 mt-3 rounded-full" />
                    <div className="flex-1">
                      <div className="px-3 py-2 bg-gray-100 rounded-2xl">
                        <span className="text-sm font-semibold text-gray-800">{ucomment?.firstName} {ucomment?.lastName}</span>
                        <p className="mt-1 text-sm text-gray-700">{ucomment?.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span className="transition-colors cursor-pointer hover:text-blue-500">Like</span>
                        <span className="transition-colors cursor-pointer hover:text-blue-500">Reply</span>
                        <span>{formatTimeAgo(ucomment?.createdAt) || '2 hours ago'}</span>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>

          <div className='h-[70px]'></div>
          {/* Comment Input */}
          <div className='absolute bottom-0 left-0 w-full bg-white'>
            <CommentCreateModal postId={postId} handleComment={handleComment} setNewComment={setNewComment} currentUserAvatar={currentUserAvatar} loading={loading} setLoading={setLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;