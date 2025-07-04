import React from 'react'
import { BiHomeHeart } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { PiStripeLogo } from "react-icons/pi";
import { CiSaveDown1 } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";



const SidebarLeft = () => {
    return (
        <aside className="flex-col hidden min-h-screen px-6 py-6 bg-white border-r w-80 lg:flex">
            <a href="#" className="flex items-center gap-2 mb-2 ">
                <MdOutlineExplore className="text-blue-600 w-7 h-7"   />
                <span className="text-2xl font-bold text-blue-600">TravelNest</span>
            </a>

            {/* Search Block */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search destinations, people, posts..."
                        className="w-full px-4 py-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            </div>
            <hr className="mb-8 border-gray-200" />
            <nav className="flex flex-col gap-2 mb-8">
                <button className="flex items-center gap-3 px-3 py-2 font-semibold text-blue-600 rounded-lg bg-blue-50">
                    <BiHomeHeart className="w-5 h-5" />
                    Home Feed
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                    <MdOutlineExplore className="w-5 h-5" />
                    Explore
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                    <PiStripeLogo className="w-5 h-5" />
                    My Trips
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                    <CiSaveDown1 className="w-5 h-5" />
                    Saved Places
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                    <TiMessages className="w-5 h-5" />
                    Messages
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                    <CgProfile className="w-5 h-5" />
                    Profile
                </button>
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
    )
}

export default SidebarLeft
