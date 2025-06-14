
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Story {
  id: number;
  creator: string;
  avatar: string;
  hasNew: boolean;
}

interface StoryViewerProps {
  stories: Story[];
}

const StoryViewer = ({ stories }: StoryViewerProps) => {
  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center space-y-2 min-w-[70px]">
          <div className={`p-1 rounded-full ${story.hasNew ? 'bg-gradient-to-tr from-purple-500 to-pink-500' : 'bg-gray-300'}`}>
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src={story.avatar} alt={story.creator} />
              <AvatarFallback>{story.creator.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[70px]">
            {story.creator}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoryViewer;
