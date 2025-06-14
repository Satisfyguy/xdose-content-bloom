import React, { useState } from 'react';
import { Heart, MessageSquare, Share } from "lucide-react";

// Assurez-vous que cette interface correspond à celle utilisée ailleurs
interface Post {
  id: number;
  creator: string;
  avatar: string;
  timeAgo: string;
  content: string; // URL de l'image
  likes: number;
  caption: string;
  isSubscribed: boolean;
  isPremium: boolean;
}

interface FeedPostProps {
  post: Post;
  variant: 'large' | 'small';
  onPostClick: (post: Post) => void; // Pour ouvrir le modal
}

const FeedPost = ({ post, variant, onPostClick }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  // const { toast } = useToast(); // Décommentez si vous voulez utiliser les toasts pour les actions

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le déclenchement de onPostClick
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
    // toast({ title: isLiked ? "Unlike" : "Like", description: `Post ${isLiked ? "unliked" : "liked"}!` });
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Bouton Commenter cliqué pour le post:", post.id);
    // Ouvre également le modal de détail pour l'instant, simulant l'accès aux commentaires via le post
    onPostClick(post); 
    // toast({ title: "Commentaires", description: "Ouverture des détails du post..." });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Bouton Partager cliqué pour le post:", post.id);
    // toast({ title: "Partager", description: "Fonctionnalité de partage à implémenter." });
  };

  const imageAspectRatio = variant === 'large' ? 'aspect-video' : 'aspect-square';

  return (
    <div className="w-full">
      <img 
        src={post.content} 
        alt={`Post by ${post.creator}`} 
        loading="lazy" // Added lazy loading
        className={`w-full ${imageAspectRatio} object-cover rounded-xl bg-gray-200 dark:bg-gray-700 cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={() => onPostClick(post)} // Le clic sur l'image ouvre le modal
      />
      <div className="mt-2 px-1">
        {variant === 'large' ? (
          <>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{post.creator}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
              </div>
              {/* L'ancien affichage des likes a été intégré aux boutons d'action ci-dessous */}
            </div>
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
              <button onClick={handleLikeClick} className="flex items-center space-x-1.5 focus:outline-none group">
                <Heart className={`w-5 h-5 group-hover:text-red-400 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                <span className="text-sm font-medium">{currentLikes}</span>
              </button>
              <button onClick={handleCommentClick} className="flex items-center space-x-1.5 focus:outline-none group">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-400" />
                 {/* <span className="text-sm font-medium">Comment</span> */}
              </button>
              <button onClick={handleShareClick} className="flex items-center space-x-1.5 focus:outline-none group">
                <Share className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-green-400" />
                {/* <span className="text-sm font-medium">Share</span> */}
              </button>
            </div>
          </>
        ) : ( // Variante Small
          <>
            <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 mt-1">{post.creator}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{post.timeAgo}</p>
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <button onClick={handleLikeClick} className="flex items-center space-x-1 focus:outline-none group">
                <Heart className={`w-4 h-4 group-hover:text-red-400 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                <span className="text-xs font-medium">{currentLikes}</span>
              </button>
              <button onClick={handleCommentClick} className="flex items-center space-x-1 focus:outline-none group">
                <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-400" />
              </button>
              <button onClick={handleShareClick} className="flex items-center space-x-1 focus:outline-none group">
                <Share className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-green-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedPost;
