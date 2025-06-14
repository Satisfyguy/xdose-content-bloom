import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationBar from "@/components/NavigationBar";
import TipButton from "@/components/TipButton";
import SubscriptionPlan from "@/components/SubscriptionPlan";
import { Edit3 } from "lucide-react";

const Profile = () => {
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

  const posts = [
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
    "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png",
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
  ];
  const postCount = posts.length;

  // Updated subscription tiers to English and new structure
  const subscriptionTiers = [
    { 
      name: "Fan Access", 
      price: "$4.99", 
      benefits: ["Access to select posts", "Join community chat", "Monthly Q&A"], 
      isRecommended: false 
    },
    { 
      name: "Supporter Plus", 
      price: "$9.99", 
      benefits: ["Everything in Fan Access", "Exclusive photo sets", "Early access to new content"], 
      isRecommended: true 
    },
    { 
      name: "VIP Inner Circle", 
      price: "$24.99", 
      benefits: ["All Supporter Plus perks", "Behind-the-scenes videos", "Direct messaging priority", "Personalized thank-you note"], 
      isRecommended: false 
    }
  ];

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
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">Posts</p>
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
              // This section is for when it's NOT the user's own profile.
              // It was previously showing a TipButton here, and another TipButton below.
              // Let's ensure only one TipButton shows if it's not their own profile.
              <TipButton creatorName={user.name} />
            )}
            {/* Tip button logic: Show if not own profile. The original code had a duplicate. */}
            {!user.isOwnProfile && <TipButton creatorName={user.name} />} 
            {/* If it is own profile, no tip button to self. Current logic: user.isOwnProfile is true, so this won't show. */}
          </div>

          {/* Subscription Tiers Section */}
          {/* This section was for !user.isOwnProfile, which isn't the case here. */}
          {/* The relevant section for own profile is below. */}

          {/* If it's own profile, show "My Subscription Tiers" */}
          {user.isOwnProfile && (
             <div className="w-full mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">My Subscription Tiers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {subscriptionTiers.map((tier) => (
                  <SubscriptionPlan key={tier.name} plan={tier} />
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full max-w-md mx-auto block border-neutral-400 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                Manage Subscriptions
              </Button>
            </div>
          )}

          {/* Posts Grid */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Posts</h2>
            {posts.length > 0 ? (
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 md:gap-2 w-full">
                {posts.map((post, index) => (
                  <div key={index} className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden">
                    <img 
                      src={post} 
                      alt={`Post ${index + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                <p className="text-xl mb-2">No posts yet.</p>
                <p>Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <NavigationBar />
    </div>
  );
};

export default Profile;
