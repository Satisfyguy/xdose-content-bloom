
import Mux from '@mux/mux-node';

// Initialize Mux client
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID || 'your-mux-token-id',
  tokenSecret: process.env.MUX_TOKEN_SECRET || 'your-mux-token-secret',
});

export interface MuxAsset {
  id: string;
  status: 'waiting' | 'preparing' | 'ready' | 'errored';
  playback_ids?: Array<{
    id: string;
    policy: 'public' | 'signed';
  }>;
  duration?: number;
  max_stored_resolution?: string;
}

export interface MuxUploadUrl {
  id: string;
  url: string;
  timeout: number;
}

// Create a direct upload URL for video files
export const createDirectUpload = async (): Promise<MuxUploadUrl> => {
  try {
    const upload = await mux.video.uploads.create({
      cors_origin: window.location.origin,
      new_asset_settings: {
        playback_policy: ['public'],
        encoding_tier: 'baseline',
      },
    });

    return {
      id: upload.id,
      url: upload.url,
      timeout: upload.timeout,
    };
  } catch (error) {
    console.error('Error creating direct upload:', error);
    throw new Error('Failed to create upload URL');
  }
};

// Get asset information by ID
export const getAsset = async (assetId: string): Promise<MuxAsset> => {
  try {
    const asset = await mux.video.assets.retrieve(assetId);
    return {
      id: asset.id,
      status: asset.status as MuxAsset['status'],
      playback_ids: asset.playback_ids,
      duration: asset.duration,
      max_stored_resolution: asset.max_stored_resolution,
    };
  } catch (error) {
    console.error('Error retrieving asset:', error);
    throw new Error('Failed to retrieve asset information');
  }
};

// Get playback URL for a video
export const getPlaybackUrl = (playbackId: string): string => {
  return `https://stream.mux.com/${playbackId}.m3u8`;
};

// Upload file to Mux using direct upload
export const uploadVideoToMux = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // Create direct upload URL
    const upload = await createDirectUpload();
    
    // Upload file to Mux
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
          // Parse response to get asset ID
          const response = JSON.parse(xhr.responseText);
          resolve(response.data.asset_id);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('PUT', upload.url);
      xhr.send(file);
    });
  } catch (error) {
    console.error('Error uploading to Mux:', error);
    throw new Error('Failed to upload video');
  }
};
