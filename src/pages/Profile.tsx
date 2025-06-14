
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationBar from "@/components/NavigationBar";
import TipButton from "@/components/TipButton";
import VideoPost from "@/components/VideoPost";
import PostDetailModal from "@/components/PostDetailModal";
import type { Post } from '@/types';
import { Edit3 } from "lucide-react";

const Profile = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const user = {
    name: "Emma",
    username: "@emma_photo",
    bio: "Photographer and visual storyteller. I add insight to captive beauty and emotion.",
    avatar: "/lovable-uploads/8bfa086c-cf08-44da-97b5-dab0efd545e1.png",
    coverImage: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    followers: "12.5K",
    following: "892",
    isOwnProfile: true,
  };

  // Posts vidéo simulés
  const videoPosts: Post[] = [
    {
      id: 1,
      creator: "Emma",
      avatar: "/lovable-uploads/8bfa086c-cf08-44da-97b5-dab0efd545e1.png",
      timeAgo: "2h",
      content: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      likes: 245,
      caption: "Beautiful sunset photography session",
      isSubscribed: false,
      isPremium: false,
      isBookmarked: false
    },
    {
      id: 2,
      creator: "Emma",
      avatar: "/lovable-uploads/8bfa086c-cf08-44da-97b5-dab0efd545e1.png",
      timeAgo: "5h",
      content: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      likes: 189,
      caption: "Urban street photography tips",
      isSubscribed: false,
      isPremium: false,
      isBookmarked: false
    },
    {
      id: 3,
      creator: "Emma",
      avatar: "/lovable-uploads/8bfa086c-cf08-44da-97b5-dab0efd545e1.png",
      timeAgo: "1d",
      content: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      likes: 312,
      caption: "Portrait lighting techniques",
      isSubscribed: false,
      isPremium: false,
      isBookmarked: false
    },
    {
      id: 4,
      creator: "Emma",
      avatar: "/lovable-uploads/8bfa086c-cf08-44da-97b5-dab0efd545e1.png",
      timeAgo: "2d",
      content: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      likes: 156,
      caption: "Nature photography workshop",
      isSubscribed: false,
      isPremium: false,
      isBookmarked: false
    }
  ];

  const postCount = videoPosts.length;

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 flex flex-col">
      <main className="flex-grow max-w-3xl mx-auto pb-24 w-full">
        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-neutral-300 dark:bg-neutral-700 relative mb-[-64px] md:mb-[-80px]">
          {user.coverImage && (
            <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover"/>
          )}
          {user.isOwnProfile && (
            <Button variant="outline" size="sm" className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white border-white/50 hover:border-white">
              <Edit3 className="w-3 h-3 mr-1.5" /> Change Cover
            </Button>
          )}
        </div>

        <div className="px-4 md:px-6 flex flex-col items-center">
          {/* Avatar, user name, username, bio */}
          <Avatar className="w-32 h-32 md:w-40 md:h-40 mb-4 border-4 border-neutral-100 dark:border-neutral-950 shadow-xl">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-3">{user.username}</p>
          
          <p className="text-neutral-700 dark:text-neutral-300 text-center mb-6 max-w-md">
            {user.bio}
          </p>

          {/* Stats */}
          <div className="flex space-x-6 mb-8 text-center">
            <div>
              <p className="text-xl font-semibold">{postCount}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">Videos</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{user.followers}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">Followers</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{user.following}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">Following</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3 mb-10 w-full max-w-xs justify-center">
            {user.isOwnProfile ? (
              <Button variant="outline" className="flex-1 border-neutral-400 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <TipButton creatorName={user.name} />
            )}
            {!user.isOwnProfile && <TipButton creatorName={user.name} />} 
          </div>

          {/* Videos Grid */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Videos</h2>
            {videoPosts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 md:gap-2 w-full">
                {videoPosts.map((post) => (
                  <VideoPost
                    key={post.id}
                    videoUrl={post.content}
                    alt={`Video ${post.id}`}
                    onClick={() => handlePostClick(post)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                <p className="text-xl mb-2">No videos yet.</p>
                <p>Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <NavigationBar />
      
      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Profile;
