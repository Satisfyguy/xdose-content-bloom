import React, { useState } from 'react';
import { useFeedData } from '@/hooks/useFeedData';
import FeedHeader from '@/components/FeedHeader';
import FeedGrid from '@/components/FeedGrid';
import NavigationBar from "@/components/NavigationBar";
import type { Post } from '@/types';
import PostDetailModal from '@/components/PostDetailModal';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const {
    posts,
    isLoading,
    hasMore,
    loadMoreRef,
    showOnlyBookmarked,
    setShowOnlyBookmarked,
    sortOption,
    setSortOption,
    handleToggleBookmark,
  } = useFeedData("recent", false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return null;
  if (!user) return null;

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <FeedHeader
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
        showOnlyBookmarked={showOnlyBookmarked}
        onShowOnlyBookmarkedChange={setShowOnlyBookmarked}
      />

      <div className="pb-24"> {/* Added pb-24 here to ensure space for NavigationBar */}
        <FeedGrid
          posts={posts}
          isLoading={isLoading}
          onToggleBookmark={handleToggleBookmark}
          showOnlyBookmarked={showOnlyBookmarked}
          sortOption={sortOption}
          onPostClick={handlePostClick}
        />

        {/* Load more indicator */}
        {hasMore && !isLoading && <div ref={loadMoreRef} className="h-10 max-w-md mx-auto px-4 sm:px-6" />}

        {/* Loading message during infinite scroll */}
        {isLoading && hasMore && posts.length > 0 && ( 
          <div className="text-center py-4 max-w-md mx-auto px-4 sm:px-6">
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        )}
      </div>

      <NavigationBar />

      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Index;
