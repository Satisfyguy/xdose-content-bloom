
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Upload, Play, Pause, X } from 'lucide-react';

interface VideoUploadAreaProps {
  selectedVideo: File | null;
  videoUrl: string | null;
  isPlaying: boolean;
  isDragging: boolean;
  onVideoSelect: (file: File) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  togglePlayPause: () => void;
  removeVideo: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const VideoUploadArea: React.FC<VideoUploadAreaProps> = ({
  selectedVideo,
  videoUrl,
  isPlaying,
  isDragging,
  onVideoSelect,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  togglePlayPause,
  removeVideo,
  videoRef,
  fileInputRef,
}) => {
  return (
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
              onChange={(e) => e.target.files && onVideoSelect(e.target.files[0])}
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
                onPlay={() => { /* Handled by parent via togglePlayPause */ }}
                onPause={() => { /* Handled by parent via togglePlayPause */ }}
                controls={false} // Controls are custom
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
  );
};

export default VideoUploadArea;
