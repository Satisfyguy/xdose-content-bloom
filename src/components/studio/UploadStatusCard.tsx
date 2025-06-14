
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from 'lucide-react';

interface UploadStatusCardProps {
  selectedVideo: File | null;
}

const UploadStatusCard: React.FC<UploadStatusCardProps> = ({ selectedVideo }) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-purple-200/20">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Upload className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-800">
            {selectedVideo ? 'Ready to publish' : 'Waiting for video'}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          {selectedVideo
            ? 'Your video will be processed and available to your audience after publication.'
            : 'Select a video to get started.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default UploadStatusCard;
