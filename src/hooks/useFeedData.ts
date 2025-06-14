
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Post, SortOption } from '@/types';

// Initial posts data, updated with video URLs
const initialPostsData: Post[] = [
  { id: 1, creator: "Jane Cooper", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "5h", content: "https://videos.pexels.com/video-files/4434242/4434242-sd_640_360_30fps.mp4", likes: 212, caption: "Capturing beauty and emotion through videography.", isSubscribed: false, isPremium: false, isBookmarked: false },
  { id: 2, creator: "Ronald Richards", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "8h", content: "https://videos.pexels.com/video-files/4784400/4784400-sd_640_360_30fps.mp4", likes: 150, caption: "Exploring geometric forms in urban landscapes.", isSubscribed: true, isPremium: false, isBookmarked: true },
  { id: 3, creator: "Leslie Alexander", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "12h", content: "https://videos.pexels.com/video-files/5495201/5495201-sd_640_360_30fps.mp4", likes: 98, caption: "Morning coffee rituals and slow living.", isSubscribed: false, isPremium: true, isBookmarked: false },
  { id: 4, creator: "Jane Cooper II", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "1j", content: "https://videos.pexels.com/video-files/8064562/8064562-sd_640_360_30fps.mp4", likes: 180, caption: "Another beautiful shot.", isSubscribed: false, isPremium: false, isBookmarked: true },
  { id: 5, creator: "Ronald Richards II", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "1j", content: "https://videos.pexels.com/video-files/8044819/8044819-sd_640_360_30fps.mp4", likes: 120, caption: "Urban exploration continues.", isSubscribed: true, isPremium: false, isBookmarked: false },
  { id: 6, creator: "Leslie Alexander II", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "2j", content: "https://videos.pexels.com/video-files/7578544/7578544-sd_640_360_30fps.mp4", likes: 75, caption: "Peaceful mornings.", isSubscribed: false, isPremium: true, isBookmarked: true },
  { id: 7, creator: "Jane Cooper III", avatar: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", timeAgo: "3j", content: "https://videos.pexels.com/video-files/8210787/8210787-sd_640_360_30fps.mp4", likes: 300, caption: "Golden hour.", isSubscribed: true, isPremium: true, isBookmarked: false },
  { id: 8, creator: "Ronald Richards III", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", timeAgo: "3j", content: "https://videos.pexels.com/video-files/7659556/7659556-sd_640_360_30fps.mp4", likes: 90, caption: "City lights.", isSubscribed: false, isPremium: false, isBookmarked: false },
  { id: 9, creator: "Leslie Alexander III", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", timeAgo: "4j", content: "https://videos.pexels.com/video-files/5664536/5664536-sd_640_360_30fps.mp4", likes: 50, caption: "Minimalism.", isSubscribed: true, isPremium: false, isBookmarked: true },
];

const POSTS_PER_LOAD = 3;

export const useFeedData = (initialSortOption: SortOption = "recent", initialShowBookmarked: boolean = false) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(initialShowBookmarked);
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);

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
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [showOnlyBookmarked, sortOption]);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let processedData = [...initialPostsData];

      if (showOnlyBookmarked) {
        processedData = processedData.filter(p => p.isBookmarked);
      }

      if (sortOption === "recent") {
        processedData.sort((a, b) => b.id - a.id);
      } else if (sortOption === "popular") {
        processedData.sort((a, b) => b.likes - a.likes);
      }
      
      const startIndex = page * POSTS_PER_LOAD;
      const endIndex = startIndex + POSTS_PER_LOAD;
      const newPosts = processedData.slice(startIndex, endIndex);
      
      setPosts(prevPosts => page === 0 ? newPosts : [...prevPosts, ...newPosts]);
      setHasMore(endIndex < processedData.length);
      setIsLoading(false);
    }, 1000);
  }, [page, showOnlyBookmarked, sortOption]);

  const handleToggleBookmark = (postId: number) => {
    const postIndexInInitialData = initialPostsData.findIndex(p => p.id === postId);
    if (postIndexInInitialData !== -1) {
        initialPostsData[postIndexInInitialData].isBookmarked = !initialPostsData[postIndexInInitialData].isBookmarked;
    }

    setPosts(prevPosts =>
      prevPosts.map(p =>
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    );
    // Note: If a selectedPost is being tracked outside this hook (e.g., for a modal),
    // it will need to be updated separately or this hook might need to manage it.
    // For now, we assume selectedPost update happens where it's managed.
  };

  return {
    posts,
    isLoading,
    hasMore,
    loadMoreRef,
    showOnlyBookmarked,
    setShowOnlyBookmarked,
    sortOption,
    setSortOption,
    handleToggleBookmark,
  };
};
