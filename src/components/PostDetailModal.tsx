
import React, { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import type { Post } from '@/types';
import videojs from 'video.js';
import { X } from 'lucide-react';

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
  const videoJsOptions: videojs.PlayerOptions = {
    autoplay: true,
    muted: false,
    loop: true,
    playsinline: true,
    controls: true,
    preload: 'auto',
    fluid: true,
    sources: [{
      src: post.content,
      type: 'video/mp4'
    }]
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full mx-4 p-4 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-white z-10 p-1 rounded-full bg-black/50 hover:bg-black/75 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="aspect-video">
            <VideoPlayer options={videoJsOptions} isPlaying={true} />
        </div>
        <div className="mt-4 text-white">
            <h3 className="font-semibold text-lg">{post.creator}</h3>
            <p className="text-sm text-gray-400">{post.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
