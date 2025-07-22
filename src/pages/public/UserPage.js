import React, { useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";
import { PostModal, EditProfileModal, PostCreateModal } from '../../components';
import { apiGetUserProfile, apiUpdateUserImgService, apiUpdateUserService } from '../../services/userService';
import { apiGeAllPostByUser } from '../../services/postService';
import { useDispatch } from "react-redux";
import { authAction } from '../../stores/actions';
import { useSelector } from "react-redux";
import avatardf from '../../assets/images/avatardf.jpg';
import { toast } from 'react-toastify';
import { LoadingSpinner } from "../../components"; // Nhập LoadingSpinner để hiển thị khi tải thêm bài viết

const UserPage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // Trạng thái để theo dõi số trang
  const [totalElements, setTotalElements] = useState(0)
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn bài viết để tải
  const inputAvatarRef = useRef();
  const inputCoverRef = useRef();
  const { userId: currentUserId } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const observer = useRef(); // Lưu trữ Intersection Observer

  // Hàm callback để theo dõi bài viết cuối cùng
  const lastPostElementRef = useCallback(
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

  // Hàm tải thông tin hồ sơ người dùng
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userProfileResponse = await apiGetUserProfile(userId);
      console.log("User profile data:", userProfileResponse);
      setUser(userProfileResponse?.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error("Lỗi khi tải dữ liệu người dùng!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm tải bài viết của người dùng, hỗ trợ phân trang
  const fetchUserPosts = async (pageNum) => {
    setLoading(true);
    try {
      const userPostsResponse = await apiGeAllPostByUser(userId, pageNum);
      console.log("User posts data:", userPostsResponse);
      const newPosts = userPostsResponse?.data?.content || [];
      if (pageNum === 0) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
      setTotalElements(userPostsResponse?.data?.totalElements)
      setHasMore(newPosts.length > 0);
    } catch (err) {
      console.error("Error fetching user posts:", err);
      toast.error("Lỗi khi tải bài viết!");
    } finally {
      setLoading(false);
    }
  };

  // Tải hồ sơ người dùng khi userId thay đổi
  useEffect(() => {
    console.log("userId", userId);
    if (!userId) return;
    fetchUserData();
  }, [userId]);

  // Tải bài viết khi page hoặc userId thay đổi
  useEffect(() => {
    if (!userId || !hasMore) return;
    fetchUserPosts(page);
  }, [userId, page]);

  // Đặt lại page khi userId thay đổi
  useEffect(() => {
    setPage(0);
    setHasMore(true);
  }, [userId]);

  // Tải lại bài viết khi tạo bài viết mới thành công
  useEffect(() => {
    if (createSuccess) {
      fetchUserPosts(0);
      setPage(0);
      setHasMore(true);
      setCreateSuccess(false);
    }
  }, [createSuccess]);

  // Hàm cập nhật ảnh đại diện hoặc ảnh bìa
  const handleUpdateImg = async (file, type) => {
    if (!file || !userId) return;
    try {
      setLoading(true);
      const formData = new FormData();
      type === "avatar" ? formData.append('avatarImg', file) : formData.append('coverImg', file);
      const rs = await apiUpdateUserImgService(formData);
      if (rs?.status === "SUCCESS") {
        switch (type) {
          case "avatar":
            dispatch(authAction.updateAvatarImg(rs?.data?.avatarImg));
            setUser((prev) => ({
              ...prev,
              avatarImg: rs?.data?.avatarImg,
            }));
            break;
          default:
            dispatch(authAction.updateCoverImg(rs?.data?.coverImg));
            setUser((prev) => ({
              ...prev,
              coverImg: rs?.data?.coverImg,
            }));
            break;
        }
      }
    } catch (err) {
      toast.error("Cập nhật ảnh thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm cập nhật hồ sơ người dùng
  const apiUpdateUserProfile = async (data) => {
    setLoading(true);
    try {
      const res = await apiUpdateUserService(data);
      if (res?.status === 'SUCCESS') {
        setUser((prev) => ({
          ...prev,
          userProfile: res?.data?.userProfile,
        }));
        setOpenEditModal(false);
      } else {
        toast.error(res?.message || 'Cập nhật thông tin thất bại!');
      }
    } catch (err) {
      toast.error("Cập nhật thông tin thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden h-96 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-blue-600 min-w-[670px]">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('${user?.coverImg || "/placeholder.svg?height=400&width=1200&text=Beach+Sunset"}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <div className="absolute flex gap-3 top-6 right-6">
          {currentUserId !== userId && (
            <>
              <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60">
                <UserPlus size={20} />
              </button>
              <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60">
                <MessageCircle size={20} />
              </button>
            </>
          )}
          {userId === currentUserId && (
            <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60" onClick={() => setOpenEditModal(true)}>
              <Edit3 size={20} />
            </button>
          )}
          <button className="p-3 text-white transition rounded-full bg-black/40 hover:bg-black/60">
            <Share2 size={20} />
          </button>
        </div>
        {userId === currentUserId && (
          <div className="absolute z-30 flex items-center gap-2 top-6 left-6">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={inputCoverRef}
              onChange={(e) => {
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
        <div className="absolute max-w-lg p-6 text-white bottom-6 left-6 bg-black/40 backdrop-blur-md rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="relative cursor-pointer group">
              <img
                src={user?.avatarImg || avatardf}
                alt="Profile"
                className="w-20 h-20 transition-all duration-300 border-4 rounded-full shadow-lg border-white/30 hover:shadow-xl group-hover:scale-105"
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={inputAvatarRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleUpdateImg(e.target.files[0], "avatar");
                  }
                }}
              />
              {userId === currentUserId && (
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
              )}
              <div className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md -bottom-1 -right-1">
                <CheckCircle className="w-4 h-4 text-blue-500" />
              </div>
              <div className="absolute inset-0 transition-opacity duration-300 border-2 rounded-full opacity-0 border-white/50 group-hover:opacity-100 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h1 className="mb-1 text-2xl font-bold">{user?.userProfile?.firstName} {user?.userProfile?.lastName}</h1>
              {user?.userProfile?.location && (
                <div className="flex items-center gap-1 mb-2 text-white/80">
                  <MapPin size={14} />
                  <span className="text-sm">{user?.userProfile?.location}</span>
                </div>
              )}
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                {user?.userProfile?.bio || "Adventure seeker | Travel photographer | 35 countries"}
              </p>
            </div>
          </div>
        </div>
        <EditProfileModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          initialValues={user || {}}
          onSubmit={apiUpdateUserProfile}
        />
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-center py-4 border-b border-gray-100">
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalElements || 0}</div>
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
                <div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeTab === id
                    ? "bg-gradient-to-r from-blue-100/50 to-blue-200/50"
                    : "bg-gradient-to-r from-gray-100/50 to-gray-200/50"
                    }`}
                ></div>
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
        {userId === currentUserId && <PostCreateModal setCreateSuccess={setCreateSuccess} location="user"/>}

        {loading && page === 0 && (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}

        <div className="flex w-full gap-8">
          <div className="flex-1 w-full">
            <div className="w-full space-y-6">
              {posts.length === 0 && !loading ? (
                <div className="py-12 text-center">
                  <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No posts yet</p>
                </div>
              ) : (
                posts.map((post, index) => {
                  // Gắn ref vào bài viết cuối cùng để theo dõi
                  if (posts.length === index + 1) {
                    return (
                      <div key={post?.postId} ref={lastPostElementRef}>
                        <PostModal
                          postId={post?.postId}
                          userId={post?.userId}
                          avatar={post?.avatarImg || avatardf}
                          userName={`${post?.firstName || ''} ${post?.lastName || ''}`.trim() || 'Unknown User'}
                          location={post?.location}
                          timeAgo={post?.createdAt}
                          content={post?.content}
                          image={post?.mediaList?.find(media => media.type === 'IMAGE')?.url || null}
                          video={post?.mediaList?.find(media => media.type === 'VIDEO')?.url || null}
                          mediaList={post?.mediaList || []}
                          likeCount={post?.likeCount || 0}
                          commentCount={post?.commentCount || 0}
                          shareCount={post?.shareCount || 0}
                          tags={post?.tags || []}
                          isShare={post?.isShare}
                          status={post?.status}
                          comments={[]}
                          onShare={() => {
                            console.log('Share post:', post?.postId);
                          }}
                          onLike={() => {
                            console.log('Like post:', post?.postId);
                          }}
                          onComment={() => {
                            console.log('Comment on post:', post?.postId);
                          }}
                        />
                      </div>
                    );
                  }
                  return (
                    <PostModal
                      key={post?.postId}
                      postId={post?.postId}
                      userId={post?.userId}
                      avatar={post?.avatarImg || avatardf}
                      userName={`${post?.firstName || ''} ${post?.lastName || ''}`.trim() || 'Unknown User'}
                      location={post?.location}
                      timeAgo={post?.createdAt}
                      content={post?.content}
                      image={post?.mediaList?.find(media => media.type === 'IMAGE')?.url || null}
                      video={post?.mediaList?.find(media => media.type === 'VIDEO')?.url || null}
                      mediaList={post?.mediaList || []}
                      likeCount={post?.likeCount || 0}
                      commentCount={post?.commentCount || 0}
                      shareCount={post?.shareCount || 0}
                      tags={post?.tags || []}
                      isShare={post?.isShare}
                      status={post?.status}
                      comments={[]}
                      onShare={() => {
                        console.log('Share post:', post?.postId);
                      }}
                      onLike={() => {
                        console.log('Like post:', post?.postId);
                      }}
                      onComment={() => {
                        console.log('Comment on post:', post?.postId);
                      }}
                    />
                  );
                })
              )}
            </div>
            {/* Hiển thị spinner khi tải thêm bài viết (không phải trang đầu) */}
            {loading && page > 0 && (
              <div className="flex items-center justify-center w-full py-8">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;