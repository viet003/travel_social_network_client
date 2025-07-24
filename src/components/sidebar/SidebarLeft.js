import { useState, useRef, useEffect } from 'react'
import { BiHomeHeart } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { PiStripeLogo } from "react-icons/pi";
import { MdGroups } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { Search, User, MapPin, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { pathDomain } from './../../utilities/pathDomain';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../stores/types/actionTypes';
import { tabAction } from '../../stores/actions';
import { apiFindAllUserByKeyword } from '../../services/userService';

const SidebarLeft = () => {

    const { userId } = useSelector(state => state.auth)
    const { tab_active } = useSelector(state => state.tab_active)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State for search dropdown
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const searchInputRef = useRef(null);

    const handleTabClick = (tabType) => {
        dispatch(tabAction.tabAction(tabType));
    };

    // Debounced search effect
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setSearchError(null);
            return;
        }
        
        setIsLoading(true);
        setSearchError(null);
        
        const delayDebounce = setTimeout(async () => {
            try {
                const response = await apiFindAllUserByKeyword(searchQuery);
                
                // Handle the new API response structure
                if (response?.status === "SUCCESS" && response?.data?.content) {
                    setSearchResults(response.data.content);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSearchError('Đã xảy ra lỗi khi tìm kiếm.');
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 400);
        
        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // State for recent searches - can be populated from localStorage or API
    const [recentSearches, setRecentSearches] = useState([]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim()) {
                navigate(`${pathDomain.SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
                setIsSearchFocused(false);
            }
        }
    };

    const handleSuggestionClick = (item) => {
        // Close dropdown first
        setIsSearchFocused(false);
        
        // Add to recent searches if it's a user result from API
        if (item.userName) {
            addToRecentSearches(item);
        }
        
        // Navigate to user profile - use userName as the route parameter
        const userIdentifier = item.userId || item.userName;
        if (userIdentifier) {
            navigate(pathDomain.USER.replace(':userId', userIdentifier));
        }
    };

    const handleClearRecent = () => {
        setRecentSearches([]);
        // Can also clear from localStorage if implemented
        // localStorage.removeItem('recentSearches');
    };

    const addToRecentSearches = (user) => {
        const fullName = `${user.userProfile?.firstName || ''} ${user.userProfile?.lastName || ''}`.trim() || user.userName || 'Unknown User';
        
        setRecentSearches(prev => {
            const newItem = {
                id: Date.now(),
                name: fullName,
                searchType: 'person',
                avatar: user.avatarImg,
                userName: user.userName,
                userId: user.userId || user.userName // Use userName as fallback if no userId
            };
            const filtered = prev.filter(search => search.userName !== user.userName);
            return [newItem, ...filtered].slice(0, 5); // Keep only 5 recent searches
        });
    };

    const getIconForType = (searchType) => {
        switch (searchType) {
            case 'person':
                return <User className="w-4 h-4 text-gray-500" />;
            case 'destination':
                return <MapPin className="w-4 h-4 text-gray-500" />;
            case 'post':
                return <span className="text-sm">📝</span>;
            default:
                return <User className="w-4 h-4 text-gray-500" />;
        }
    };

    const renderSuggestionItem = (item, isRecent = false) => {
        // Handle both API users and recent search items
        let displayName, userIdentifier, displayAvatar;
        
        if (isRecent) {
            displayName = item.name;
            userIdentifier = item.userId;
            displayAvatar = item.avatar;
        } else {
            // For API users, get name from userProfile
            const firstName = item.userProfile?.firstName || '';
            const lastName = item.userProfile?.lastName || '';
            displayName = `${firstName} ${lastName}`.trim() || item.userName || 'Unknown User';
            userIdentifier = item.userId || item.userName;
            displayAvatar = item.avatarImg;
        }

        return (
            <li
                key={isRecent ? item.id : item.userName}
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 group"
                onClick={() => handleSuggestionClick(item)}
            >
                <div className="flex items-center justify-center w-8 h-8 mr-3 overflow-hidden bg-gray-100 rounded-full">
                    {displayAvatar ? (
                        <img
                            src={displayAvatar}
                            alt={displayName}
                            className="object-cover w-8 h-8 rounded-full"
                            onError={(e) => {
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <User className="w-4 h-4 text-gray-500" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{displayName}</div>
                    <div className="text-xs text-gray-500 truncate">
                        @{isRecent ? (item.userName || '') : (item.userName || 'username')}
                    </div>
                </div>
                {isRecent && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setRecentSearches(prev => prev.filter(search => search.id !== item.id));
                        }}
                        className="p-1 text-gray-400 transition-opacity opacity-0 group-hover:opacity-100 hover:text-gray-600"
                    >
                        <IoMdClose className="w-4 h-4" />
                    </button>
                )}
            </li>
        );
    };

    return (
        <div className='fixed top-0 left-0 h-screen overflow-y-auto z-3 scrollbar-hide'>
            <aside className="flex-col hidden min-h-screen px-6 py-6 bg-white border-r w-80 xl:flex">
                <Link to={pathDomain.HOME} className="flex items-center gap-2 mb-2 ">
                    <MdOutlineExplore className="text-blue-600 w-7 h-7" />
                    <span className="text-2xl font-bold text-blue-600">TravelNest</span>
                </Link>

                {/* Search Block with Enhanced Dropdown */}
                <div className="relative mb-6" ref={searchInputRef}>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search destinations, people, posts..."
                            className="w-full px-4 py-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleSearchSubmit}
                            onFocus={() => setIsSearchFocused(true)}
                        />
                    </div>

                    {/* Enhanced Search Dropdown */}
                    {isSearchFocused && (
                        <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-full max-h-80">
                            {/* Recent Section */}
                            {searchQuery.length === 0 && recentSearches.length > 0 && (
                                <>
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                                        <span className="text-sm font-medium text-blue-600">Recent</span>
                                        <button
                                            onClick={handleClearRecent}
                                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <ul className="group">
                                        {recentSearches.map((item) => renderSuggestionItem(item, true))}
                                    </ul>
                                </>
                            )}

                            {/* Search Results Section */}
                            {searchQuery.length > 0 && (
                                <>
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <span className="text-sm font-medium text-blue-600">Search results</span>
                                    </div>
                                    <div className="py-2">
                                        {isLoading && (
                                            <div className="px-4 py-3 text-center">
                                                <div className="text-sm text-gray-500">Searching...</div>
                                            </div>
                                        )}
                                        
                                        {searchError && (
                                            <div className="px-4 py-3 text-center">
                                                <div className="text-sm text-red-500">{searchError}</div>
                                            </div>
                                        )}
                                        
                                        {!isLoading && !searchError && searchResults.length === 0 && (
                                            <div className="px-4 py-8 text-center text-gray-500">
                                                <div className="text-base font-medium text-gray-600 mb-1">No results found</div>
                                                <div className="text-sm text-gray-400">Try searching for something else</div>
                                            </div>
                                        )}
                                        
                                        {!isLoading && !searchError && searchResults.length > 0 && (
                                            <ul>
                                                {searchResults.map((user) => renderSuggestionItem(user, false))}
                                            </ul>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Overlay to close dropdown when clicking outside */}
                    {isSearchFocused && (
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsSearchFocused(false)}
                        />
                    )}
                </div>

                <hr className="mb-8 border-gray-200" />
                <nav className="flex flex-col gap-2 mb-8">
                    <Link
                        to={pathDomain.HOME}
                        className={`${tab_active === actionTypes.HOME_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150`}
                        onClick={() => handleTabClick(actionTypes.HOME_ACTIVE)}
                    >
                        <BiHomeHeart className="w-5 h-5" />
                        Home Feed
                    </Link>

                    <Link
                        to={pathDomain.EXPLORE}
                        className={`${tab_active === actionTypes.EXPLORE_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150`}
                        onClick={() => handleTabClick(actionTypes.EXPLORE_ACTIVE)}
                    >
                        <MdOutlineExplore className="w-5 h-5" />
                        Explore
                    </Link>

                    <Link
                        to={pathDomain.MY_TRIPS}
                        className={`${tab_active === actionTypes.MYTRIPS_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150`}
                        onClick={() => handleTabClick(actionTypes.MYTRIPS_ACTIVE)}
                    >
                        <PiStripeLogo className="w-5 h-5" />
                        My Trips
                    </Link>

                    <Link
                        to={pathDomain.GROUP}
                        className={`${tab_active === actionTypes.GROUP_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150`}
                        onClick={() => handleTabClick(actionTypes.GROUP_ACTIVE)}
                    >
                        <MdGroups className='w-5 h-5' />
                        Group
                    </Link>

                    <Link
                        to={pathDomain.MESSAGES}
                        className={`${tab_active === actionTypes.MESSAGE_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150`}
                        onClick={() => handleTabClick(actionTypes.MESSAGE_ACTIVE)}
                    >
                        <TiMessages className="w-5 h-5" />
                        Messages
                    </Link>

                    <Link
                        to={`user/${userId}`}
                        className={`${tab_active === actionTypes.PROFILE_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150`}
                        onClick={() => handleTabClick(actionTypes.PROFILE_ACTIVE)}
                    >
                        <CgProfile className="w-5 h-5" />
                        Profile
                    </Link>
                </nav>
                
                <hr className="mb-8 border-gray-200" />
                
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-700">Popular Right Now</h3>
                    <ul className="space-y-2">
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                            <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80" alt="Santorini" className="object-cover w-6 h-6 rounded-md" />
                            Santorini, Greece
                        </button>
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                            <img src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80" alt="Bali" className="object-cover w-6 h-6 rounded-md" />
                            Bali, Indonesia
                        </button>
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                            <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=400&q=80" alt="Machu Picchu" className="object-cover w-6 h-6 rounded-md" />
                            Machu Picchu, Peru
                        </button>
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80" alt="Tokyo" className="object-cover w-6 h-6 rounded-md" />
                            Tokyo, Japan
                        </button>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default SidebarLeft