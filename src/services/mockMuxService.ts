
// Mock Mux service for frontend-only application
// In a production app, this would be replaced with actual Mux API calls

export interface MuxAsset {
  id: string;
  status: 'waiting' | 'preparing' | 'ready' | 'errored';
  playback_ids?: Array<{
    id: string;
    policy: 'public' | 'signed' | 'drm';
  }>;
  duration?: number;
  max_stored_resolution?: string;
}

export interface MuxUploadUrl {
  id: string;
  url: string;
  timeout: number;
}

// Mock storage for assets
const MOCK_ASSETS_KEY = 'mock_mux_assets';

const getStoredAssets = (): Record<string, MuxAsset> => {
  try {
    const stored = localStorage.getItem(MOCK_ASSETS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveAsset = (assetId: string, asset: MuxAsset) => {
  const assets = getStoredAssets();
  assets[assetId] = asset;
  localStorage.setItem(MOCK_ASSETS_KEY, JSON.stringify(assets));
};

// Create a mock direct upload URL
export const createDirectUpload = async (): Promise<MuxUploadUrl> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    id: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    url: 'mock://upload-url',
    timeout: 3600,
  };
};

// Get mock asset information
export const getAsset = async (assetId: string): Promise<MuxAsset> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const assets = getStoredAssets();
  return assets[assetId] || {
    id: assetId,
    status: 'errored',
  };
};

// Get mock playback URL
export const getPlaybackUrl = (playbackId: string): string => {
  // Return a mock video URL for testing
  return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
};

// Mock video upload to Mux
export const uploadVideoToMux = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const assetId = `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const playbackId = `playback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Create initial asset
  const asset: MuxAsset = {
    id: assetId,
    status: 'waiting',
  };
  saveAsset(assetId, asset);
  
  // Simulate upload progress
  if (onProgress) {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      onProgress(i);
    }
  }
  
  // Simulate processing phases
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Update to preparing
  const preparingAsset = {
    ...asset,
    status: 'preparing' as const,
  };
  saveAsset(assetId, preparingAsset);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Update to ready
  const readyAsset: MuxAsset = {
    ...asset,
    status: 'ready',
    playback_ids: [{
      id: playbackId,
      policy: 'public',
    }],
    duration: 120, // 2 minutes mock duration
    max_stored_resolution: '1080p',
  };
  saveAsset(assetId, readyAsset);
  
  return assetId;
};
