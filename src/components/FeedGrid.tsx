import React from 'react';
import FeedPost from "@/components/FeedPost";
import FeedPostSkeleton from "@/components/FeedPostSkeleton";
import type { Post, SortOption } from '@/types'; // SortOption might be needed for the "no posts" message

interface FeedGridProps {
  posts: Post[];
  isLoading: boolean;
  onToggleBookmark: (postId: number) => void;
  showOnlyBookmarked: boolean; // To customize the "no posts" message
  sortOption: SortOption; // To customize the "no posts" message
}

const FeedGrid: React.FC<FeedGridProps> = ({
  posts,
  isLoading,
  onToggleBookmark,
  showOnlyBookmarked,
  sortOption,
}) => {
  const mainPost = posts.length > 0 ? posts[0] : null;
  const smallPosts = posts.slice(1);

  return (
    <main className="max-w-md mx-auto px-4 sm:px-6 pb-0"> {/* pb-24 was here, moved to Index.tsx */}
      {/* Skeletons for initial loading */}
      {isLoading && posts.length === 0 && (
        <>
          <FeedPostSkeleton variant="large" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <FeedPostSkeleton variant="small" />
            <FeedPostSkeleton variant="small" />
          </div>
        </>
      )}
      
      {/* Main post display */}
      {mainPost && (
        <div className="mb-6">
          <FeedPost 
            post={mainPost} 
            variant="large" 
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      )}

      {/* Small posts display */}
      {(smallPosts.length > 0 || (isLoading && posts.length > 0)) && (
        <div className="grid grid-cols-2 gap-4">
          {smallPosts.map((post) => (
            <FeedPost 
              key={post.id} 
              post={post} 
              variant="small" 
              onToggleBookmark={onToggleBookmark}
            />
          ))}
          {/* Skeletons for infinite scroll loading */}
          {isLoading && posts.length > 0 && ( 
            <>
              <FeedPostSkeleton variant="small" />
              <FeedPostSkeleton variant="small" />
            </>
          )}
        </div>
      )}
      
      {/* No posts message */}
      {!isLoading && posts.length === 0 && (
         <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          {showOnlyBookmarked ? "Aucun post en favori." : "Aucun post pour le moment."}
          {/* This part of the message might need adjustment based on video context */}
          {/* {sortOption === "popular" && !showOnlyBookmarked && " Triez par popularité."} */}
        </p>
      )}
    </main>
  );
};

export default FeedGrid;
