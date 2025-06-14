
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export interface VideoPlayerProps {
  options: any;
  onReady?: (player: any) => void;
  className?: string;
  isPlaying?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options, onReady, className, isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // S'assurer que le lecteur n'est initialisé qu'une seule fois
    if (videoRef.current && !playerRef.current) {
      const videoElement = videoRef.current;

      playerRef.current = videojs(videoElement, options, function onPlayerReady(this: any) {
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

  useEffect(() => {
    const player = playerRef.current;
    if (player && !player.isDisposed()) {
      if (isPlaying) {
        player.play().catch((e: any) => console.error("La lecture de la vidéo a échoué", e));
      } else {
        if (!player.paused()) {
          player.pause();
        }
      }
    }
  }, [isPlaying]);

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
