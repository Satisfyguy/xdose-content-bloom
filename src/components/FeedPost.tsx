
import React from 'react';
import { Heart } from "lucide-react";

// Post interface definition from original file might be here or imported
interface Post {
  id: number;
  creator: string;
  avatar: string; // Kept for data integrity, though not displayed in this version
  timeAgo: string;
  content: string; // This is the image URL for the post
  likes: number;
  caption: string; // Kept for data integrity
  isSubscribed: boolean; // Kept for data integrity
  isPremium: boolean; // Kept for data integrity
}

interface FeedPostProps {
  post: Post;
  variant: 'large' | 'small';
}

const FeedPost = ({ post, variant }: FeedPostProps) => {
  const imageAspectRatio = variant === 'large' ? 'aspect-video' : 'aspect-square';

  return (
    <div className="w-full">
      <img 
        src={post.content} 
        alt={`Post by ${post.creator}`} 
        className={`w-full ${imageAspectRatio} object-cover rounded-xl bg-gray-200 dark:bg-gray-700`} // Added bg for loading state
      />
      <div className="mt-2 px-1"> {/* Added slight horizontal padding for text */}
        {variant === 'large' ? (
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{post.creator}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
            </div>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">{post.likes}</span>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">{post.creator}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPost;
