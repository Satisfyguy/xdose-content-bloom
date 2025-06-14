
import React, { useState } from 'react';
import { useFeedData } from '@/hooks/useFeedData';
import FeedHeader from '@/components/FeedHeader';
import FeedGrid from '@/components/FeedGrid';
import NavigationBar from "@/components/NavigationBar";
import PostDetailModal from "@/components/PostDetailModal";
import type { Post, SortOption } from '@/types';

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
    handleToggleBookmark: handleToggleBookmarkFromHook,
  } = useFeedData("recent", false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleToggleBookmark = (postId: number) => {
    handleToggleBookmarkFromHook(postId);
    // If the currently selected post in the modal is the one being bookmarked, update its state
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prevSelectedPost => 
        prevSelectedPost ? { ...prevSelectedPost, isBookmarked: !prevSelectedPost.isBookmarked } : null
      );
    }
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
          onPostClick={handleOpenModal}
          onToggleBookmark={handleToggleBookmark}
          showOnlyBookmarked={showOnlyBookmarked}
          sortOption={sortOption}
        />

        {/* Load more indicator */}
        {hasMore && !isLoading && <div ref={loadMoreRef} className="h-10 max-w-md mx-auto px-4 sm:px-6" />}

        {/* Loading message during infinite scroll */}
        {isLoading && hasMore && posts.length > 0 && ( 
          <div className="text-center py-4 max-w-md mx-auto px-4 sm:px-6">
            <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
          </div>
        )}
      </div>

      <NavigationBar />

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onToggleBookmark={handleToggleBookmark} // Pass the updated handler
        />
      )}
    </div>
  );
};

export default Index;
