
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface UploadStatusCardProps {
  selectedVideo: File | null;
  uploadStatus: 'waiting' | 'uploading' | 'processing' | 'complete';
  uploadProgress: number;
}

const UploadStatusCard: React.FC<UploadStatusCardProps> = ({ selectedVideo, uploadStatus, uploadProgress }) => {
  const getStatusInfo = () => {
    if (!selectedVideo) {
      return {
        icon: <Upload className="w-5 h-5 text-purple-600" />,
        title: 'Waiting for video',
        message: 'Select a video to get started.',
        showProgress: false,
      };
    }
    switch (uploadStatus) {
      case 'uploading':
        return {
          icon: <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />,
          title: `Uploading... ${uploadProgress}%`,
          message: 'Please keep this page open.',
          showProgress: true,
        };
      case 'processing':
        return {
          icon: <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />,
          title: 'Processing...',
          message: 'Your video is being processed for different formats.',
          showProgress: true,
        };
      case 'complete':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          title: 'Ready to publish',
          message: 'Your video will be available after publication.',
          showProgress: false,
        };
      default: // waiting (but with a video selected)
        return {
          icon: <Upload className="w-5 h-5 text-purple-600" />,
          title: 'Ready to Upload',
          message: 'Your video is selected and ready.',
          showProgress: false,
        };
    }
  };

  const { icon, title, message, showProgress } = getStatusInfo();

  return (
    <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-200/20">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {icon}
          <h3 className="font-semibold text-purple-800 dark:text-purple-200">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{message}</p>
        {showProgress && (
          <Progress value={uploadProgress} className="h-2" />
        )}
      </CardContent>
    </Card>
  );
};

export default UploadStatusCard;
