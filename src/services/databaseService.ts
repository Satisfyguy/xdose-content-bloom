
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

// Create a new video record
export const createVideo = async (data: CreateVideoData): Promise<VideoWithCreator> => {
  try {
    const video = await prisma.video.create({
      data: {
        title: data.title,
        description: data.description,
        muxAssetId: data.muxAssetId,
        muxPlaybackId: data.muxPlaybackId,
        tier: data.tier,
        tags: data.tags,
        creatorId: data.creatorId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return video;
  } catch (error) {
    console.error('Error creating video:', error);
    throw new Error('Failed to create video');
  }
};

// Get videos by creator
export const getVideosByCreator = async (creatorId: string): Promise<VideoWithCreator[]> => {
  try {
    const videos = await prisma.video.findMany({
      where: {
        creatorId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return videos;
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
    const videos = await prisma.video.findMany({
      where: tier ? { tier } : undefined,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw new Error('Failed to fetch videos');
  }
};

// Update video views
export const incrementVideoViews = async (videoId: string): Promise<void> => {
  try {
    await prisma.video.update({
      where: { id: videoId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error incrementing video views:', error);
  }
};

// Update video likes
export const incrementVideoLikes = async (videoId: string): Promise<void> => {
  try {
    await prisma.video.update({
      where: { id: videoId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error incrementing video likes:', error);
  }
};

export default prisma;
