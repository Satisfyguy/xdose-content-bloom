
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface StudioHeaderProps {
  onPublishClick: () => void;
  isPublishDisabled: boolean;
  isPublishing?: boolean;
}

const StudioHeader: React.FC<StudioHeaderProps> = ({ 
  onPublishClick, 
  isPublishDisabled, 
  isPublishing = false 
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-lg font-semibold">Upload Video</div>
        <Button
          variant="default"
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          onClick={onPublishClick}
          disabled={isPublishDisabled}
        >
          {isPublishing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Publishing...
            </>
          ) : (
            'Publish'
          )}
        </Button>
      </div>
    </header>
  );
};

export default StudioHeader;
