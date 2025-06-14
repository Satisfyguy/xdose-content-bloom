import { useState, useCallback } from 'react';
import { uploadVideoToMux, getAsset, type MuxAsset } from '@/services/mockMuxService';

interface UploadState {
  isUploading: boolean;
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  error: string | null;
  assetId: string | null;
  asset: MuxAsset | null;
}

export const useVideoUpload = () => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    status: 'idle',
    error: null,
    assetId: null,
    asset: null,
  });

  const uploadVideo = useCallback(async (file: File) => {
    setState(prev => ({
      ...prev,
      isUploading: true,
      status: 'uploading',
      progress: 0,
      error: null,
    }));

    try {
      // Upload to Mock Mux
      const assetId = await uploadVideoToMux(file, (progress) => {
        setState(prev => ({ ...prev, progress }));
      });

      setState(prev => ({
        ...prev,
        assetId,
        status: 'processing',
        progress: 100,
      }));

      // Poll for asset status
      const pollAsset = async () => {
        try {
          const asset = await getAsset(assetId);
          setState(prev => ({ ...prev, asset }));

          if (asset.status === 'ready') {
            setState(prev => ({
              ...prev,
              status: 'complete',
              isUploading: false,
            }));
          } else if (asset.status === 'errored') {
            setState(prev => ({
              ...prev,
              status: 'error',
              error: 'Video processing failed',
              isUploading: false,
            }));
          } else {
            // Continue polling
            setTimeout(pollAsset, 1000);
          }
        } catch (error) {
          console.error('Error polling asset:', error);
          setState(prev => ({
            ...prev,
            status: 'error',
            error: 'Failed to check processing status',
            isUploading: false,
          }));
        }
      };

      // Start polling after a delay
      setTimeout(pollAsset, 1000);

    } catch (error) {
      console.error('Upload error:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Upload failed',
        isUploading: false,
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      status: 'idle',
      error: null,
      assetId: null,
      asset: null,
    });
  }, []);

  return {
    ...state,
    uploadVideo,
    reset,
  };
};
