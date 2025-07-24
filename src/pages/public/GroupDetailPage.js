import React, { useState, useEffect, useRef, useCallback } from "react"
import { Camera, MapPin } from "lucide-react"
import { MdGroups } from "react-icons/md";
import PostCreateModal from '../../components/modal/post/PostCreateModal';
import PostModal from '../../components/modal/post/PostModal';
import { toast } from 'react-toastify';
import avatardf from "../../assets/images/avatardf.jpg";
import { apiGeAllPostByGroup } from '../../services/postService';
import { apiGetDetailGroupById } from '../../services/groupService';
import { useParams } from "react-router-dom";

const GroupDetailPage = () => {
    const [activeTab, setActiveTab] = useState("feed")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const { groupId } = useParams();
    const [groupDetail, setGroupDetail] = useState(null);
    const [showCoverModal, setShowCoverModal] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);

    const lastPostElementRef = useCallback(
        (node) => {
            if (loading || !hasMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new window.IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const fetchPostsData = async (pageNum) => {
        setLoading(true);
        try {
            const postResponse = await apiGeAllPostByGroup(groupId, pageNum);
            const newPosts = postResponse?.data?.content || [];
            if (pageNum === 0) {
                setPosts(newPosts);
            } else {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            }
            setHasMore(newPosts.length > 0);
        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error("Error fetching post data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchGroupDetail = async () => {
            try {
                if (!groupId) return;
                const res = await apiGetDetailGroupById(groupId);
                setGroupDetail(res?.data || res);
            } catch (err) {
                toast.error('Could not load group details!');
            }
        };
        fetchGroupDetail();
    }, [groupId]);

    useEffect(() => {
        if (hasMore) {
            fetchPostsData(page);
        }
    }, [page]);

    const TabButton = ({ value, children, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
        >
            {children}
        </button>
    )

    const Button = ({ children, variant = "default", size = "default", className = "", onClick }) => {
        const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

        const variants = {
            default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
            ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
            green: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
        }

        const sizes = {
            default: "px-4 py-2",
            sm: "px-3 py-1.5 text-sm"
        }

        return (
            <button
                onClick={onClick}
                className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            >
                {children}
            </button>
        )
    }

    const Card = ({ children, className = "" }) => (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
            {children}
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 w-[670px]">
            {/* Hero Section */}
            <div
                className="relative h-64 overflow-hidden bg-center bg-cover rounded-3xl"
                style={{
                    backgroundImage: groupDetail?.coverImageUrl
                        ? `url('${groupDetail.coverImageUrl}')`
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                }}
            >
                {/* Overlay mờ để tăng độ tương phản */}
                <div className="absolute inset-0 z-0 bg-black bg-opacity-40"></div>
                {/* Cover update button */}
                <div className="absolute z-20 flex items-center gap-2 top-6 right-6">
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-black/40 hover:bg-black/60"
                        onClick={() => setShowCoverModal(true)}
                    >
                        <Camera size={16} />
                        Change cover photo
                    </button>
                </div>
                <div className="relative z-10 flex items-end justify-between h-full p-8">
                    <div className="text-white">
                        <h1 className="mb-2 text-3xl font-bold drop-shadow">{groupDetail?.groupName || 'Group Name'}</h1>
                        <div className="flex items-center gap-4 text-sm opacity-90">
                            <span className="flex items-center gap-1"><MdGroups size={20} /> {groupDetail?.memberCount?.toLocaleString() || 0} members</span>
                        </div>
                        {groupDetail?.groupDescription && (
                            <div className="max-w-xl mt-2 text-base text-white/90 line-clamp-2">{groupDetail.groupDescription}</div>
                        )}
                    </div>
                    {/* Ẩn nút Join Group nếu đã là thành viên hoặc group private */}
                    {groupDetail && !groupDetail.isMember && !groupDetail.privacy && (
                        <button className="flex p-3 ml-8 text-white transition rounded-full shadow-lg bg-black/40 hover:bg-black/60">
                            <MdGroups size={20} className="mr-2" />
                            Join Group
                        </button>
                    )}
                </div>
            </div>

            {/* Cover update modal */}
            {showCoverModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg p-6 min-w-[320px] shadow-xl">
                        <div className="mb-4 text-lg font-semibold">Update group cover photo</div>
                        {/* TODO: Add upload form here */}
                        <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700" onClick={() => setShowCoverModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Nếu group là private, hiển thị thông báo và ẩn tabBar + content */}
            {groupDetail?.privacy && groupDetail?.isMember ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="px-6 py-4 text-lg font-semibold text-center text-white bg-red-500 shadow-md rounded-xl">This is a private group. You need to join to see the content.</div>
                </div>
            ) : (
                <>
                    {/* Navigation Tabs */}
                    <div className="bg-white border-b border-gray-200">
                        <div className="flex justify-center">
                            <button
                                onClick={() => setActiveTab("feed")}
                                className={`px-8 py-3 text-base font-medium transition-colors border-b-2 ${
                                    activeTab === "feed"
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-blue-600"
                                }`}
                            >
                                Feed
                            </button>
                            <button
                                onClick={() => setActiveTab("members")}
                                className={`px-8 py-3 text-base font-medium transition-colors border-b-2 ${
                                    activeTab === "members"
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-blue-600"
                                }`}
                            >
                                Members
                            </button>
                            <button
                                onClick={() => setActiveTab("trip-plans")}
                                className={`px-8 py-3 text-base font-medium transition-colors border-b-2 ${
                                    activeTab === "trip-plans"
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-blue-600"
                                }`}
                            >
                                Trip Plans
                            </button>
                            <button
                                onClick={() => setActiveTab("media")}
                                className={`px-8 py-3 text-base font-medium transition-colors border-b-2 ${
                                    activeTab === "media"
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-blue-600"
                                }`}
                            >
                                Media
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-4xl p-4 mx-auto">
                        {/* Post Creation */}
                        {groupDetail && !groupDetail.privacy && groupDetail.isMember && (
                            <PostCreateModal setCreateSuccess={setCreateSuccess} location="group" groupId={groupId} />
                        )}

                        {/* Posts */}
                        <div className="space-y-6">
                            {posts.length === 0 && !loading ? (
                                <div className="py-12 text-center">
                                    <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                                    <p className="text-gray-500">No posts yet</p>
                                </div>
                            ) : (
                                posts.map((post, index) => {
                                    if (posts.length === index + 1) {
                                        return (
                                            <div key={post.postId} ref={lastPostElementRef}>
                                                <PostModal
                                                    userId={post?.userId}
                                                    postId={post.postId}
                                                    avatar={post.avatarImg || avatardf}
                                                    userName={`${post.firstName || ''} ${post.lastName || ''}`.trim() || 'Unknown User'}
                                                    location={post.location}
                                                    timeAgo={post.createdAt}
                                                    content={post.content}
                                                    image={post.mediaList?.find(media => media.type === 'IMAGE')?.url || null}
                                                    video={post.mediaList?.find(media => media.type === 'VIDEO')?.url || null}
                                                    mediaList={post.mediaList || []}
                                                    likeCount={post.likeCount || 0}
                                                    commentCount={post.commentCount || 0}
                                                    shareCount={post.shareCount || 0}
                                                    tags={post.tags || []}
                                                    isShare={post.isShare}
                                                    status={post.status}
                                                    comments={[]}
                                                    onShare={() => {
                                                        console.log('Share post:', post.postId);
                                                    }}
                                                    onLike={() => {
                                                        console.log('Like post:', post.postId);
                                                    }}
                                                    onComment={() => {
                                                        console.log('Comment on post:', post.postId);
                                                    }}
                                                />
                                            </div>
                                        );
                                    }
                                    return (
                                        <PostModal
                                            key={post.postId}
                                            userId={post?.userId}
                                            postId={post.postId}
                                            avatar={post.avatarImg || avatardf}
                                            userName={`${post.firstName || ''} ${post.lastName || ''}`.trim() || 'Unknown User'}
                                            location={post.location}
                                            timeAgo={post.createdAt}
                                            content={post.content}
                                            image={post.mediaList?.find(media => media.type === 'IMAGE')?.url || null}
                                            video={post.mediaList?.find(media => media.type === 'VIDEO')?.url || null}
                                            mediaList={post.mediaList || []}
                                            likeCount={post.likeCount || 0}
                                            commentCount={post.commentCount || 0}
                                            shareCount={post.shareCount || 0}
                                            tags={post.tags || []}
                                            isShare={post.isShare}
                                            status={post.status}
                                            comments={[]}
                                            onShare={() => {
                                                console.log('Share post:', post.postId);
                                            }}
                                            onLike={() => {
                                                console.log('Like post:', post.postId);
                                            }}
                                            onComment={() => {
                                                console.log('Comment on post:', post.postId);
                                            }}
                                        />
                                    );
                                })
                            )}
                            {loading && page > 0 && (
                                <div className="flex items-center justify-center w-full">
                                    <span>Loading...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default GroupDetailPage
