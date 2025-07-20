import React, { useEffect, useState, useRef, useCallback } from 'react';
import { PostModal, PostCreateModal } from '../../components';
import { apiGetAllPostByStatus } from '../../services/postService';
import { toast } from 'react-toastify';
import avatardf from "../../assets/images/avatardf.jpg";
import LoadingPage from '../component/LoadingPage';
import { LoadingSpinner } from "../../components";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Lưu hàm vào memory để tối ưu hiệu suất, chỉ tạo lại khi `loading` hoặc `hasMore` thay đổi
  const lastPostElementRef = useCallback(
    (node) => {
      // Thoát sớm nếu đang tải dữ liệu hoặc không còn bài viết để tải
      if (loading || !hasMore) return;

      // Ngắt kết nối observer cũ (nếu có) để tránh theo dõi nhiều phần tử cùng lúc
      if (observer.current) observer.current.disconnect();

      // Tạo IntersectionObserver mới để theo dõi sự hiển thị của phần tử cuối
      observer.current = new IntersectionObserver((entries) => {
        // Kiểm tra nếu phần tử cuối hiển thị trong khung nhìn và còn bài viết để tải
        if (entries[0].isIntersecting && hasMore) {
          // Tăng số trang để kích hoạt gọi API tải thêm bài viết
          setPage((prevPage) => prevPage + 1);
        }
      });

      // Nếu phần tử DOM tồn tại, bắt đầu theo dõi nó bằng observer
      if (node) observer.current.observe(node);
    },
    // Mảng phụ thuộc: hàm chỉ tạo lại khi `loading` hoặc `hasMore` thay đổi
    [loading, hasMore]
  );

  const fetchPostsData = async (pageNum) => {
    setLoading(true);
    try {
      const postResponse = await apiGetAllPostByStatus(pageNum);
      const newPosts = postResponse?.data?.content || [];

      if (pageNum === 0) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }

      // Check if there are more posts to load
      setHasMore(newPosts.length > 0);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Lỗi khi tải dữ liệu bài viết!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchPostsData(page);
    }
  }, [page]);

  return (
    <>
      {/* Create Post */}
      <PostCreateModal location="home"/>

      {loading && page === 0 && <LoadingPage />}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-4 w-[550px] my-3">
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">All Posts</button>
          <button className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">Friends</button>
          <button className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">Groups</button>
        </div>
        <div className="text-sm font-medium text-gray-500">Most Recent</div>
      </div>

      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div key={post.postId} ref={lastPostElementRef}>
              <PostModal
                userId={post?.userId}
                postId={post.postId}
                avatar={post.avatarImg || avatardf}
                userName={`${post.firstName || ''} ${post.lastName || ''}`.trim() || 'Unknown User'}
                location={post.location}
                timeAgo={post.createdAt}
                content={post.content}
                image={post.mediaList?.find(media => media.type === 'IMAGE')?.url || null}
                video={post.mediaList?.find(media => media.type === 'VIDEO')?.url || null}
                mediaList={post.mediaList || []}
                likeCount={post.likeCount || 0}
                commentCount={post.commentCount || 0}
                shareCount={post.shareCount || 0}
                tags={post.tags || []}
                isShare={post.isShare}
                status={post.status}
                comments={[]}
                onShare={() => {
                  console.log('Share post:', post.postId);
                }}
                onLike={() => {
                  console.log('Like post:', post.postId);
                }}
                onComment={() => {
                  console.log('Comment on post:', post.postId);
                }}
              />
            </div>
          );
        }
        return (
          <PostModal
            key={post.postId}
            userId={post?.userId}
            postId={post.postId}
            avatar={post.avatarImg || avatardf}
            userName={`${post.firstName || ''} ${post.lastName || ''}`.trim() || 'Unknown User'}
            location={post.location}
            timeAgo={post.createdAt}
            content={post.content}
            image={post.mediaList?.find(media => media.type === 'IMAGE')?.url || null}
            video={post.mediaList?.find(media => media.type === 'VIDEO')?.url || null}
            mediaList={post.mediaList || []}
            likeCount={post.likeCount || 0}
            commentCount={post.commentCount || 0}
            shareCount={post.shareCount || 0}
            tags={post.tags || []}
            isShare={post.isShare}
            status={post.status}
            comments={[]}
            onShare={() => {
              console.log('Share post:', post.postId);
            }}
            onLike={() => {
              console.log('Like post:', post.postId);
            }}
            onComment={() => {
              console.log('Comment on post:', post.postId);
            }}
          />
        );
      })}

      {loading && page > 0 && (
        <div className="flex items-center justify-center w-full">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default HomePage;