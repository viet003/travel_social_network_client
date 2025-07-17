import React from 'react'
import { PostModal, PostCreateModal } from '../components';

const HomePage = () => {
  return (
    <>
      {/* Create Post */}
      <PostCreateModal />

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
      <PostModal
        avatar="https://randomuser.me/api/portraits/women/44.jpg"
        userName="Sarah Parker"
        location="Santorini, Greece"
        timeAgo="2 hours ago"
        content="Just wrapped up an amazing week in Santorini! The sunsets here are absolutely incredible. Every day felt like a postcard come to life. The white architecture and blue domes never get old!"
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        likeCount={234}
        commentCount={2}
        comments={[
          {
            avatar: "https://randomuser.me/api/portraits/women/45.jpg",
            userName: "Emma Wilson",
            text: "The views look breathtaking! Need to plan a trip here soon."
          },
          {
            avatar: "https://randomuser.me/api/portraits/men/46.jpg",
            userName: "Michael Chen",
            text: "Santorini never disappoints! Great recommendations."
          }
        ]}
        onShare={() => {}}
      />
      {/* Post 2 */}
      <PostModal
        avatar="https://randomuser.me/api/portraits/men/47.jpg"
        userName="David Thompson"
        location="Bali, Indonesia"
        timeAgo="5 hours ago"
        content="Found this hidden gem in Ubud. The traditional architecture and peaceful atmosphere make you feel miles away from the tourist crowds. Perfect spot for meditation and reflection."
        image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
        likeCount={156}
        commentCount={1}
        comments={[
          {
            avatar: "https://randomuser.me/api/portraits/women/48.jpg",
            userName: "Lisa Chen",
            text: "Ubud is such a special place! Love the traditional architecture here."
          }
        ]}
        onShare={() => {}}
      />
    </>
  );
}

export default HomePage
