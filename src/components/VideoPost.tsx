
import React, { useMemo } from 'react';
import VideoPlayer from './VideoPlayer';
import videojs from 'video.js';

interface VideoPostProps {
  videoUrl: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const VideoPost: React.FC<VideoPostProps> = ({ videoUrl, alt, className, onClick }) => {
  const videoJsOptions = useMemo(() => ({
    autoplay: false,
    muted: true,
    loop: false,
    playsinline: true,
    controls: false,
    preload: 'metadata',
    fluid: true,
    sources: [{
      src: videoUrl,
      type: 'video/mp4'
    }]
  }), [videoUrl]);

  return (
    <div 
      className={`aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 ${className}`}
      onClick={onClick}
    >
      <VideoPlayer options={videoJsOptions} isPlaying={false} className="w-full h-full" />
    </div>
  );
};

export default VideoPost;
