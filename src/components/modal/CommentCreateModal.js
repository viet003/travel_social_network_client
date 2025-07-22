import React, { useState } from 'react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { apiCreateCommentService } from '../../services/commentService';
import avatardf from "../../assets/images/avatardf.jpg"
import LoadingSpinner from '../component/LoadingSpinner';

const CommentCreateModal = ({
    postId,
    handleComment,
    setNewComment,
    currentUserAvatar,
    loading,
    setLoading
}) => {

    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) return;

        setLoading(true);

        try {
            const response = await apiCreateCommentService({
                postId,
                content: commentText
            });

            if (response?.status === "SUCCESS") {
                setNewComment(response?.data);
                handleComment();
                setCommentText('');  
            } else {
                throw new Error('Failed to create comment');
            }

        } catch (error) {
            console.error('Error creating comment:', error);
            toast.error('An error occurred while creating the comment. Please try again!');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && commentText) {
            e.preventDefault();
            handleCommentSubmit(e);
        }
    };

    return (
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
                        disabled={loading}
                        className="w-full px-4 py-2 transition-all bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                    disabled={!commentText.trim() || loading}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {loading ? <LoadingSpinner size={19}/> : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default CommentCreateModal;
