
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Share, Edit } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";

const Profile = () => {
  const user = {
    name: "Emma",
    username: "@emma_photo",
    bio: "Photographer and visual storyteller. I add insight to captive beauty and emotion.",
    avatar: "/lovable-uploads/8bfa086c-cf08-44da-97b5-dab0efd545e1.png",
    coverImage: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    followers: "12.5K",
    following: "892",
    posts: "1,234",
    isVerified: true,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={user.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="px-6 -mt-16 relative z-10">
          <div className="flex items-end justify-between mb-4">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.isVerified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{user.username}</p>
            </div>

            <p className="text-gray-800 dark:text-gray-200">{user.bio}</p>

            <div className="flex space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg">{user.posts}</div>
                <div className="text-gray-600 dark:text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{user.followers}</div>
                <div className="text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{user.following}</div>
                <div className="text-gray-600 dark:text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription CTA */}
        <div className="px-6 py-6">
          <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-200">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold mb-2">Share your creativity with the world</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Start earning from your content with XDose's creator tools
              </p>
              <div className="flex space-x-3">
                <Button className="flex-1 bg-white text-gray-700 hover:bg-gray-50 border">
                  Subscribe {user.subscriptionPrice}
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Tip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="px-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="exclusive">Exclusive</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
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
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Create Exclusive Content</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Share premium content with your subscribers and earn more.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Start Creating
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nfts" className="mt-6">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Your NFT Collection</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Create and showcase your unique digital collectibles.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Create NFT
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="h-20"></div>
      </main>

      {/* Bottom Navigation */}
      <NavigationBar />
    </div>
  );
};

export default Profile;
