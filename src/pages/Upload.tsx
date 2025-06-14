import { VideoUpload } from '@/components/VideoUpload';

export default function UploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Video</h1>
      <VideoUpload />
    </div>
  );
}
