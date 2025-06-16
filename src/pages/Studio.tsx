import React, { useState, useRef, useEffect } from 'react';
import { Film, Sparkles, Lightbulb } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { createVideo } from '@/services/mockDatabaseService';
import { toast } from "sonner";

import StudioHeader from '@/components/studio/StudioHeader';
import MuxVideoUpload from '@/components/studio/MuxVideoUpload';
import VideoDetailsForm from '@/components/studio/VideoDetailsForm';
import CreationChallengesSection from '@/components/studio/CreationChallengesSection';
import type { CreationChallenge } from '@/components/studio/CreationChallengesSection';

const Studio = () => {
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [muxAssetId, setMuxAssetId] = useState<string | null>(null);
  const [muxPlaybackId, setMuxPlaybackId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [tier, setTier] = useState<string>('FREE');
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pollingUploadId, setPollingUploadId] = useState<string | null>(null);

  const creationChallenges: CreationChallenge[] = [
    { id: "challenge1", title: "Desire in Black and White", description: "Express passion and eroticism using only shades of gray.", icon: Film, participants: 120, deadline: "2025-07-15" },
    { id: "challenge2", title: "Body Poetry", description: "Create an artistic video showcasing the beauty of the human body in motion.", icon: Sparkles, participants: 85, deadline: "2025-07-30" },
    { id: "challenge3", title: "My First Time (Reimagined)", description: "Tell an original and sensual story on the theme of discovery.", icon: Lightbulb, participants: 210, deadline: "2025-08-10" },
  ];

  // Polling pour récupérer le playbackId après upload
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pollingUploadId && !muxPlaybackId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/videos?uploadId=${pollingUploadId}`);
          if (res.ok) {
            const video = await res.json();
            if (video && video.muxPlaybackId) {
              setMuxPlaybackId(video.muxPlaybackId);
              setMuxAssetId(video.muxAssetId);
              clearInterval(interval);
            }
          }
        } catch (e) {}
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [pollingUploadId, muxPlaybackId]);

  const handleVideoSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      setSelectedVideo(file);
    }
  };

  const handleUploadComplete = (assetId: string, uploadId: string) => {
    // Always extract the pure ID if a URL is passed
    let id = uploadId;
    if (id && id.startsWith('http')) {
      const match = id.match(/\/upload\/([\w\d]+)/);
      if (match) id = match[1];
    }
    console.log('handleUploadComplete (final) uploadId:', id);
    setPollingUploadId(id);
    setMuxAssetId(null);
    setMuxPlaybackId(null);
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

  const removeVideo = () => {
    setSelectedVideo(null);
    setMuxAssetId(null);
    setMuxPlaybackId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePublish = async () => {
    if (!muxAssetId || !muxPlaybackId || !user) {
      toast.error('Video not ready for publishing');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a video title');
      return;
    }

    setIsPublishing(true);
    
    try {
      const videoData = {
        title: title.trim(),
        description: description.trim() || undefined,
        muxAssetId,
        muxPlaybackId,
        tier: tier as 'FREE' | 'FAN_ACCESS' | 'SUPPORTER_PLUS' | 'VIP',
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        creatorId: user.id,
      };

      const createdVideo = await createVideo(videoData);
      
      toast.success('Video published successfully!');
      console.log('Published video:', createdVideo);
      
      // Reset form
      setSelectedVideo(null);
      setMuxAssetId(null);
      setMuxPlaybackId(null);
      setTitle('');
      setDescription('');
      setTags('');
      setTier('FREE');
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
    } catch (error) {
      console.error('Error publishing video:', error);
      toast.error('Failed to publish video. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const isPublishReady = selectedVideo && title.trim() && muxAssetId && muxPlaybackId && !isPublishing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <StudioHeader
        onPublishClick={handlePublish}
        isPublishDisabled={!isPublishReady}
        isPublishing={isPublishing}
      />

      <main className="max-w-md mx-auto p-6 space-y-6">
        <MuxVideoUpload
          selectedVideo={selectedVideo}
          onVideoSelect={handleVideoSelect}
          onVideoRemove={removeVideo}
          onUploadComplete={handleUploadComplete}
          isDragging={isDragging}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          fileInputRef={fileInputRef}
          playbackId={muxPlaybackId}
          creatorId={user?.id}
        />

        <VideoDetailsForm
          title={title}
          onTitleChange={setTitle}
          description={description}
          onDescriptionChange={setDescription}
          tags={tags}
          onTagsChange={setTags}
          tier={tier}
          onTierChange={setTier}
        />

        <CreationChallengesSection challenges={creationChallenges} />

        <div className="h-20"></div>
      </main>
    </div>
  );
};

export default Studio;
