import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Sparkles, Film, PlaySquare, Lightbulb, Video, Filter, ListVideo, Clock, Zap, Clapperboard, Flame, Award } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentSuggestion {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
  title?: string;
  category?: string;
  duration?: number; 
  uploadDate?: string; 
}

interface CreationChallenge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType; // For a potential icon per challenge
  participants?: number;
  deadline?: string;
}

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [hoveredNewVideoId, setHoveredNewVideoId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("any");
  const [sortBy, setSortBy] = useState<string>("relevance");

  const trendingTopics = [
    { name: "Histoires Érotiques", icon: Film, count: "7.5K videos", color: "from-red-500 to-pink-500" },
    { name: "Performances Live", icon: PlaySquare, count: "15.2K videos", color: "from-purple-500 to-indigo-500" },
    { name: "Cosplay Sensuel", icon: Lightbulb, count: "9.8K videos", color: "from-yellow-500 to-orange-500" },
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

  const placeholderVideoUrl = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

  const contentSuggestions: ContentSuggestion[] = [
    { id: "1", thumbnailUrl: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", videoUrl: placeholderVideoUrl, title: "Aventure Passionnée", category: "Amateur", duration: 5, uploadDate: "2025-06-10" },
    { id: "2", thumbnailUrl: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", videoUrl: placeholderVideoUrl, title: "Nuits Citadines", category: "Professionnel", duration: 3, uploadDate: "2025-06-12" },
    { id: "3", thumbnailUrl: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", videoUrl: placeholderVideoUrl, title: "Sentier Secret", category: "Fétiche", duration: 10, uploadDate: "2025-06-01" },
    { id: "4", thumbnailUrl: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", videoUrl: placeholderVideoUrl, title: "Vagues de Désir", category: "Couple", duration: 2, uploadDate: "2025-05-20" },
    { id: "5", thumbnailUrl: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", videoUrl: placeholderVideoUrl, title: "Crépuscule Ardent", category: "Solo", duration: 7, uploadDate: "2025-06-14" },
    { id: "6", thumbnailUrl: "/lovable-uploads/b8ac03f0-b68d-4fc1-98e3-189a0b874c72.png", videoUrl: placeholderVideoUrl, title: "Art Abstrait Charnel", category: "Artistique", duration: 1, uploadDate: "2025-06-13" },
    { id: "7", thumbnailUrl: "/lovable-uploads/c9a9c75e-c2f2-47a1-8751-766ef79f54ae.png", videoUrl: placeholderVideoUrl, title: "Making Of: Scène X", category: "Making Of", duration: 12, uploadDate: "2025-06-15" },
    { id: "8", thumbnailUrl: "/lovable-uploads/7628e41c-da82-4541-a855-af18775954cb.png", videoUrl: placeholderVideoUrl, title: "Leçon de Séduction", category: "Éducatif", duration: 8, uploadDate: "2025-06-16" }
  ];
  
  const videoCategories = [
    "all", "Amateur", "Professionnel", "Solo", "Couple", "Groupe", 
    "Fétiche", "Cosplay", "Histoires Érotiques", "Performances Live", 
    "Artistique", "Éducatif", "Making Of", "VR"
  ];

  const videoDurations = [
    { value: "any", label: "Toute Durée" },
    { value: "short", label: "Courte (< 5 min)" },
    { value: "medium", label: "Moyenne (5-15 min)" },
    { value: "long", label: "Longue (> 15 min)" },
  ];
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "newest", label: "Nouveautés" },
    { value: "popular", label: "Popularité" },
  ];

  const creationChallenges: CreationChallenge[] = [
    { id: "challenge1", title: "Le Désir en Noir et Blanc", description: "Exprimez la passion et l'érotisme en utilisant uniquement des nuances de gris.", icon: Film, participants: 120, deadline: "2025-07-15" },
    { id: "challenge2", title: "Poésie Corporelle", description: "Créez une vidéo artistique mettant en scène la beauté du corps humain en mouvement.", icon: Sparkles, participants: 85, deadline: "2025-07-30" },
    { id: "challenge3", title: "Ma Première Fois (Réinventée)", description: "Racontez une histoire originale et sensuelle sur le thème de la découverte.", icon: Lightbulb, participants: 210, deadline: "2025-08-10" },
  ];

  const latestUploads = [...contentSuggestions]
    .sort((a, b) => new Date(b.uploadDate ?? 0).getTime() - new Date(a.uploadDate ?? 0).getTime())
    .slice(0, 4);

  const filteredContentSuggestions = contentSuggestions.filter(content => {
    const matchesCategory = selectedCategory === "all" || content.category === selectedCategory;
    const matchesDuration = selectedDuration === "any" || 
      (selectedDuration === "short" && (content.duration ?? 0) < 5) ||
      (selectedDuration === "medium" && (content.duration ?? 0) >= 5 && (content.duration ?? 0) <= 15) ||
      (selectedDuration === "long" && (content.duration ?? 0) > 15);
    // Search query matching (simple title search for now)
    const matchesSearch = !searchQuery || (content.title && content.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDuration && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.uploadDate ?? 0).getTime() - new Date(a.uploadDate ?? 0).getTime();
    }
    // Add more sort logic for 'popular' or 'relevance' if needed
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        {/* ... keep existing code (Header content: Discover title, Search Bar) */}
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Découvrir
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Chercher créateurs, vidéos, thèmes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200/20"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-2 mb-2 text-sm">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Filtres:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pb-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="text-xs h-9">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {videoCategories.map(category => (
                  <SelectItem key={category} value={category} className="text-xs">
                    {category === "all" ? "Toutes" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="text-xs h-9">
                <SelectValue placeholder="Durée" />
              </SelectTrigger>
              <SelectContent>
                {videoDurations.map(duration => (
                  <SelectItem key={duration.value} value={duration.value} className="text-xs">
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="text-xs h-9">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-xs">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-8">
        {/* Trending Topics */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold">Tendances Actuelles</h2>
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">{topic.count}</p> 
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        Chaud
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
            <h2 className="text-lg font-semibold">Créateurs à la Une</h2>
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
                        Suivre
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nouveautés (Latest Uploads) Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">Nouveautés</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {latestUploads.map((content) => (
              <div 
                key={`new-${content.id}`} 
                className="aspect-square relative group cursor-pointer rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700"
                onMouseEnter={() => setHoveredNewVideoId(content.id)}
                onMouseLeave={() => setHoveredNewVideoId(null)}
              >
                {hoveredNewVideoId === content.id ? (
                  <video
                    src={content.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img 
                    src={content.thumbnailUrl} 
                    alt={content.title || `Nouveauté ${content.id}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-2">
                  {content.title && hoveredNewVideoId !== content.id && (
                     <p className="text-white text-xs font-medium truncate bg-black/30 px-1 py-0.5 rounded">
                       {content.title}
                     </p>
                  )}
                </div>
                {hoveredNewVideoId !== content.id && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlaySquare className="w-8 h-8 text-white/70" />
                  </div>
                )}
              </div>
            ))}
            {latestUploads.length === 0 && (
              <p className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-8">
                Aucune nouvelle vidéo pour le moment.
              </p>
            )}
          </div>
        </div>

        {/* Défis de Création */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Défis de Création</h2>
          </div>
          <div className="space-y-3">
            {creationChallenges.map((challenge) => {
              const ChallengeIcon = challenge.icon;
              return (
                <Card key={challenge.id} className="bg-white/80 backdrop-blur-sm border-gray-200/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                        <ChallengeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{challenge.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          {challenge.participants && <span>{challenge.participants} participants</span>}
                          {challenge.deadline && <span>Date limite: {challenge.deadline}</span>}
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 dark:border-yellow-400 dark:text-yellow-300 dark:hover:bg-yellow-900/50 dark:hover:text-yellow-200"
                      >
                        Participer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* AI Personalized Content - For You */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Pour Vous</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredContentSuggestions.map((content) => (
              <div 
                key={content.id} 
                className="aspect-square relative group cursor-pointer rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700"
                onMouseEnter={() => setHoveredVideoId(content.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
              >
                {hoveredVideoId === content.id ? (
                  <video
                    src={content.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline // Important for iOS Safari
                  />
                ) : (
                  <img 
                    src={content.thumbnailUrl} 
                    alt={content.title || `Suggestion ${content.id}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-2">
                  {content.title && hoveredVideoId !== content.id && (
                     <p className="text-white text-xs font-medium truncate bg-black/30 px-1 py-0.5 rounded">
                       {content.title}
                     </p>
                  )}
                </div>
                 {/* Small play icon overlay for non-hovered videos */}
                {hoveredVideoId !== content.id && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlaySquare className="w-8 h-8 text-white/70" />
                  </div>
                )}
              </div>
            ))}
            {filteredContentSuggestions.length === 0 && (
              <p className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-8">
                Aucune vidéo ne correspond à vos filtres actuels. Essayez de les ajuster !
              </p>
            )}
          </div>
        </div>

        {/* AI Discovery Insights */}
        <Card className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-blue-800" />
              <h3 className="font-semibold text-blue-800">Perspectives IA</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="bg-white/60 rounded-lg p-3">
                <p className="font-medium">Vos intérêts évoluent</p>
                <p className="text-gray-600">Vous explorez davantage les performances live ces derniers temps.</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="font-medium">Nouvelle recommandation de créateur</p>
                <p className="text-gray-600">Basé sur votre activité, vous pourriez aimer @sensual_arts</p>
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
