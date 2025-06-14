
// Mock database service for frontend-only application
// In a production app, this would be replaced with API calls to a backend service

export interface CreateVideoData {
  title: string;
  description?: string;
  muxAssetId: string;
  muxPlaybackId: string;
  tier: 'FREE' | 'FAN_ACCESS' | 'SUPPORTER_PLUS' | 'VIP';
  tags: string[];
  creatorId: string;
}

export interface VideoWithCreator {
  id: string;
  title: string;
  description: string | null;
  muxAssetId: string;
  muxPlaybackId: string;
  tier: string;
  tags: string[];
  likes: number;
  views: number;
  createdAt: Date;
  creator: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

// Mock storage using localStorage
const VIDEOS_KEY = 'mock_videos';

const getStoredVideos = (): VideoWithCreator[] => {
  try {
    const stored = localStorage.getItem(VIDEOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveVideos = (videos: VideoWithCreator[]) => {
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos));
};

// Create a new video record
export const createVideo = async (data: CreateVideoData): Promise<VideoWithCreator> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const video: VideoWithCreator = {
      id: `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: data.title,
      description: data.description || null,
      muxAssetId: data.muxAssetId,
      muxPlaybackId: data.muxPlaybackId,
      tier: data.tier,
      tags: data.tags,
      likes: 0,
      views: 0,
      createdAt: new Date(),
      creator: {
        id: data.creatorId,
        name: "Mock Creator", // In real app, this would come from user data
        avatar: null,
      },
    };

    const videos = getStoredVideos();
    videos.unshift(video);
    saveVideos(videos);

    return video;
  } catch (error) {
    console.error('Error creating video:', error);
    throw new Error('Failed to create video');
  }
};

// Get videos by creator
export const getVideosByCreator = async (creatorId: string): Promise<VideoWithCreator[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const videos = getStoredVideos();
    return videos.filter(video => video.creator.id === creatorId);
  } catch (error) {
    console.error('Error fetching videos by creator:', error);
    throw new Error('Failed to fetch videos');
  }
};

// Get all videos with pagination
export const getVideos = async (
  page: number = 1,
  limit: number = 20,
  tier?: string
): Promise<VideoWithCreator[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let videos = getStoredVideos();
    
    if (tier) {
      videos = videos.filter(video => video.tier === tier);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return videos.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw new Error('Failed to fetch videos');
  }
};

// Update video views
export const incrementVideoViews = async (videoId: string): Promise<void> => {
  try {
    const videos = getStoredVideos();
    const videoIndex = videos.findIndex(v => v.id === videoId);
    
    if (videoIndex !== -1) {
      videos[videoIndex].views += 1;
      saveVideos(videos);
    }
  } catch (error) {
    console.error('Error incrementing video views:', error);
  }
};

// Update video likes
export const incrementVideoLikes = async (videoId: string): Promise<void> => {
  try {
    const videos = getStoredVideos();
    const videoIndex = videos.findIndex(v => v.id === videoId);
    
    if (videoIndex !== -1) {
      videos[videoIndex].likes += 1;
      saveVideos(videos);
    }
  } catch (error) {
    console.error('Error incrementing video likes:', error);
  }
};
