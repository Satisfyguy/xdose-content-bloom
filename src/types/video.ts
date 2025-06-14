
export interface Video {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  tier: 'free' | 'fan-access' | 'supporter-plus';
  muxAssetId: string;
  muxPlaybackId: string;
  duration?: number;
  thumbnail?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface VideoUploadData {
  title: string;
  description?: string;
  tags: string[];
  tier: 'free' | 'fan-access' | 'supporter-plus';
  muxAssetId: string;
  muxPlaybackId: string;
}
