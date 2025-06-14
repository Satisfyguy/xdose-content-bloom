
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import FeedPost from "@/components/FeedPost";
import NavigationBar from "@/components/NavigationBar";
import PostDetailModal from "@/components/PostDetailModal";
import FeedPostSkeleton from "@/components/FeedPostSkeleton"; // Importer le skeleton
import { Link } from "react-router-dom";

// Définition de l'interface Post (idéalement, à partir d'un fichier de types partagé)
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
}

// Étendre la liste de posts pour simuler plus de données
const initialPostsData: Post[] = [
  { id: 1, creator: "Jane Cooper", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "5h", content: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", likes: 212, caption: "Capturing beauty and emotion through photography.", isSubscribed: false, isPremium: false },
  { id: 2, creator: "Ronald Richards", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "8h", content: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", likes: 150, caption: "Exploring geometric forms in urban landscapes.", isSubscribed: true, isPremium: false },
  { id: 3, creator: "Leslie Alexander", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "12h", content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", likes: 98, caption: "Morning coffee rituals and slow living.", isSubscribed: false, isPremium: true },
  // Dupliquer et modifier les IDs pour plus de contenu (simulation)
  { id: 4, creator: "Jane Cooper II", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "1j", content: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", likes: 180, caption: "Another beautiful shot.", isSubscribed: false, isPremium: false },
  { id: 5, creator: "Ronald Richards II", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "1j", content: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", likes: 120, caption: "Urban exploration continues.", isSubscribed: true, isPremium: false },
  { id: 6, creator: "Leslie Alexander II", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "2j", content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", likes: 75, caption: "Peaceful mornings.", isSubscribed: false, isPremium: true },
  { id: 7, creator: "Jane Cooper III", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "3j", content: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", likes: 300, caption: "Golden hour.", isSubscribed: true, isPremium: true },
  { id: 8, creator: "Ronald Richards III", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "3j", content: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", likes: 90, caption: "City lights.", isSubscribed: false, isPremium: false },
  { id: 9, creator: "Leslie Alexander III", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "4j", content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", likes: 50, caption: "Minimalism.", isSubscribed: true, isPremium: false },
];

const POSTS_PER_LOAD = 3; // 1 grand, 2 petits

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // Pour simuler la pagination/chargement

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  // Simuler le chargement des données
  useEffect(() => {
    setIsLoading(true);
    const startIndex = page * POSTS_PER_LOAD;
    const endIndex = startIndex + POSTS_PER_LOAD;
    
    // Simuler un délai réseau
    setTimeout(() => {
      const newPosts = initialPostsData.slice(startIndex, endIndex);
      if (page === 0) { // Premier chargement
        setPosts(newPosts);
      } else { // Chargements suivants (infinite scroll)
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
      }
      
      setHasMore(endIndex < initialPostsData.length);
      setIsLoading(false);
    }, 1000); // Simuler 1 seconde de chargement
  }, [page]);


  const mainPost = posts.length > 0 ? posts[0] : null;
  // Les posts pour la grille sont tous ceux après le premier, gérés par la logique de chargement
  const smallPosts = posts.slice(1);

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="max-w-md mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feed</h1>
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
            <User className="w-6 h-6" />
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 sm:px-6 pb-24">
        {/* Skeleton pour le premier post si chargement initial */}
        {page === 0 && isLoading && !mainPost && <FeedPostSkeleton variant="large" />}
        
        {/* Main Post */}
        {mainPost && (
          <div className="mb-6">
            <FeedPost post={mainPost} variant="large" onPostClick={handleOpenModal} />
          </div>
        )}

        {/* Grid for smaller posts */}
        {(smallPosts.length > 0 || (isLoading && page > 0)) && (
          <div className="grid grid-cols-2 gap-4">
            {smallPosts.map((post) => (
              <FeedPost key={post.id} post={post} variant="small" onPostClick={handleOpenModal} />
            ))}
            {/* Skeletons pour les posts suivants en cours de chargement */}
            {isLoading && page > 0 && (
              <>
                <FeedPostSkeleton variant="small" />
                <FeedPostSkeleton variant="small" />
              </>
            )}
          </div>
        )}
        
        {/* Skeleton pour les posts initiaux de la grille si chargement */}
        {page === 0 && isLoading && posts.length < 3 && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <FeedPostSkeleton variant="small" />
            <FeedPostSkeleton variant="small" />
          </div>
        )}

        {/* Élément pour déclencher le chargement de plus de posts */}
        {hasMore && !isLoading && <div ref={loadMoreRef} className="h-10" />}

        {/* Indicateur de chargement en bas */}
        {isLoading && hasMore && (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
          </div>
        )}

        {/* Fallback if no posts and not loading */}
        {!isLoading && posts.length === 0 && !hasMore && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No posts yet.</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <NavigationBar />

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;

