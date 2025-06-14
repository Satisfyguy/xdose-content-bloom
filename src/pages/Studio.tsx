
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, Image, Video, Wand2, Palette, Type, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Studio = () => {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState<string | null>("/lovable-uploads/2b74d434-70f3-4444-a0e0-35b0e039b879.png");
  const [caption, setCaption] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState('');

  const creationTools = [
    { icon: Camera, label: "Camera", color: "from-blue-500 to-cyan-500" },
    { icon: Image, label: "Gallery", color: "from-green-500 to-emerald-500" },
    { icon: Video, label: "Video", color: "from-red-500 to-pink-500", action: () => navigate('/upload') },
    { icon: Wand2, label: "AI Magic", color: "from-purple-500 to-violet-500" },
  ];

  const editingTools = [
    { icon: Palette, label: "Filters", color: "from-orange-500 to-red-500" },
    { icon: Type, label: "Text", color: "from-blue-500 to-purple-500" },
    { icon: Music, label: "Music", color: "from-pink-500 to-rose-500" },
    { icon: Wand2, label: "Effects", color: "from-green-500 to-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-lg font-semibold">Studio</div>
          <Button 
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Publish
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-6">
        {/* Media Preview */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/20">
          <CardContent className="p-0">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {selectedMedia ? (
                <img 
                  src={selectedMedia} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Camera className="w-12 h-12 mx-auto mb-2" />
                    <p>Select or capture media</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Creation Tools */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Create</h2>
          <div className="grid grid-cols-4 gap-3">
            {creationTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-20 flex-col space-y-2 bg-gradient-to-br ${tool.color} text-white border-0 hover:opacity-90`}
                  onClick={tool.action}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{tool.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Editing Tools */}
        {selectedMedia && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Edit</h2>
            <div className="grid grid-cols-4 gap-3">
              {editingTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-20 flex-col space-y-2 bg-gradient-to-br ${tool.color} text-white border-0 hover:opacity-90`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{tool.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Post Details */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/20">
          <CardContent className="p-4 space-y-4">
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Share your story..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="mt-2"
              />
            </div>

            <Tabs defaultValue="public" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="public">Public</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
              
              <TabsContent value="public" className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This post will be visible to all your followers for free.
                </p>
              </TabsContent>
              
              <TabsContent value="premium" className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This post will be available for subscribers or as pay-per-view.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-200/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Wand2 className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">AI Suggestions</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="bg-white/60 rounded-lg p-3">
                <p className="font-medium">Optimal posting time</p>
                <p className="text-gray-600">Post in 2 hours for maximum engagement</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="font-medium">Trending hashtags</p>
                <p className="text-gray-600">#photography #portrait #creative</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="h-20"></div>
      </main>
    </div>
  );
};

export default Studio;
