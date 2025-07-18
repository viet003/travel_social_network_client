import React, { useState } from 'react';
import { MoreHorizontal, MessageCircle } from 'lucide-react';

const Notification = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const comments = [
    {
      id: 1,
      author: "Nguyen Thu Huyen",
      content: "invited you to join the public group",
      groupName: "Math Materials THCS",
      time: "2 days ago",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      hasGroupIcon: true
    },
    {
      id: 2,
      author: "Nguyen Thu Huyen",
      content: "invited you to join the public group",
      groupName: "Math Materials THCS",
      time: "2 days ago",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      hasGroupIcon: true
    },
    {
      id: 3,
      author: "Nguyen Thu Huyen",
      content: "invited you to join the public group",
      groupName: "Math Materials THCS",
      time: "2 days ago",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      hasGroupIcon: true
    },
    {
      id: 4,
      author: "Nguyen Thu Huyen",
      content: "invited you to join the public group",
      groupName: "Math Materials THCS",
      time: "2 days ago",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      hasGroupIcon: true
    }
  ];

  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          <button className="p-1 rounded hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex p-1 mt-4 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'unread'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Earlier</span>
          <button className="text-sm text-blue-500 hover:text-blue-600">
            View all
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="p-3 rounded-lg bg-gray-50">
              <div className="flex items-start gap-3">
                {/* Avatar with group icon */}
                <div className="relative">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  {comment.hasGroupIcon && (
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full -bottom-1 -right-1">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-1 text-sm text-gray-800">
                    <span className="font-semibold">{comment.author}</span> {comment.content}{' '}
                    <span className="font-semibold text-gray-900">{comment.groupName}</span>.
                  </div>
                  <div className="mb-3 text-xs text-gray-500">{comment.time}</div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">
                      Join
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md hover:bg-gray-300">
                      Delete
                    </button>
                  </div>
                </div>

                {/* More options */}
                <button className="p-1 rounded hover:bg-gray-200">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              {/* Blue notification dot */}
              <div className="absolute right-2 top-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;