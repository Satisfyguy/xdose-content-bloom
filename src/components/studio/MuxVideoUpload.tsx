import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Upload, Play, Pause, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useVideoUpload } from '@/hooks/useVideoUpload';
import { getPlaybackUrl } from '@/services/muxService';

interface MuxVideoUploadProps {
  selectedVideo: File | null;
  onVideoSelect: (file: File) => void;
  onVideoRemove: () => void;
  onUploadComplete: (assetId: string, playbackId: string) => void;
  isDragging: boolean;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  playbackId?: string | null;
  creatorId?: string;
}

const MuxVideoUpload: React.FC<MuxVideoUploadProps> = ({
  selectedVideo,
  onVideoSelect,
  onVideoRemove,
  onUploadComplete,
  isDragging,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  fileInputRef,
  playbackId,
  creatorId,
}) => {
  const { status, progress, error, uploadUrl, uploadId, requestUploadUrl, uploadFile, reset } = useVideoUpload();

  const handleFileSelect = async (file: File) => {
    onVideoSelect(file);
    // 1. Demander une URL d'upload
    const uploadData = await requestUploadUrl();
    if (!uploadData) return;
    // 2. Uploader le fichier sur l'uploadUrl
    await uploadFile(file, uploadData.uploadUrl);
    // 3. Créer la vidéo en base
    await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: file.name,
        description: '',
        tags: [],
        tier: 'FREE',
        creatorId: creatorId || 'unknown',
        muxUploadId: uploadData.uploadId,
      }),
    });
    // 4. Le webhook Mux complètera la vidéo (assetId, playbackId)
  };

  const handleRemoveVideo = () => {
    onVideoRemove();
    reset();
  };

  React.useEffect(() => {
    if (status === 'complete' && uploadId) {
      onUploadComplete(uploadId, uploadUrl || '');
    }
  }, [status, uploadUrl, uploadId, onUploadComplete]);

  const getStatusInfo = () => {
    switch (status) {
      case 'uploading':
        return {
          icon: <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />,
          title: `Uploading... ${progress}%`,
          message: 'Your video is being uploaded to our servers.',
          color: 'blue',
        };
      case 'processing':
        return {
          icon: <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />,
          title: 'Processing...',
          message: 'Your video is being processed and optimized.',
          color: 'purple',
        };
      case 'complete':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          title: 'Ready!',
          message: 'Your video is ready to be published.',
          color: 'green',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          title: 'Error',
          message: error || 'Something went wrong during upload.',
          color: 'red',
        };
      default:
        return null;
    }
  };

  const statusInfo = getStatusInfo();

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
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            />
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: MP4, MOV, AVI, WebM (Max 500MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {playbackId ? (
                <video
                  src={getPlaybackUrl(playbackId)}
                  className="w-full h-full object-cover"
                  controls
                  poster=""
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm opacity-75">Video preview will appear after processing</p>
                  </div>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveVideo}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>File: {selectedVideo.name}</p>
              <p>Size: {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>

            {statusInfo && (
              <div className={`p-4 rounded-lg border ${
                statusInfo.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                statusInfo.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                statusInfo.color === 'green' ? 'bg-green-50 border-green-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {statusInfo.icon}
                  <h4 className={`font-semibold ${
                    statusInfo.color === 'blue' ? 'text-blue-800' :
                    statusInfo.color === 'purple' ? 'text-purple-800' :
                    statusInfo.color === 'green' ? 'text-green-800' :
                    'text-red-800'
                  }`}>
                    {statusInfo.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">{statusInfo.message}</p>
                {status === 'uploading' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MuxVideoUpload;
