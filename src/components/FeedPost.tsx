
import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Share, Bookmark } from "lucide-react"; // Ajout de Bookmark

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
  isBookmarked: boolean; // Ajout de isBookmarked
}

interface FeedPostProps {
  post: Post;
  variant: 'large' | 'small';
  onPostClick: (post: Post) => void;
  onToggleBookmark: (postId: number) => void; // Nouvelle prop pour gérer le favori
}

const FeedPost = ({ post, variant, onPostClick, onToggleBookmark }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  // L'état isBookmarked est maintenant géré par le parent (Index.tsx) via post.isBookmarked

  // Synchroniser l'état local des likes si le post change (bien que 'likes' ne soit pas censé changer dynamiquement ici)
  useEffect(() => {
    setCurrentLikes(post.likes);
    // setIsLiked(false); // Potentiellement réinitialiser si on veut que le like soit propre au post et non persistant localement
  }, [post.likes, post.id]);


  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Bouton Commenter cliqué pour le post:", post.id);
    onPostClick(post); 
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Bouton Partager cliqué pour le post:", post.id);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(post.id); // Appeler la fonction passée en prop
  };

  const imageAspectRatio = variant === 'large' ? 'aspect-video' : 'aspect-square';
  const iconSize = variant === 'large' ? 'w-5 h-5' : 'w-4 h-4';
  const actionButtonSpace = variant === 'large' ? 'space-x-4' : 'space-x-3';
  const textClass = variant === 'large' ? 'text-sm' : 'text-xs';

  return (
    <div className="w-full">
      <img 
        src={post.content} 
        alt={`Post by ${post.creator}`} 
        loading="lazy"
        className={`w-full ${imageAspectRatio} object-cover rounded-xl bg-gray-200 dark:bg-gray-700 cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={() => onPostClick(post)}
      />
      <div className="mt-2 px-1">
        {variant === 'large' ? (
          <>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{post.creator}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
              </div>
               {/* Espace pour le bouton bookmark à droite si design souhaité */}
               <button onClick={handleBookmarkClick} className="focus:outline-none p-1 group">
                <Bookmark className={`${iconSize} group-hover:text-yellow-400 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600 dark:text-gray-400'}`} />
              </button>
            </div>
            <div className={`flex items-center ${actionButtonSpace} text-gray-600 dark:text-gray-400`}>
              <button onClick={handleLikeClick} className="flex items-center space-x-1.5 focus:outline-none group">
                <Heart className={`${iconSize} group-hover:text-red-400 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                <span className={`${textClass} font-medium`}>{currentLikes}</span>
              </button>
              <button onClick={handleCommentClick} className="flex items-center space-x-1.5 focus:outline-none group">
                <MessageSquare className={`${iconSize} text-gray-600 dark:text-gray-400 group-hover:text-blue-400`} />
              </button>
              <button onClick={handleShareClick} className="flex items-center space-x-1.5 focus:outline-none group">
                <Share className={`${iconSize} text-gray-600 dark:text-gray-400 group-hover:text-green-400`} />
              </button>
              {/* Bouton Bookmark déplacé en haut à droite pour la variante large */}
            </div>
          </>
        ) : ( // Variante Small
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
              <button onClick={handleCommentClick} className="flex items-center space-x-1 focus:outline-none group">
                <MessageSquare className={`${iconSize} text-gray-600 dark:text-gray-400 group-hover:text-blue-400`} />
              </button>
              <button onClick={handleShareClick} className="flex items-center space-x-1 focus:outline-none group">
                <Share className={`${iconSize} text-gray-600 dark:text-gray-400 group-hover:text-green-400`} />
              </button>
               {/* Bouton Bookmark déplacé en haut à droite pour la variante small */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedPost;
