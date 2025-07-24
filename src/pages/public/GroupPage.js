import { useState, useEffect, useRef, useCallback } from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { Search, Grid3X3, List, Users, Lock, Globe, X, MapPin, User } from 'lucide-react';
import GroupCreateModal from '../../components/modal/group/GroupCreateModal';
import { apiGetAllGroupsByName } from '../../services/groupService';
import { toast } from 'react-toastify';
import { LoadingSpinner } from "../../components"; // Import LoadingSpinner
import { useNavigate } from 'react-router-dom';
import { pathDomain } from '../../utilities/pathDomain';

const GroupPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [groups, setGroups] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // Input hiển thị
  const [searchQuery, setSearchQuery] = useState(''); // Query thực tế để search
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentGroups, setRecentGroups] = useState([]);
  const [privacyFilter, setPrivacyFilter] = useState('all');
  const searchInputRef = useRef(null);
  const observer = useRef();
  const navigate = useNavigate();

  // Mock data cho recent searches với format JSON chuẩn
  const [recentSearches] = useState([]);

  // Hàm callback để theo dõi group cuối cùng
  const lastGroupElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { rootMargin: '100px' }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Hàm tải groups với phân trang
  const fetchGroups = async (keyword = '', pageNum = 0, privacy = 'all') => {
    setLoading(true);
    try {
      // Nếu đang tìm kiếm thì luôn truyền privacy='all'
      const effectivePrivacy = keyword && keyword.trim().length > 0 ? 'all' : privacy;
      const res = await apiGetAllGroupsByName(keyword, effectivePrivacy, pageNum);
      const newGroups = res?.data?.content || [];

      if (pageNum === 0) {
        setGroups(newGroups);
      } else {
        setGroups((prevGroups) => [...prevGroups, ...newGroups]);
      }

      setTotalElements(res?.data?.totalElements || 0);
      setHasMore(newGroups.length > 0 && (res?.data?.totalElements || 0) > (pageNum + 1) * (res?.data?.size || 10));
    } catch (err) {
      console.error("Error fetching groups:", err);
      toast.error(err?.message || 'Lỗi khi tải danh sách group!');
    } finally {
      setLoading(false);
    }
  };

  // Load recent groups khi component mount
  useEffect(() => {
    const loadRecentGroups = async () => {
      try {
        const res = await apiGetAllGroupsByName('', 'all', 0);
        setRecentGroups(res?.data?.content?.slice(0, 6) || []);
      } catch (err) {
        setRecentGroups([]);
      }
    };
    loadRecentGroups();
  }, []);

  // Debounce search for suggestions (chỉ cho dropdown)
  useEffect(() => {
    if (searchInput.length === 0) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        // Khi tìm kiếm suggestion, luôn truyền privacy='all'
        const res = await apiGetAllGroupsByName(searchInput, 'all', 0);
        setSuggestions(res?.data?.content?.slice(0, 4) || []); // Giảm xuống 4 để có chỗ cho recent
      } catch (err) {
        setSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tải groups khi page thay đổi
  useEffect(() => {
    if (!hasMore && page > 0) return;
    // Nếu đang tìm kiếm thì privacy='all', còn lại mới dùng privacyFilter
    const effectivePrivacy = searchQuery && searchQuery.trim().length > 0 ? 'all' : privacyFilter;
    fetchGroups(searchQuery, page, effectivePrivacy);
  }, [page, privacyFilter]);

  // Đặt lại page khi searchQuery hoặc privacyFilter thay đổi
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    // Nếu đang tìm kiếm thì privacy='all', còn lại mới dùng privacyFilter
    const effectivePrivacy = searchQuery && searchQuery.trim().length > 0 ? 'all' : privacyFilter;
    fetchGroups(searchQuery, 0, effectivePrivacy);
  }, [searchQuery, privacyFilter]);

  // Khi searchInput thay đổi, nếu có giá trị thì reset filter về 'all'
  useEffect(() => {
    if (searchInput && searchInput.trim().length > 0 && privacyFilter !== 'all') {
      setPrivacyFilter('all');
    }
  }, [searchInput]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (item) => {
    const searchTerm = item.groupName;
    setSearchInput(searchTerm);
    setSearchQuery(searchTerm);
    setShowSuggestions(false);
  };

  const handleClearRecent = () => {
    // Có thể implement logic xóa recent searches
    console.log('Clear recent searches');
  };

  const handleGroupCreated = () => {
    setPage(0);
    setHasMore(true);
    // Nếu đang tìm kiếm thì privacy='all', còn lại mới dùng privacyFilter
    const effectivePrivacy = searchQuery && searchQuery.trim().length > 0 ? 'all' : privacyFilter;
    fetchGroups(searchQuery, 0, effectivePrivacy);
  };

  const renderSuggestionItem = (item, isRecent = false) => {
    const getIconForType = (searchType) => {
      switch (searchType) {
        case 'person':
          return <User className="w-4 h-4 text-gray-500" />;
        case 'destination':
          return <MapPin className="w-4 h-4 text-gray-500" />;
        case 'post':
          return <span className="text-sm">📝</span>;
        default:
          return <Users className="w-4 h-4 text-blue-600" />;
      }
    };

    return (
      <li
        key={item.groupId}
        className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
        onClick={() => handleSuggestionClick(item)}
      >
        <div className="flex items-center justify-center w-8 h-8 mr-3 overflow-hidden bg-gray-100 rounded-full">
          {item.searchType === 'person' || item.coverImageUrl ? (
            <img
              src={item.coverImageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
              alt=""
              className="object-cover w-8 h-8 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              {getIconForType(item.searchType || 'group')}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">{item.groupName}</div>
          <div className="text-xs text-gray-500 capitalize">
            {item.searchType || item.groupDescription || 'Group'}
          </div>
        </div>
        {!isRecent && (
          <div className="ml-2">
            {item.privacy ? (
              <Lock className="w-3 h-3 text-gray-400" />
            ) : (
              <Globe className="w-3 h-3 text-gray-400" />
            )}
          </div>
        )}
      </li>
    );
  };

  const renderGroupCard = (group, index, isLast = false) => {
    const handleCardClick = () => {
      navigate(pathDomain.GROUP_DETAIL.replace(':groupId', group.groupId));
    };
    const cardContent = (
      <button
        type="button"
        onClick={handleCardClick}
        className="group w-full overflow-hidden text-left transition-all duration-200 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
        tabIndex={0}
      >
        {/* Cover Image with gradient overlay */}
        <div className="relative h-48 md:h-56 bg-center bg-cover rounded-t-3xl">
          <img
            src={group.coverImageUrl || 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=200&fit=crop'}
            alt={group.groupName}
            className="object-cover w-full h-full rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-t-3xl"></div>
          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-md mb-1 truncate">{group.groupName}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-200 drop-shadow">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{group.memberCount?.toLocaleString() || 0} members</span>
                <span className="flex items-center gap-1">
                  {group.privacy ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  {group.privacy ? 'Private' : 'Global'}
                </span>
              </div>
            </div>
            {group.isMember && (
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full shadow-md">Joined</span>
            )}
          </div>
        </div>
        {/* Description */}
        <div className="p-4">
          <p className="mb-0 text-gray-700 text-sm line-clamp-2 min-h-[2.5em]">{group.groupDescription || "No description available"}</p>
        </div>
      </button>
    );
    // Gắn ref vào group cuối cùng để theo dõi infinite scroll
    if (isLast) {
      return (
        <div key={group.groupId} ref={lastGroupElementRef}>
          {cardContent}
        </div>
      );
    }
    return (
      <div key={group.groupId}>
        {cardContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-[670px]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center text-blue-600">
              <MdOutlineExplore className="w-10 h-10 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">Group</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-sm mx-6" ref={searchInputRef}>
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search destinations, people, posts"
                  className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearchSubmit}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 150);
                  }}
                />

                {/* Dropdown Suggestions */}
                {showSuggestions && (
                  <div className="absolute z-20 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-80">
                    {/* Recent Section */}
                    {searchInput.length === 0 && recentSearches.length > 0 && (
                      <>
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-blue-600">Recent</span>
                          <button
                            onClick={handleClearRecent}
                            className="text-xs text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <ul>
                          {recentSearches.map((item) => renderSuggestionItem(item, true))}
                        </ul>
                      </>
                    )}

                    {/* Search Results */}
                    {searchInput.length > 0 && suggestions.length > 0 && (
                      <ul>
                        {suggestions.map((group) => renderSuggestionItem(group, false))}
                      </ul>
                    )}

                    {/* No results */}
                    {searchInput.length > 0 && suggestions.length === 0 && (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <div className="text-sm">No results found</div>
                        <div className="mt-1 text-xs text-gray-400">Try searching for something else</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <GroupCreateModal onSuccess={handleGroupCreated} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl px-4 py-6 mx-auto w-[670px]">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex items-center p-1 bg-white border border-gray-200 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
                  }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Privacy Filter */}
            <select
              className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={privacyFilter}
              onChange={(e) => setPrivacyFilter(e.target.value)}
            >
              <option value="all">All Groups</option>
              <option value="public">Public Groups</option>
              <option value="private">Private Groups</option>
            </select>
          </div>

          {/* Total count */}
          <div className="text-sm text-gray-500">
            {groups.length} of {totalElements} groups found
          </div>
        </div>

        {/* Loading cho trang đầu tiên */}
        {loading && page === 0 && (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}

        {/* Groups Grid */}
        {!loading || page > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {groups.length === 0 && !loading ? (
              <div className="col-span-2 py-10 text-center text-gray-400">
                Không có nhóm nào phù hợp.
              </div>
            ) : (
              groups.map((group, index) =>
                renderGroupCard(group, index, groups.length === index + 1)
              )
            )}
          </div>
        ) : null}

        {/* Hiển thị spinner khi tải thêm groups (không phải trang đầu) */}
        {loading && page > 0 && (
          <div className="flex items-center justify-center w-full py-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Hiển thị thông báo khi không còn groups để tải */}
        {!hasMore && groups.length > 0 && (
          <div className="py-8 text-center text-gray-500">
            No more groups to load
          </div>
        )}
      </main>
    </div>
  );
};

export default GroupPage;