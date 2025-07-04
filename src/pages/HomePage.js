import React from 'react';

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Left */}
      <aside className="flex-col hidden min-h-screen px-6 py-6 bg-white border-r w-80 lg:flex">
        <a href="#" className="mb-2">
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
          <a href="#" className="flex items-center gap-3 px-3 py-2 font-semibold text-blue-600 rounded-lg bg-blue-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2h14z" /></svg>
            Home Feed
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4m-6-8a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
            Explore
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 010 7.75" /></svg>
            My Trips
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Saved Places
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 21l-5-5-5 5" /></svg>
            Messages
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a4 4 0 014-4h0a4 4 0 014 4v2" /></svg>
            Profile
          </a>
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
      <aside className="flex-col hidden min-h-screen px-6 py-8 border-l w-80 xl:flex bg-gray-50">
        {/* User Profile */}
        <div className="pb-6 mb-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="avatar" className="object-cover w-12 h-12 rounded-full" />
            <button className="flex-1 text-left">
              <div className="font-semibold text-gray-800 text-md">Sarah Johnson</div>
              <div className="text-xs text-gray-500">Travel Enthusiast</div>
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v7.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 17.25V9.75a6 6 0 00-6-6z" />
              </svg>
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
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
      </aside>
    </div>
  );
};

export default HomePage;
