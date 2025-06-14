
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import TipButton from "@/components/TipButton";

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

interface FeedPostProps {
  post: Post;
}

const FeedPost = ({ post }: FeedPostProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/20 dark:border-gray-700/20 shadow-lg">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.avatar} alt={post.creator} />
              <AvatarFallback>{post.creator.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">{post.creator}</h3>
                {post.isPremium && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">{post.timeAgo}</p>
            </div>
          </div>
          
          {!post.isSubscribed && (
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
            >
              Follow
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="relative">
          <img 
            src={post.content} 
            alt="Post content" 
            className="w-full aspect-square object-cover"
          />
          {post.isPremium && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-medium">Premium Content</p>
                <Button size="sm" className="mt-2 w-full">Subscribe to view</Button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`p-0 ${liked ? 'text-red-500' : 'text-gray-600'}`}
              >
                <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 text-gray-600">
                <MessageCircle className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 text-gray-600">
                <Share className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <TipButton creatorName={post.creator} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSaved(!saved)}
                className={`p-0 ${saved ? 'text-blue-500' : 'text-gray-600'}`}
              >
                <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-sm">{post.likes} likes</p>
            <p className="text-sm">
              <span className="font-semibold">{post.creator}</span> {post.caption}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedPost;
