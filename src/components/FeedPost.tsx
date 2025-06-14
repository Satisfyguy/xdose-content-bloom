import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Bookmark } from "lucide-react"; // Suppression de MessageSquare et Share
import VideoPlayer from './VideoPlayer';
import type { PlayerOptions } from 'video.js';

// Interface Post mise à jour
interface Post {
  id: number;
  creator: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  caption: string;
  isSubscribed: boolean;
  isPremium: boolean;
  isBookmarked: boolean;
}

interface FeedPostProps {
  post: Post;
  variant: 'large' | 'small';
  onToggleBookmark: (postId: number) => void;
  onPostClick: (post: Post) => void;
}

const FeedPost = ({ post, variant, onToggleBookmark, onPostClick }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);

  useEffect(() => {
    setCurrentLikes(post.likes);
  }, [post.likes, post.id]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(post.id);
  };

  const handlePostClick = () => {
    onPostClick(post);
  }

  const imageAspectRatio = variant === 'large' ? 'aspect-video' : 'aspect-square';
  const iconSize = variant === 'large' ? 'w-5 h-5' : 'w-4 h-4';
  const actionButtonSpace = variant === 'large' ? 'space-x-4' : 'space-x-3';
  const textClass = variant === 'large' ? 'text-sm' : 'text-xs';

  const videoJsOptions = useMemo((): PlayerOptions => ({
    autoplay: false,
    muted: true,
    loop: false,
    playsinline: true,
    controls: false,
    preload: 'metadata',
    fluid: true,
    sources: [{
      src: post.content,
      type: 'video/mp4'
    }]
  }), [post.content]);

  return (
    <div className="w-full">
      <div
        className={`w-full ${imageAspectRatio} rounded-xl bg-gray-200 dark:bg-gray-700 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
        onClick={handlePostClick}
      >
        <VideoPlayer options={videoJsOptions} isPlaying={false} className="w-full h-full" />
      </div>
      <div className="mt-2 px-1">
        {variant === 'large' ? (
          <>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{post.creator}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
              </div>
               <button onClick={handleBookmarkClick} className="focus:outline-none p-1 group">
                <Bookmark className={`${iconSize} group-hover:text-yellow-400 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600 dark:text-gray-400'}`} />
              </button>
            </div>
            <div className={`flex items-center ${actionButtonSpace} text-gray-600 dark:text-gray-400`}>
              <button onClick={handleLikeClick} className="flex items-center space-x-1.5 focus:outline-none group">
                <Heart className={`${iconSize} group-hover:text-red-400 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                <span className={`${textClass} font-medium`}>{currentLikes}</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mt-1">
                <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">{post.creator}</h3>
                <button onClick={handleBookmarkClick} className="focus:outline-none p-0.5 group">
                    <Bookmark className={`${iconSize} group-hover:text-yellow-400 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600 dark:text-gray-400'}`} />
                </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{post.timeAgo}</p>
            <div className={`flex items-center ${actionButtonSpace} text-gray-600 dark:text-gray-400`}>
              <button onClick={handleLikeClick} className="flex items-center space-x-1 focus:outline-none group">
                <Heart className={`${iconSize} group-hover:text-red-400 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                <span className={`${textClass} font-medium`}>{currentLikes}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedPost;
