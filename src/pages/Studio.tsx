
import React, { useState, useRef } from 'react';
import { Film, Sparkles, Lightbulb } from "lucide-react"; // Keep only icons used for challenges data

import StudioHeader from '@/components/studio/StudioHeader';
import VideoUploadArea from '@/components/studio/VideoUploadArea';
import VideoDetailsForm from '@/components/studio/VideoDetailsForm';
import CreationChallengesSection from '@/components/studio/CreationChallengesSection';
import type { CreationChallenge } from '@/components/studio/CreationChallengesSection'; // Import type
import UploadStatusCard from '@/components/studio/UploadStatusCard';
// Removed imports: Card, CardContent, Button, Input, Label, Textarea, Badge, ArrowLeft, Upload, Video, Play, Pause, X, Award
// Removed useNavigate as it's handled in StudioHeader

const Studio = () => {
  // navigate is now used in StudioHeader
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [tier, setTier] = useState<string>('free');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'waiting' | 'uploading' | 'processing' | 'complete'>('waiting');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const creationChallenges: CreationChallenge[] = [
    { id: "challenge1", title: "Desire in Black and White", description: "Express passion and eroticism using only shades of gray.", icon: Film, participants: 120, deadline: "2025-07-15" },
    { id: "challenge2", title: "Body Poetry", description: "Create an artistic video showcasing the beauty of the human body in motion.", icon: Sparkles, participants: 85, deadline: "2025-07-30" },
    { id: "challenge3", title: "My First Time (Reimagined)", description: "Tell an original and sensual story on the theme of discovery.", icon: Lightbulb, participants: 210, deadline: "2025-08-10" },
  ];

  const handleVideoSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      setSelectedVideo(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setIsPlaying(false); // Ensure video is paused on new selection

      // Simulate upload progress
      setUploadStatus('uploading');
      setUploadProgress(0);
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) { // Stop at 90 to show final jump to 100
            clearInterval(progressInterval);
            setUploadProgress(100);
            setUploadStatus('processing');
            setTimeout(() => {
              setUploadStatus('complete');
            }, 1500); // Simulate processing time
            return 100;
          }
          return prev + 10;
        });
      }, 200);
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
  
  // Need to update videoRef.current.onPlay and onPause if we want to sync isPlaying state correctly
  // when native controls (if enabled) or other sources trigger play/pause
  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);
        return () => {
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
        };
    }
  }, [videoRef]);


  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoUrl(null);
    setIsPlaying(false);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    if (fileInputRef.current) { // Reset file input
        fileInputRef.current.value = "";
    }
    // Reset progress
    setUploadProgress(0);
    setUploadStatus('waiting');
  };

  const handlePublish = () => {
    // Placeholder for publish logic
    console.log('Publishing video:', { title, description, tags, tier, video: selectedVideo?.name });
    // Potentially navigate away or show a success message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <StudioHeader
        onPublishClick={handlePublish}
        isPublishDisabled={!selectedVideo || !title.trim() || uploadStatus !== 'complete'}
      />

      <main className="max-w-md mx-auto p-6 space-y-6">
        <VideoUploadArea
          selectedVideo={selectedVideo}
          videoUrl={videoUrl}
          isPlaying={isPlaying}
          isDragging={isDragging}
          onVideoSelect={handleVideoSelect}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          togglePlayPause={togglePlayPause}
          removeVideo={removeVideo}
          videoRef={videoRef}
          fileInputRef={fileInputRef}
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

        <UploadStatusCard
          selectedVideo={selectedVideo}
          uploadStatus={uploadStatus}
          uploadProgress={uploadProgress}
        />

        <div className="h-20"></div> {/* Spacer for bottom */}
      </main>
    </div>
  );
};

export default Studio;
