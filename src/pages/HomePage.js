import React from 'react';
import { SidebarLeft, SidebarRight } from '../components';

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Sidebar Left */}
      <SidebarLeft className="fixed top-0 left-0"/>

      {/* Main Feed */}
      <main className="flex flex-col items-center flex-1 px-2 py-8 md:px-8">
        <div className="w-full max-w-2xl">
          {/* Create Post */}
          <div className="flex items-center gap-3 p-4 mb-6 bg-white shadow rounded-xl">
            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="avatar" className="object-cover w-10 h-10 rounded-full" />
            <input className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none" placeholder="Share your travel story..." />
            <button className="flex items-center gap-1 px-3 py-1 font-medium text-blue-600 rounded bg-blue-50 hover:bg-blue-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.5 8.5l7 7" /></svg>
              Photo
            </button>
            <button className="flex items-center gap-1 px-3 py-1 font-medium text-blue-600 rounded bg-blue-50 hover:bg-blue-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657A8 8 0 013.343 2.343a8 8 0 0111.314 11.314z" /></svg>
              Location
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">All Posts</button>
              <button className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">Friends</button>
              <button className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">Groups</button>
            </div>
            <div className="text-sm font-medium text-gray-500">Most Recent</div>
          </div>

          {/* Post 1 */}
          <div className="p-4 mb-6 bg-white shadow rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="object-cover w-10 h-10 rounded-full" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">Sarah Parker</span>
                  <span className="text-xs text-gray-500">• Santorini, Greece</span>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
              </div>
              <div className="ml-auto">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="6" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="18" r="1.5" /></svg>
                </button>
              </div>
            </div>
            <div className="mb-3 text-gray-700">
              Just wrapped up an amazing week in Santorini! The sunsets here are absolutely incredible. Every day felt like a postcard come to life. The white architecture and blue domes never get old!
            </div>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Santorini" className="object-cover w-full mb-3 rounded-xl" />
            <div className="flex items-center gap-6 mb-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-2-2-2 2m0 6l2 2 2-2" /></svg>
                234
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h-6a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
                2
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="avatar" className="object-cover rounded-full w-7 h-7" />
                <span className="font-semibold text-gray-700">Emma Wilson</span>
                <span className="text-gray-500">The views look breathtaking! Need to plan a trip here soon.</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="avatar" className="object-cover rounded-full w-7 h-7" />
                <span className="font-semibold text-gray-700">Michael Chen</span>
                <span className="text-gray-500">Santorini never disappoints! Great recommendations.</span>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12v.01M12 12v.01M20 12v.01" /></svg>
                Share
              </button>
            </div>
          </div>

          {/* Post 2 */}
          <div className="p-4 mb-6 bg-white shadow rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="avatar" className="object-cover w-10 h-10 rounded-full" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">David Thompson</span>
                  <span className="text-xs text-gray-500">• Bali, Indonesia</span>
                  <span className="text-xs text-gray-400">5 hours ago</span>
                </div>
              </div>
              <div className="ml-auto">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="6" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="18" r="1.5" /></svg>
                </button>
              </div>
            </div>
            <div className="mb-3 text-gray-700">
              Found this hidden gem in Ubud. The traditional architecture and peaceful atmosphere make you feel miles away from the tourist crowds. Perfect spot for meditation and reflection.
            </div>
            <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80" alt="Ubud" className="object-cover w-full mb-3 rounded-xl" />
            <div className="flex items-center gap-6 mb-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-2-2-2 2m0 6l2 2 2-2" /></svg>
                156
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h-6a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
                1
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <img src="https://randomuser.me/api/portraits/women/48.jpg" alt="avatar" className="object-cover rounded-full w-7 h-7" />
                <span className="font-semibold text-gray-700">Lisa Chen</span>
                <span className="text-gray-500">Ubud is such a special place! Love the traditional architecture here.</span>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12v.01M12 12v.01M20 12v.01" /></svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sidebar Right */}
      <SidebarRight className="fixed top-0 left-0"/>
    </div>
  );
};

export default HomePage;
