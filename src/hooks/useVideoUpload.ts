import { useState, useCallback } from 'react';

interface UploadState {
  isUploading: boolean;
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  error: string | null;
  uploadUrl: string | null;
  uploadId: string | null;
}

export const useVideoUpload = () => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    status: 'idle',
    error: null,
    uploadUrl: null,
    uploadId: null,
  });

  // 1. Demander une URL d'upload à l'API
  const requestUploadUrl = useCallback(async () => {
    setState(prev => ({ ...prev, isUploading: true, status: 'uploading', error: null }));
    try {
      const res = await fetch('/api/videos/upload-url', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to get upload URL');
      let { uploadUrl, uploadId } = await res.json();
      // Log for debug
      console.log('API uploadUrl:', uploadUrl, 'uploadId:', uploadId);
      // Fallback: if uploadId is missing or looks like a URL, extract the ID from the URL
      if (!uploadId && uploadUrl) {
        const match = uploadUrl.match(/\/upload\/([\w\d]+)/);
        if (match) uploadId = match[1];
      } else if (uploadId && uploadId.startsWith('http')) {
        const match = uploadId.match(/\/upload\/([\w\d]+)/);
        if (match) uploadId = match[1];
      }
      setState(prev => ({ ...prev, uploadUrl, uploadId, status: 'idle', isUploading: false }));
      return { uploadUrl, uploadId };
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, status: 'error', isUploading: false }));
      return null;
    }
  }, []);

  // 2. Uploader le fichier sur l'uploadUrl
  const uploadFile = useCallback(async (file: File, uploadUrl: string, onProgress?: (progress: number) => void) => {
    setState(prev => ({ ...prev, isUploading: true, status: 'uploading', error: null }));
    try {
      const xhr = new XMLHttpRequest();
      return await new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setState(prev => ({ ...prev, progress }));
            onProgress(progress);
          }
        });
        xhr.addEventListener('load', () => {
          if (xhr.status === 200 || xhr.status === 201) {
            setState(prev => ({ ...prev, status: 'complete', isUploading: false, progress: 100 }));
            resolve();
          } else {
            setState(prev => ({ ...prev, status: 'error', isUploading: false, error: 'Upload failed' }));
            reject(new Error('Upload failed'));
          }
        });
        xhr.addEventListener('error', () => {
          setState(prev => ({ ...prev, status: 'error', isUploading: false, error: 'Upload failed' }));
          reject(new Error('Upload failed'));
        });
        xhr.open('PUT', uploadUrl);
        xhr.send(file);
      });
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, status: 'error', isUploading: false }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isUploading: false,
      progress: 0,
      status: 'idle',
      error: null,
      uploadUrl: null,
      uploadId: null,
    });
  }, []);

  return {
    ...state,
    requestUploadUrl,
    uploadFile,
    reset,
  };
};
