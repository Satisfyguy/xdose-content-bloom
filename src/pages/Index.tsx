
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import StoryViewer from "@/components/StoryViewer";
import FeedPost from "@/components/FeedPost";
import NavigationBar from "@/components/NavigationBar";

const Index = () => {
  const stories = [
    { id: 1, creator: "Emma", avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", hasNew: true },
    { id: 2, creator: "Alex Rivera", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", hasNew: true },
    { id: 3, creator: "Emily Johnson", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", hasNew: false },
    { id: 4, creator: "Daniel Lee", avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", hasNew: true },
  ];

  const posts = [
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
      creator: "Emma",
      avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
      timeAgo: "8h",
      content: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
      likes: 456,
      caption: "Photographer and visual storyteller. I add insight to captive beauty and emotion.",
      isSubscribed: true,
      isPremium: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            XDose
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Messages</Button>
            <Button variant="ghost" size="sm">Search</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {/* Stories Section */}
        <div className="px-6 py-4">
          <StoryViewer stories={stories} />
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </main>

      {/* Bottom Navigation */}
      <NavigationBar />
    </div>
  );
};

export default Index;
