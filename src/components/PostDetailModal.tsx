import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share, X } from "lucide-react";
// import { useToast } from "@/hooks/use-toast"; // Décommentez si vous voulez utiliser les toasts pour les actions

// Assurez-vous que cette interface correspond à celle utilisée ailleurs (FeedPost.tsx, Index.tsx)
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

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal = ({ post, isOpen, onClose }: PostDetailModalProps) => {
  // const { toast } = useToast(); // Pour les notifications toast
  const [isLikedInModal, setIsLikedInModal] = useState(false);
  const [currentLikesInModal, setCurrentLikesInModal] = useState(0);

  useEffect(() => {
    if (post) {
      // Idéalement, cela devrait se synchroniser avec un état global ou l'état du FeedPost source.
      // Pour l'instant, c'est local à l'instance du modal.
      setIsLikedInModal(false); // Réinitialiser ou récupérer le statut "aimé" réel
      setCurrentLikesInModal(post.likes);
    }
  }, [post]);

  if (!post) return null;

  const handleLikeInModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLikedInModal(!isLikedInModal);
    setCurrentLikesInModal(isLikedInModal ? currentLikesInModal - 1 : currentLikesInModal + 1);
  };

  const handleCommentInModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Bouton Commenter cliqué dans le modal pour le post:", post.id);
    // toast({ title: "Commentaires", description: "Section des commentaires à venir !" });
  };

  const handleShareInModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Bouton Partager cliqué dans le modal pour le post:", post.id);
    // toast({ title: "Partager", description: "Fonctionnalité de partage à implémenter." });
  };

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
            <img 
              src={post.content} 
              alt={`Post by ${post.creator}`} 
              loading="lazy" // Added lazy loading
              className="w-full h-full object-contain" 
            />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
            <button onClick={handleLikeInModal} className="flex items-center space-x-1 focus:outline-none group">
              <Heart className={`w-6 h-6 group-hover:text-red-400 ${isLikedInModal ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
            </button>
            <button onClick={handleCommentInModal} className="flex items-center space-x-1 focus:outline-none group">
              <MessageSquare className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-400" />
            </button>
            <button onClick={handleShareInModal} className="flex items-center space-x-1 focus:outline-none group">
              <Share className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-green-400" />
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
