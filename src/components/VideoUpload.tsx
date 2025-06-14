import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function VideoUpload() {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tier, setTier] = useState('FREE');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a video file');
      return;
    }

    try {
      setIsUploading(true);

      // 1. Obtenir l'URL d'upload depuis notre API
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, tier }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, videoId } = await response.json();

      // 2. Uploader la vidéo directement vers Mux
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'video/mp4',
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload video');
      }

      toast.success('Video uploaded successfully!');
      // Réinitialiser le formulaire
      setTitle('');
      setDescription('');
      setTier('FREE');
      setFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter video title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter video description"
        />
      </div>

      <div>
        <label htmlFor="tier" className="block text-sm font-medium mb-1">
          Access Tier
        </label>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger>
            <SelectValue placeholder="Select access tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FREE">Free</SelectItem>
            <SelectItem value="FAN_ACCESS">Fan Access</SelectItem>
            <SelectItem value="SUPPORTER_PLUS">Supporter Plus</SelectItem>
            <SelectItem value="VIP">VIP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="video" className="block text-sm font-medium mb-1">
          Video File
        </label>
        <Input
          id="video"
          type="file"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Video'}
      </Button>
    </form>
  );
} 