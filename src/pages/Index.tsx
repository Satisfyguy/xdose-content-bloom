import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { User, ListFilter } from "lucide-react"; // Ajout de ListFilter pour l'icône du tri
import FeedPost from "@/components/FeedPost";
import NavigationBar from "@/components/NavigationBar";
import PostDetailModal from "@/components/PostDetailModal";
import FeedPostSkeleton from "@/components/FeedPostSkeleton";
import AnimatedHeaderText from "@/components/AnimatedHeaderText";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import du composant Select

// Définition de l'interface Post (mise à jour avec isBookmarked)
interface Post {
  id: number;
  creator: string;
  avatar: string;
  timeAgo: string; // Pourrait être remplacé par un vrai timestamp pour un meilleur tri par date
  content: string; // URL de la vidéo
  likes: number;
  caption: string;
  isSubscribed: boolean;
  isPremium: boolean;
  isBookmarked: boolean;
}

// Étendre la liste de posts pour simuler plus de données (mise à jour avec isBookmarked)
const initialPostsData: Post[] = [
  { id: 1, creator: "Jane Cooper", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "5h", content: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", likes: 212, caption: "Capturing beauty and emotion through photography.", isSubscribed: false, isPremium: false, isBookmarked: false },
  { id: 2, creator: "Ronald Richards", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "8h", content: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", likes: 150, caption: "Exploring geometric forms in urban landscapes.", isSubscribed: true, isPremium: false, isBookmarked: true },
  { id: 3, creator: "Leslie Alexander", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "12h", content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", likes: 98, caption: "Morning coffee rituals and slow living.", isSubscribed: false, isPremium: true, isBookmarked: false },
  { id: 4, creator: "Jane Cooper II", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "1j", content: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", likes: 180, caption: "Another beautiful shot.", isSubscribed: false, isPremium: false, isBookmarked: true },
  { id: 5, creator: "Ronald Richards II", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "1j", content: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", likes: 120, caption: "Urban exploration continues.", isSubscribed: true, isPremium: false, isBookmarked: false },
  { id: 6, creator: "Leslie Alexander II", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "2j", content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", likes: 75, caption: "Peaceful mornings.", isSubscribed: false, isPremium: true, isBookmarked: true },
  { id: 7, creator: "Jane Cooper III", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "3j", content: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", likes: 300, caption: "Golden hour.", isSubscribed: true, isPremium: true, isBookmarked: false },
  { id: 8, creator: "Ronald Richards III", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "3j", content: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", likes: 90, caption: "City lights.", isSubscribed: false, isPremium: false, isBookmarked: false },
  { id: 9, creator: "Leslie Alexander III", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "4j", content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", likes: 50, caption: "Minimalism.", isSubscribed: true, isPremium: false, isBookmarked: true },
];

const POSTS_PER_LOAD = 3; 
type SortOption = "recent" | "popular";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); 

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("recent"); // État pour l'option de tri

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

  useEffect(() => {
    // Réinitialiser la page et les posts lors du changement de filtre ou de tri
    setPosts([]);
    setPage(0);
    setHasMore(true); 
    // Le chargement initial se fera par le useEffect dépendant de 'page'
  }, [showOnlyBookmarked, sortOption]);


  useEffect(() => {
    setIsLoading(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      let processedData = [...initialPostsData];

      // 1. Filtrer par favoris si activé
      if (showOnlyBookmarked) {
        processedData = processedData.filter(p => p.isBookmarked);
      }

      // 2. Trier les données
      if (sortOption === "recent") {
        // Simule le tri par date en triant par ID décroissant (supposant que les ID plus élevés sont plus récents)
        processedData.sort((a, b) => b.id - a.id);
      } else if (sortOption === "popular") {
        processedData.sort((a, b) => b.likes - a.likes);
      }
      
      const startIndex = page * POSTS_PER_LOAD;
      const endIndex = startIndex + POSTS_PER_LOAD;
      const newPosts = processedData.slice(startIndex, endIndex);
      
      if (page === 0) { 
        setPosts(newPosts);
      } else { 
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
      }
      
      setHasMore(endIndex < processedData.length);
      setIsLoading(false);
    }, 1000); 
  }, [page, showOnlyBookmarked, sortOption]); // Ajout de showOnlyBookmarked et sortOption aux dépendances

  // Fonction pour mettre à jour l'état de favori d'un post
  const handleToggleBookmark = (postId: number) => {
    // Mettre à jour initialPostsData pour simuler une source de données persistante
    const postIndexInInitialData = initialPostsData.findIndex(p => p.id === postId);
    if (postIndexInInitialData !== -1) {
        initialPostsData[postIndexInInitialData].isBookmarked = !initialPostsData[postIndexInInitialData].isBookmarked;
    }

    setPosts(prevPosts =>
      prevPosts.map(p =>
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    );
    if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(prevSelectedPost => prevSelectedPost ? {...prevSelectedPost, isBookmarked: !prevSelectedPost.isBookmarked} : null);
    }
    // Si on filtre par favoris, et qu'on retire un favori, il faut potentiellement le retirer de la liste affichée
    // Cela est géré par la réinitialisation et le rechargement dans le useEffect dépendant de showOnlyBookmarked
  };

  // Les posts affichés sont maintenant directement 'posts' car le filtrage et le tri sont faits en amont.
  const displayedPosts = posts;

  const mainPost = displayedPosts.length > 0 ? displayedPosts[0] : null;
  const smallPosts = displayedPosts.slice(1);

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
      <header className="max-w-md mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <AnimatedHeaderText text="Feed" />
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <User className="w-6 h-6" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <ListFilter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
              <SelectTrigger className="w-[180px] bg-transparent border-gray-300 dark:border-gray-700 text-sm">
                <SelectValue placeholder="Trier par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus Récent</SelectItem>
                <SelectItem value="popular">Plus Populaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="bookmarks-filter"
              checked={showOnlyBookmarked}
              onCheckedChange={setShowOnlyBookmarked}
              className="data-[state=checked]:bg-yellow-500"
            />
            <Label htmlFor="bookmarks-filter" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
              Favoris
            </Label>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 pb-24">
        {/* Skeletons pour le chargement initial */}
        {isLoading && posts.length === 0 && ( // Modifié pour s'afficher si posts est vide et isLoading
            <>
                <FeedPostSkeleton variant="large" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <FeedPostSkeleton variant="small" />
                    <FeedPostSkeleton variant="small" />
                </div>
            </>
        )}
        
        {/* Affichage du post principal */}
        {mainPost && (
          <div className="mb-6">
            <FeedPost 
              post={mainPost} 
              variant="large" 
              onPostClick={handleOpenModal} 
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}

        {/* Affichage des posts plus petits */}
        {(smallPosts.length > 0 || (isLoading && posts.length > 0)) && ( // Modifié pour gérer le chargement pendant scroll
          <div className="grid grid-cols-2 gap-4">
            {smallPosts.map((post) => (
              <FeedPost 
                key={post.id} 
                post={post} 
                variant="small" 
                onPostClick={handleOpenModal} 
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
            {/* Skeletons pour le chargement infini */}
            {isLoading && posts.length > 0 && ( 
              <>
                <FeedPostSkeleton variant="small" />
                <FeedPostSkeleton variant="small" />
              </>
            )}
          </div>
        )}
        
        {/* Cas où il n'y a aucun post à afficher (après filtrage ou initialement) et pas en chargement */}
        {!isLoading && displayedPosts.length === 0 && (
           <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            {showOnlyBookmarked ? "Aucun post en favori." : "Aucun post pour le moment."}
            {sortOption === "popular" && !showOnlyBookmarked && " Triez par popularité."}
          </p>
        )}

        {/* Indicateur pour charger plus de posts */}
        {hasMore && !isLoading && <div ref={loadMoreRef} className="h-10" />}

        {/* Message de chargement pendant le scroll infini */}
        {isLoading && hasMore && posts.length > 0 && ( 
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
          </div>
        )}
      </main>

      <NavigationBar />

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </div>
  );
};

export default Index;
