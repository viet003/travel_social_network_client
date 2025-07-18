import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { authAction, stateAction } from '../../stores/actions';
import { useNavigate } from 'react-router-dom';
import avatardf from '../../assets/images/avatardf.jpg'
import actionTypes from '../../stores/types/actionTypes';

const SidebarRight = () => {

    const dispatch = useDispatch();
    const { lastName, userId, avatar } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    return (
        <aside className="fixed top-0 right-0 h-screen overflow-y-auto">
            <div className="flex-col hidden min-h-screen px-6 py-8 border-l w-80 xl:flex bg-gray-50">
                {/* User Profile */}
                <div className="pb-6 mb-8 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={`${avatar !== null ? avatar : avatardf}`} alt="avatar" className="object-cover w-12 h-12 rounded-full" />
                        <button className="flex-1 text-left"
                            onClick={() => {
                                navigate(`/user/${userId}`);
                                dispatch(stateAction.changeState(actionTypes.PROFILE_ACTIVE));
                            }}
                        >
                            <div className="font-semibold text-gray-800 text-md">Hi, {lastName} </div>
                            <div className="text-xs text-gray-500">Travel Enthusiast</div>
                        </button>
                        {/* tạo dropdown khi nhấn vào giống ảnh */}
                        <button className="relative p-2 text-gray-400 hover:text-gray-600">
                            <IoMdNotificationsOutline className="w-7 h-7" />
                            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
                        </button>
                        {/* Logout Button */}
                        <button className="p-2 text-gray-400 hover:text-red-500" title="Logout"
                            onClick={() => dispatch(authAction.logout())}
                        >
                            <IoIosLogOut className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                {/* Friends List */}
                <div className="pb-6 mb-8 border-b border-gray-200">
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">My Friends</h3>
                    <ul className="space-y-2">
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="avatar" className="object-cover w-10 h-10 rounded-full" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Mike Chen</div>
                                <div className="text-xs text-green-500">Online</div>
                            </div>
                        </button>
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="avatar" className="object-cover w-10 h-10 rounded-full" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Emma Wilson</div>
                                <div className="text-xs text-gray-500">Last seen 2h ago</div>
                            </div>
                        </button>
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="avatar" className="object-cover w-10 h-10 rounded-full" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Alex Rodriguez</div>
                                <div className="text-xs text-green-500">Online</div>
                            </div>
                        </button>
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="avatar" className="object-cover w-10 h-10 rounded-full" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Jessica Kim</div>
                                <div className="text-xs text-gray-500">Last seen 1d ago</div>
                            </div>
                        </button>
                    </ul>
                </div>

                {/* Suggested Groups */}
                <div className="pb-6 mb-8 border-b border-gray-200">
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">Suggested Groups</h3>
                    <ul className="space-y-2">
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80" alt="Adventure Seekers" className="object-cover w-10 h-10 rounded-lg" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Adventure Seekers</div>
                                <div className="text-xs text-gray-500">2.5k members</div>
                            </div>
                        </button>
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80" alt="Budget Travelers" className="object-cover w-10 h-10 rounded-lg" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Budget Travelers</div>
                                <div className="text-xs text-gray-500">1.8k members</div>
                            </div>
                        </button>
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" alt="Solo Female Travelers" className="object-cover w-10 h-10 rounded-lg" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Solo Female Travelers</div>
                                <div className="text-xs text-gray-500">3.2k members</div>
                            </div>
                        </button>
                    </ul>
                </div>

                {/* Discover Places */}
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">Discover Places</h3>
                    <ul className="space-y-2">
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Paris" className="object-cover w-10 h-10 rounded-lg" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Paris, France</div>
                                <div className="text-xs text-gray-500">Explore top attractions</div>
                            </div>
                        </button>
                        <button className="flex items-center w-full gap-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Barcelona" className="object-cover w-10 h-10 rounded-lg" />
                            <div>
                                <div className="text-sm font-semibold text-gray-800">Barcelona, Spain</div>
                                <div className="text-xs text-gray-500">Explore top attractions</div>
                            </div>
                        </button>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default SidebarRight
