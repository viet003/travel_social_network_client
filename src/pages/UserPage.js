import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import {
  MapPin,
  MessageCircle,
  Edit3,
  Share2,
  CheckCircle,
  Camera,
  Globe,
  MessageSquare,
  Bookmark,
  UserPlus,
} from "lucide-react"
import { PostModal, EditProfileModal, PostCreateModal } from '../components';
import { apiGetUserProfile, apiUpdateUserImgService, apiUpdateUserService } from '../services/userService';
import { apiGeAllPostByUser } from '../services/postService';
import { useDispatch } from "react-redux";
import { authAction } from '../stores/actions';
import { useSelector } from "react-redux";
import avatardf from '../assets/images/avatardf.jpg';

const UserPage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts")
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputAvatarRef = useRef();
  const inputCoverRef = useRef();
  const { userId: currentUserId } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Gọi đồng thời 2 API bằng Promise.all
      const [userProfileResponse, userPostsResponse] = await Promise.all([
        apiGetUserProfile(userId),
        apiGeAllPostByUser(userId)
      ]);

      console.log("User profile data:", userProfileResponse);
      console.log("User posts data:", userPostsResponse);

      // Xử lý dữ liệu user profile
      setUser(userProfileResponse?.data);

      // Xử lý dữ liệu posts
      setPosts(userPostsResponse?.content || []);
      console.log("posts", posts)

    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err?.message || 'Error fetching user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("userId", userId);
    if (!userId) return;

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (createSuccess) {
      fetchUserData();
      setCreateSuccess(false);
    }
  }, [createSuccess]);

  const handleUpdateImg = async (file, type) => {
    if (!file || !userId) return;
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      type === "avatar" ? formData.append('avatarImg', file) : formData.append('coverImg', file);
      const rs = await apiUpdateUserImgService(formData);
      if (rs?.status === "SUCCESS") {
        console.log("rs", rs);
        type === "avatar" ? dispatch(authAction.updateAvatarImg(rs?.data)) : dispatch(authAction.updateCoverImg(rs?.data));
      }
      // Sau khi update thành công, fetch lại profile
      const updated = await apiGetUserProfile(userId);
      console.log("updated", updated?.data);
      setUser(updated?.data);
    } catch (err) {
      setError(err?.message || 'Error updating avatar');
    } finally {
      setLoading(false);
    }
  };

  // Hàm format thời gian
  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden h-96 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-blue-600">
        {/* Beach Sunset Background */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('${user?.coverImg || "/placeholder.svg?height=400&width=1200&text=Beach+Sunset"}')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Action Buttons */}
        <div className="absolute flex gap-3 top-6 right-6">
          {
            currentUserId !== userId && (
              <>
                <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60">
                  <UserPlus size={20} />
                </button>
                <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60">
                  <MessageCircle size={20} />
                </button>
              </>
            )
          }
          {
            userId === currentUserId && (
              <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60" onClick={() => setOpenEditModal(true)}>
                <Edit3 size={20} />
              </button>
            )
          }
          <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60">
            <Share2 size={20} />
          </button>
        </div>

        {/* Cover Photo Change Button */}
        {userId === currentUserId && (
          <div className="absolute z-30 flex items-center gap-2 top-6 left-6">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={inputCoverRef}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  console.log('Selected cover file:', e.target.files[0]);
                  handleUpdateImg(e.target.files[0], "cover");
                }
              }}
            />
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-black/40 hover:bg-black/60"
              onClick={() => inputCoverRef.current && inputCoverRef.current.click()}
            >
              <Camera size={16} />
              Đổi ảnh bìa
            </button>
          </div>
        )}

        {/* Profile Card */}
        <div className="absolute max-w-lg p-6 text-white bottom-6 left-6 bg-black/40 backdrop-blur-md rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="relative cursor-pointer group">
              <img
                src={user?.avatarImg || avatardf}
                alt="Profile"
                className="w-20 h-20 transition-all duration-300 border-4 rounded-full shadow-lg border-white/30 hover:shadow-xl group-hover:scale-105"
              />
              {/* Input file ẩn */}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={inputAvatarRef}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    handleUpdateImg(e.target.files[0], "avatar");
                  }
                }}
              />
              {/* Hover Overlay with Edit Icon */}
              {
                userId === currentUserId && (
                  <div
                    className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 rounded-full opacity-0 cursor-pointer pointer-events-auto bg-black/40 group-hover:opacity-100"
                    onClick={() => {
                      console.log('Overlay clicked');
                      inputAvatarRef.current && inputAvatarRef.current.click();
                    }}
                  >
                    <div className="p-2 transition-transform duration-200 transform scale-75 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-100">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )
              }
              {/* Verified Badge */}
              <div className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md -bottom-1 -right-1">
                <CheckCircle className="w-4 h-4 text-blue-500" />
              </div>
              {/* Glow Effect Ring */}
              <div className="absolute inset-0 transition-opacity duration-300 border-2 rounded-full opacity-0 border-white/50 group-hover:opacity-100 animate-pulse"></div>
            </div>

            <div className="flex-1">
              <h1 className="mb-1 text-2xl font-bold">{user?.userProfile?.firstName} {user?.userProfile?.lastName}</h1>
              {
                user?.userProfile?.location && (
                  <div className="flex items-center gap-1 mb-2 text-white/80">
                    <MapPin size={14} />
                    <span className="text-sm">{user?.userProfile?.location}</span>
                  </div>
                )
              }
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                {user?.userProfile?.bio || "Adventure seeker | Travel photographer | 35 countries"}
              </p>
            </div>
          </div>
        </div>

        {/* Modal chỉnh sửa profile */}
        <EditProfileModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          initialValues={user || {}}
          onSubmit={async data => {
            setLoading(true);
            setError(null);
            try {
              const res = await apiUpdateUserService(data);
              if (res?.status === 'SUCCESS') {
                // Cập nhật lại profile sau khi update thành công
                const updated = await apiGetUserProfile(userId);
                setUser(updated?.data);
                setOpenEditModal(false);
              } else {
                setError(res?.message || 'Update failed');
              }
            } catch (err) {
              setError(err?.message || 'Update failed');
            } finally {
              setLoading(false);
            }
          }}
        />
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        {/* Stats Row */}
        <div className="flex items-center justify-center py-4 border-b border-gray-100">
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user?.followersCount || 0}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user?.followingCount || 0}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="flex gap-8">
            {[
              { id: "posts", label: "Posts", icon: Camera },
              { id: "albums", label: "Albums", icon: Bookmark },
              { id: "reviews", label: "Reviews", icon: MessageSquare },
              { id: "trips", label: "Trips", icon: Globe },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`group relative flex items-center gap-2 py-4 px-4 border-b-2 transition-all duration-300 hover:scale-105 ${activeTab === id
                  ? "border-blue-500 text-blue-600 bg-blue-50/50"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                  }`}
              >
                <Icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
                <span className="font-medium">{label}</span>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeTab === id
                    ? "bg-gradient-to-r from-blue-100/50 to-blue-200/50"
                    : "bg-gradient-to-r from-gray-100/50 to-gray-200/50"
                    }`}
                ></div>

                {/* Active indicator with animation */}
                {activeTab === id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        {userId === currentUserId && <PostCreateModal setCreateSuccess={setCreateSuccess} />}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex w-full gap-8">
          {/* Posts Gallery */}
          <div className="flex-1 w-full">
            <div className="w-full space-y-6">
              {posts.length === 0 && !loading ? (
                <div className="py-12 text-center">
                  <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No posts yet</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostModal
                    key={post.postId}
                    postId={post.postId}
                    avatar={user?.avatarImg || avatardf}
                    userName={`${user?.userProfile?.firstName || ''} ${user?.userProfile?.lastName || ''}`.trim() || 'Unknown User'}
                    location={post.location}
                    timeAgo={formatTimeAgo(post.createdAt)}
                    content={post.content}
                    // Lấy ảnh đầu tiên từ mediaList hoặc null
                    image={post.mediaList?.find(media => media.type === 'IMAGE')?.url || null}
                    // Lấy video đầu tiên từ mediaList hoặc null
                    video={post.mediaList?.find(media => media.type === 'VIDEO')?.url || null}
                    // Truyền toàn bộ mediaList nếu PostModal hỗ trợ
                    mediaList={post.mediaList || []}
                    likeCount={post.likeCount || 0}
                    commentCount={post.commentCount || 0}
                    shareCount={post.shareCount || 0}
                    tags={post.tags || []}
                    isShare={post.isShare}
                    status={post.status}
                    comments={[]} // Sẽ được load từ API khác
                    onShare={() => {
                      // Handle share logic
                      console.log('Share post:', post.postId);
                    }}
                    onLike={() => {
                      // Handle like logic
                      console.log('Like post:', post.postId);
                    }}
                    onComment={() => {
                      // Handle comment logic
                      console.log('Comment on post:', post.postId);
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar - có thể thêm sau */}
          {/* <div className="w-80">
            
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default UserPage;