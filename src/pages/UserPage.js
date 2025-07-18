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
  Calendar,
  Heart,
  MessageSquare,
  Bookmark,
  UserPlus,
} from "lucide-react"
import { PostModal, EditProfileModal, PostCreateModal } from '../components';
import { apiGetUserProfile, apiUpdateUserImgService, apiUpdateUserService } from '../services/userService';
import { useDispatch } from "react-redux";
import { authAction } from '../stores/actions';
import { useSelector } from "react-redux";
import avatardf from '../assets/images/avatardf.jpg';



const travelPhotos = [
  { id: 1, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", location: "Santorini" },
  { id: 2, src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80", location: "Bali" },
  { id: 3, src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80", location: "Paris" },
  // { id: 4, src: "/placeholder.svg?height=300&width=400", location: "NYC Skyline", category: "cityscape" },
  // { id: 5, src: "/placeholder.svg?height=450&width=400", location: "Tuscany Countryside", category: "landscape" },
  // { id: 6, src: "/placeholder.svg?height=300&width=400", location: "Serene Lake", category: "nature" },
  // { id: 7, src: "/placeholder.svg?height=400&width=400", location: "Tokyo Market", category: "cultural" },
  // { id: 8, src: "/placeholder.svg?height=350&width=400", location: "Sahara Desert", category: "adventure" },
  // { id: 9, src: "/placeholder.svg?height=300&width=400", location: "Coral Reef", category: "underwater" },
]

const UserPage = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts")
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputAvatarRef = useRef();
  const inputCoverRef = useRef();
  const { userId: currentUserId } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    console.log("userId", userId);
    if (!userId) return;
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGetUserProfile(userId);
        console.log(data)
        setUser(data?.data);
      } catch (err) {
        setError(err?.message || 'Error fetching user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdateImg = async (file, type) => {
    if (!file || !userId) return;
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      // formData.append('userId', userId);
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
                Adventure seeker | Travel photographer | 35 countries 
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
              <div className="text-2xl font-bold text-gray-900">248</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">12.4K</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">892</div>
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
        <PostCreateModal />
        <div className="flex gap-8">
          {/* Photo Gallery */}
          <div className="flex-1">
            <div className="">
              {travelPhotos.map((photo) => (
                <PostModal
                  key={photo.id}
                  avatar="https://randomuser.me/api/portraits/men/47.jpg" // hoặc lấy từ user nếu có
                  userName="Demo User"
                  location={photo.location}
                  timeAgo="1 hour ago"
                  content="Check out this amazing place!"
                  image={photo.src || "/placeholder.svg"}
                  likeCount={124}
                  commentCount={23}
                  comments={[
                    {
                      avatar: "https://randomuser.me/api/portraits/women/48.jpg",
                      userName: "Lisa Chen",
                      text: "Wow, looks great!"
                    }
                  ]}
                  onShare={() => { }}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
        </div>
      </div>
    </div>
  )
}

export default UserPage;