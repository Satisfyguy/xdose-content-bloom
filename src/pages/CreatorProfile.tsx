
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageCircle, Share } from "lucide-react";
import SubscriptionPlan from "@/components/SubscriptionPlan";
import TipButton from "@/components/TipButton";

const CreatorProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const creator = {
    name: "Emma", // Data - kept as is
    username: "@emma_photo", // Data - kept as is
    bio: "Photographer and visual storyteller. I add insight to captive beauty and emotion.", // Data - kept as is
    avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    coverImage: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    followers: "12.5K", // Data - kept as is
    following: "892", // Data - kept as is
    posts: "1,234", // Data - kept as is
    isVerified: true
  };

  // Updated subscription plans with string prices and new tier names/benefits
  const subscriptionPlans = [
    {
      name: "Fan Access",
      price: "$4.99", // Changed to string
      benefits: ["Access to select posts", "Join community chat", "Monthly Q&A"],
      isRecommended: false,
    },
    {
      name: "Supporter Plus",
      price: "$9.99", // Changed to string
      benefits: ["Everything in Fan Access", "Exclusive photo sets", "Early access to new content"],
      isRecommended: true,
    },
    {
      name: "VIP Inner Circle",
      price: "$24.99", // Changed to string
      benefits: ["All Supporter Plus perks", "Behind-the-scenes videos", "Direct messaging priority", "Personalized thank-you note"],
      isRecommended: false,
    }
  ];

  const posts = [
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
    "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png",
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
    "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-lg font-semibold">{creator.name}</div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" aria-label="Share profile">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={creator.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="px-6 -mt-16 relative z-10">
          <div className="flex items-end justify-between mb-4">
            <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-950 shadow-lg">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex space-x-2">
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={() => setIsFollowing(!isFollowing)}
                className={isFollowing ? 
                  "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700" : 
                  "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" className="dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-700" aria-label="Send message">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <TipButton creatorName={creator.name} />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{creator.name}</h1>
                {creator.isVerified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{creator.username}</p>
            </div>

            <p className="text-gray-800 dark:text-gray-200">{creator.bio}</p>

            <div className="flex space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900 dark:text-white">{creator.posts}</div>
                <div className="text-gray-600 dark:text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900 dark:text-white">{creator.followers}</div>
                <div className="text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900 dark:text-white">{creator.following}</div>
                <div className="text-gray-600 dark:text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="px-6 py-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Subscribe for exclusive content</h2>
          <div className="grid gap-4">
            {subscriptionPlans.map((plan, index) => (
              <SubscriptionPlan key={index} plan={plan} />
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="px-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="posts" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">Posts</TabsTrigger>
              <TabsTrigger value="exclusive" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">Exclusive</TabsTrigger>
              <TabsTrigger value="nfts" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">NFTs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-3 gap-1">
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
            </TabsContent>
            
            <TabsContent value="exclusive" className="mt-6">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Exclusive Content</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Subscribe to access premium photos, tutorials, and behind-the-scenes content.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nfts" className="mt-6">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">NFT Collection</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Discover unique digital collectibles from this creator.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                    Explore NFTs
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="h-20"></div> {/* Spacer for bottom content */}
      </main>
    </div>
  );
};

export default CreatorProfile;

