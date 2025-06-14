import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';

export interface VideoPlayerProps {
  options: videojs.PlayerOptions;
  onReady?: (player: videojs.Player) => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options, onReady, className }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    // S'assurer que le lecteur n'est initialisé qu'une seule fois
    if (videoRef.current && !playerRef.current) {
      const videoElement = videoRef.current;

      playerRef.current = videojs(videoElement, options, function onPlayerReady() {
        if (onReady) {
          onReady(this);
        }
      });
    } else {
        // Le lecteur est déjà initialisé, on met à jour la source
        const player = playerRef.current;
        if(player && options.sources) {
            player.src(options.sources);
        }
    }
  }, [options, onReady]);

  // Détruire le lecteur lorsque le composant est démonté
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className={className}>
      <video ref={videoRef} className="video-js vjs-big-play-centered w-full h-full" />
    </div>
  );
};

export default VideoPlayer;
