
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";

const Profile = () => {
  const user = {
    name: "Emma",
    // username: "@emma_photo", // Removed as per new design
    bio: "Photographer and visual storyteller. I add insight to captive beauty and emotion.",
    avatar: "/lovable-uploads/8bfa086c-cf08-44da-97b5-dab0efd545e1.png",
    // coverImage: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", // Removed
    // followers: "12.5K", // Removed
    // following: "892", // Removed
    // posts: "1,234", // Post count not shown in this section
    // isVerified: true, // Removed
    subscriptionPrice: "$9.99/mo"
  };

  const posts = [
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
    "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png",
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
    "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png"
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 flex flex-col">
      <main className="flex-grow max-w-md mx-auto pt-12 pb-24 px-6 flex flex-col items-center w-full">
        <Avatar className="w-32 h-32 mb-6 shadow-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-center mb-8 max-w-xs px-4">
          {user.bio}
        </p>

        <div className="flex space-x-3 mb-10 w-full max-w-xs">
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col h-auto py-3 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          >
            <span className="font-semibold">Subscribe</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{user.subscriptionPrice}</span>
          </Button>
          <Button 
            className="flex-1 flex flex-col h-auto py-3 bg-neutral-800 text-neutral-100 hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-neutral-300"
          >
            <span className="font-semibold">Tip</span>
            <MoreHorizontal className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          {posts.map((post, index) => (
            <div key={index} className="aspect-square">
              <img 
                src={post} 
                alt={`Post ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </main>
      <NavigationBar />
    </div>
  );
};

export default Profile;
