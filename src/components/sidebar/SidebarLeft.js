import React, { useState } from 'react'
import { BiHomeHeart } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { PiStripeLogo } from "react-icons/pi";
import { CiSaveDown1 } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { pathDomain } from './../../utilities/pathDomain';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../stores/types/actionTypes';
import { stateAction } from '../../stores/actions';

const SidebarLeft = () => {

    const { userId } = useSelector(state => state.auth)
    const { tabActive } = useSelector(state => state.sidebar_tab_active)
    const dispatch = useDispatch();
    
    // State for search dropdown
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleTabClick = (tabType) => {
        dispatch(stateAction.changeState(tabType));
    };

    // Mock recent searches data
    const recentSearches = [
        { id: 1, name: 'Santorini, Greece', type: 'destination', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80' },
        { id: 2, name: 'Nguyen Van A', type: 'person', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
        { id: 3, name: 'Tokyo Travel Guide', type: 'post', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80' },
        { id: 4, name: 'Bali Adventure', type: 'destination', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80' },
        { id: 5, name: 'Tran Thi B', type: 'person', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b13c?auto=format&fit=crop&w=400&q=80' },
    ];

    const removeRecentSearch = (id) => {
        // Handle remove recent search logic here
        console.log('Remove search:', id);
    };

    return (
        <div className='fixed top-0 left-0 h-screen overflow-y-auto z-3 scrollbar-hide'>
            <aside className="flex-col hidden min-h-screen px-6 py-6 bg-white border-r w-80 xl:flex">
                <Link to={pathDomain.HOME} className="flex items-center gap-2 mb-2 ">
                    <MdOutlineExplore className="text-blue-600 w-7 h-7" />
                    <span className="text-2xl font-bold text-blue-600">TravelNest</span>
                </Link>

                {/* Search Block with Dropdown */}
                <div className="relative mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search destinations, people, posts..."
                            className="w-full px-4 py-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                        />
                        <svg
                            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Search Dropdown */}
                    {isSearchFocused && (
                        <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-full max-h-80">
                            <div className="p-3 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-blue-800">Recent</h4>
                                    <button 
                                        onClick={() => setIsSearchFocused(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <IoMdClose className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="py-2">
                                {recentSearches.map((item) => (
                                    <div key={item.id} className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 group">
                                        <div className="flex-shrink-0 mr-3">
                                            {item.type === 'person' ? (
                                                <img 
                                                    src={item.avatar} 
                                                    alt={item.name}
                                                    className="object-cover w-8 h-8 rounded-full"
                                                />
                                            ) : (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="object-cover w-8 h-8 rounded-md"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {item.type}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeRecentSearch(item.id);
                                            }}
                                            className="p-1 text-gray-400 transition-opacity opacity-0 group-hover:opacity-100 hover:text-gray-600"
                                        >
                                            <IoMdClose className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
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
                        className={`${tabActive === actionTypes.HOME_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg    hover:bg-gray-100`}
                        onClick={() => handleTabClick(actionTypes.HOME_ACTIVE)}
                    >
                        <BiHomeHeart className="w-5 h-5" />
                        Home Feed
                    </Link>

                    <Link
                        to={pathDomain.EXPLORE}
                        className={`${tabActive === actionTypes.EXPLORE_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg     hover:bg-gray-100`}
                        onClick={() => handleTabClick(actionTypes.EXPLORE_ACTIVE)}
                    >
                        <MdOutlineExplore className="w-5 h-5" />
                        Explore
                    </Link>

                    <Link
                        to={pathDomain.MY_TRIPS}
                        className={`${tabActive === actionTypes.MYTRIPS_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg     hover:bg-gray-100`}
                        onClick={() => handleTabClick(actionTypes.MYTRIPS_ACTIVE)}
                    >
                        <PiStripeLogo className="w-5 h-5" />
                        My Trips
                    </Link>

                    <Link
                        to={pathDomain.SAVED_PLACES}
                        className={`${tabActive === actionTypes.SAVEPLACE_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg   hover:bg-gray-100`}
                        onClick={() => handleTabClick(actionTypes.SAVEPLACE_ACTIVE)}
                    >
                        <CiSaveDown1 className="w-5 h-5" />
                        Saved Places
                    </Link>

                    <Link
                        to={pathDomain.MESSAGES}
                        className={`${tabActive === actionTypes.MESSAGE_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg     hover:bg-gray-100`}
                        onClick={() => handleTabClick(actionTypes.MESSAGE_ACTIVE)}
                    >
                        <TiMessages className="w-5 h-5" />
                        Messages
                    </Link>

                    <Link
                        to={`user/${userId}`}
                        className={`${tabActive === actionTypes.PROFILE_ACTIVE ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700 bg-white"} flex items-center gap-3 px-3 py-2 rounded-lg     hover:bg-gray-100`}
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
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80" alt="Santorini" className="object-cover w-6 h-6 rounded-md" />
                            Santorini, Greece
                        </button>
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80" alt="Bali" className="object-cover w-6 h-6 rounded-md" />
                            Bali, Indonesia
                        </button>
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=400&q=80" alt="Machu Picchu" className="object-cover w-6 h-6 rounded-md" />
                            Machu Picchu, Peru
                        </button>
                        <button className="flex items-center w-full gap-2 px-3 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-100">
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