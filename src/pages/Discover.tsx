
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Sparkles, Camera, Music, Palette } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics = [
    { name: "Photography", icon: Camera, count: "12.5K", color: "from-blue-500 to-cyan-500" },
    { name: "Music", icon: Music, count: "8.9K", color: "from-purple-500 to-pink-500" },
    { name: "Art", icon: Palette, count: "15.2K", color: "from-orange-500 to-red-500" },
  ];

  const featuredCreators = [
    {
      name: "Emma",
      username: "@emma_photo",
      avatar: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
      followers: "12.5K",
      category: "Photography"
    },
    {
      name: "Alex Rivera",
      username: "@alex_mountains",
      avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png",
      followers: "8.9K",
      category: "Nature"
    },
    {
      name: "Sarah Moore",
      username: "@sarah_art",
      avatar: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png",
      followers: "15.2K",
      category: "Digital Art"
    }
  ];

  const contentSuggestions = [
    "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png",
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png",
    "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png",
    "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png",
    "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Discover
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search creators, content, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200/20"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-6">
        {/* Trending Topics */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold">Trending Now</h2>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200/20 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${topic.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{topic.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{topic.count} posts</p>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        Hot
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Creators */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-pink-600" />
            <h2 className="text-lg font-semibold">Featured Creators</h2>
          </div>
          <div className="space-y-3">
            {featuredCreators.map((creator, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{creator.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{creator.username}</p>
                      <p className="text-xs text-gray-500">{creator.followers} followers</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {creator.category}
                      </Badge>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                      >
                        Follow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Personalized Content */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">For You</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {contentSuggestions.map((content, index) => (
              <div key={index} className="aspect-square relative group cursor-pointer">
                <img 
                  src={content} 
                  alt={`Suggestion ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Discovery Insights */}
        <Card className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">AI Insights</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="bg-white/60 rounded-lg p-3">
                <p className="font-medium">Your interests are evolving</p>
                <p className="text-gray-600">You're exploring more nature photography lately</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="font-medium">New creator recommendation</p>
                <p className="text-gray-600">Based on your activity, you might like @nature_lens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="h-20"></div>
      </main>

      <NavigationBar />
    </div>
  );
};

export default Discover;
