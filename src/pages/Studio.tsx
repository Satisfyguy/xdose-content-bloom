import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Video, Play, Pause, X, Award, Film, Sparkles, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreationChallenge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  participants?: number;
  deadline?: string;
}

const Studio = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const creationChallenges: CreationChallenge[] = [
    { id: "challenge1", title: "Le Désir en Noir et Blanc", description: "Exprimez la passion et l'érotisme en utilisant uniquement des nuances de gris.", icon: Film, participants: 120, deadline: "2025-07-15" },
    { id: "challenge2", title: "Poésie Corporelle", description: "Créez une vidéo artistique mettant en scène la beauté du corps humain en mouvement.", icon: Sparkles, participants: 85, deadline: "2025-07-30" },
    { id: "challenge3", title: "Ma Première Fois (Réinventée)", description: "Racontez une histoire originale et sensuelle sur le thème de la découverte.", icon: Lightbulb, participants: 210, deadline: "2025-08-10" },
  ];

  const handleVideoSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      setSelectedVideo(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoUrl(null);
    setIsPlaying(false);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-lg font-semibold">Upload Video</div>
          <Button 
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            disabled={!selectedVideo || !title.trim()}
          >
            Publish
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-6">
        {/* Video Upload Area */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/20">
          <CardContent className="p-6">
            {!selectedVideo ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Upload your video</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop your video here, or click to browse
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Video
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleVideoSelect(e.target.files[0])}
                />
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: MP4, MOV, AVI (Max 500MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    src={videoUrl || undefined}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={togglePlayPause}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>File: {selectedVideo.name}</p>
                  <p>Size: {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video Details */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/20">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="Donnez un titre accrocheur à votre vidéo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre vidéo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Séparez les tags par des virgules (ex: musique, dance, fun)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Utilisez des tags pour aider les gens à découvrir votre contenu
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Défis de Création */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-6 h-6 text-yellow-500" />
              <h2 className="text-lg font-semibold">Défis de Création</h2>
            </div>
            <div className="space-y-4">
              {creationChallenges.map((challenge) => {
                const ChallengeIcon = challenge.icon;
                return (
                  <Card key={challenge.id} className="bg-slate-50 dark:bg-slate-800/30 border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex-shrink-0">
                          <ChallengeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-base">{challenge.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2">{challenge.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
                            {challenge.participants && <span><Sparkles className="inline w-3 h-3 mr-1" /> {challenge.participants} participants</span>}
                            {challenge.deadline && <span><Lightbulb className="inline w-3 h-3 mr-1" /> Date limite: {challenge.deadline}</span>}
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="mt-2 sm:mt-0 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 dark:border-yellow-400 dark:text-yellow-300 dark:hover:bg-yellow-900/50 dark:hover:text-yellow-200 self-start sm:self-center"
                        >
                          Participer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upload Status */}
        <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-200/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Upload className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">
                {selectedVideo ? 'Prêt à publier' : 'En attente de vidéo'}
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              {selectedVideo 
                ? 'Votre vidéo sera traitée et disponible pour votre audience après publication.'
                : 'Sélectionnez une vidéo pour commencer.'}
            </p>
          </CardContent>
        </Card>

        <div className="h-20"></div>
      </main>
    </div>
  );
};

export default Studio;
