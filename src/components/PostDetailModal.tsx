import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, X, Bookmark } from "lucide-react"; // Suppression de MessageSquare et Share
import VideoPlayer from './VideoPlayer';

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

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleBookmark: (postId: number) => void;
}

const PostDetailModal = ({ post, isOpen, onClose, onToggleBookmark }: PostDetailModalProps) => {
  const [isLikedInModal, setIsLikedInModal] = useState(false);
  const [currentLikesInModal, setCurrentLikesInModal] = useState(0);

  useEffect(() => {
    if (post) {
      setIsLikedInModal(false); 
      setCurrentLikesInModal(post.likes);
    }
  }, [post]);

  if (!post) return null;

  const handleLikeInModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLikedInModal(!isLikedInModal);
    setCurrentLikesInModal(isLikedInModal ? currentLikesInModal - 1 : currentLikesInModal + 1);
  };

  const handleBookmarkInModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(post.id);
  };
  
  const videoJsOptions = useMemo(() => ({
    autoplay: true,
    loop: true,
    controls: true,
    fluid: true,
    sources: [{
        src: post.content,
        type: 'video/mp4'
    }]
  }), [post.content]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px] p-0 overflow-hidden dark:bg-gray-900">
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.avatar} alt={post.creator} />
              <AvatarFallback>{post.creator.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-base font-semibold dark:text-gray-100">{post.creator}</DialogTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
            </div>
          </div>
          <DialogClose asChild>
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </DialogClose>
        </DialogHeader>
        
        <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800">
            <VideoPlayer options={videoJsOptions} className="w-full h-full" />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
                <button onClick={handleLikeInModal} className="flex items-center space-x-1 focus:outline-none group">
                <Heart className={`w-6 h-6 group-hover:text-red-400 ${isLikedInModal ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                </button>
            </div>
            <button onClick={handleBookmarkInModal} className="flex items-center space-x-1 focus:outline-none group">
                <Bookmark className={`w-6 h-6 group-hover:text-yellow-400 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600 dark:text-gray-400'}`} />
            </button>
          </div>

          {currentLikesInModal > 0 && (
            <p className="text-sm font-semibold dark:text-gray-200">{currentLikesInModal} likes</p>
          )}
          
          <p className="text-sm dark:text-gray-300">
            <span className="font-semibold dark:text-gray-100">{post.creator}</span>{' '}
            {post.caption}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
