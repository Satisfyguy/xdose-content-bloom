import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import FeedPost from "@/components/FeedPost";
import NavigationBar from "@/components/NavigationBar";
import PostDetailModal from "@/components/PostDetailModal";
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

const Index = () => {
  // Updated posts data to better match the visual design for three posts
  const posts: Post[] = [
    {
      id: 1,
      creator: "Jane Cooper",
      avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
      timeAgo: "5h",
      content: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
      likes: 212,
      caption: "Capturing beauty and emotion through photography. Every frame tells a story.",
      isSubscribed: false,
      isPremium: false
    },
    {
      id: 2,
      creator: "Ronald Richards",
      avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", // Example avatar
      timeAgo: "8h",
      content: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", // Example content image
      likes: 150,
      caption: "Exploring geometric forms in urban landscapes.",
      isSubscribed: true,
      isPremium: false
    },
    {
      id: 3,
      creator: "Leslie Alexander",
      avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", // Example avatar
      timeAgo: "12h",
      content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", // Example content image
      likes: 98,
      caption: "Morning coffee rituals and slow living.",
      isSubscribed: false,
      isPremium: true // Data point, though not explicitly styled in this simplified FeedPost
    }
  ];

  const mainPost = posts[0];
  const smallPosts = posts.slice(1, 3); // Ensure we have posts for the grid

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionnel: setSelectedPost(null) après un délai pour l'animation de fermeture du modal
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
      <main className="max-w-md mx-auto px-4 sm:px-6 pb-24"> {/* Adjusted padding, pb-24 for nav bar space */}
        {/* Main Post */}
        {mainPost && (
          <div className="mb-6">
            {/* Passer onPostClick à FeedPost */}
            <FeedPost post={mainPost} variant="large" onPostClick={handleOpenModal} />
          </div>
        )}

        {/* Grid for smaller posts */}
        {smallPosts.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {smallPosts.map((post) => (
              // Passer onPostClick à FeedPost
              <FeedPost key={post.id} post={post} variant="small" onPostClick={handleOpenModal} />
            ))}
          </div>
        )}
        
        {/* Fallback if no posts */}
        {posts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No posts yet.</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <NavigationBar />

      {/* Post Detail Modal */}
      {/* S'assurer que selectedPost n'est pas null avant de rendre le modal peut éviter des erreurs */}
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
