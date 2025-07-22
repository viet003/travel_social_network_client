import { useState } from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { Search, Grid3X3, List, Users } from 'lucide-react';
import GroupCreateModal from '../../components/modal/group/GroupCreateModal';

const GroupPage = () => {
  const [viewMode, setViewMode] = useState('grid');

  const travelGroups = [
    {
      id: 1,
      title: "Asia Backpackers",
      description: "Connect with fellow backpackers exploring Asia. Share tips, experiences, and make friends along the way!",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=200&fit=crop",
      members: 1234,
      messages: 89,
      likes: 45,
      status: "Active",
      type: "Public",
      featured: false
    },
    {
      id: 2,
      title: "European Adventure",
      description: "Join our community of European travelers. Plan trips, share stories, and discover hidden gems across the continent.",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=200&fit=crop",
      members: 856,
      messages: 67,
      likes: 32,
      status: "Active",
      type: "Public",
      featured: true
    },
    {
      id: 3,
      title: "Adventure Seekers",
      description: "For thrill-seekers and adventure enthusiasts. From hiking to extreme sports, we've got you covered!",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      members: 2156,
      messages: 156,
      likes: 89,
      status: "Active",
      type: "Public",
      featured: false
    },
    {
      id: 4,
      title: "Solo Travelers",
      description: "A supportive community for solo travelers. Share experiences, get advice, and find travel buddies.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop",
      members: 1567,
      messages: 123,
      likes: 67,
      status: "Active",
      type: "Public",
      featured: false
    },
    {
      id: 5,
      title: "Photography Tours",
      description: "Join our photography-focused tours and workshops. Perfect for both beginners and experienced shooters.",
      image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400&h=200&fit=crop",
      members: 789,
      messages: 94,
      likes: 34,
      status: "Active",
      type: "Public",
      featured: false
    },
    {
      id: 6,
      title: "Luxury Travel Club",
      description: "Exclusive group for luxury travel enthusiasts. Discover high-end destinations and experiences.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=200&fit=crop",
      members: 432,
      messages: 56,
      likes: 23,
      status: "Private",
      type: "Private",
      featured: false
    }
  ];

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
            <div className="flex-1 max-w-sm mx-6">
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search travel groups..."
                  className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <GroupCreateModal />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl px-4 py-6 mx-auto">
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

            {/* Filter */}
            <select className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All Groups</option>
              <option>Public Groups</option>
              <option>Private Groups</option>
              <option>Featured</option>
            </select>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {travelGroups.map((group) => (
            <div
              key={group.id}
              className="overflow-hidden transition-shadow duration-200 bg-white border border-gray-100 rounded-xl hover:shadow-lg"
            >
              {/* Image with overlay content */}
              <div className="relative h-48">
                <img
                  src={group.image}
                  alt={group.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{group.title}</h3>
                    {group.featured && (
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <span>📍</span>
                      <span>Global</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{group.members.toLocaleString()} members</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="mb-4 text-sm text-gray-600">{group.description}</p>

                {/* Join Button */}
                <button className="w-full py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  Join Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GroupPage;