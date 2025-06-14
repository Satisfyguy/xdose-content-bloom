
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface FeedPostSkeletonProps {
  variant: 'large' | 'small';
}

const FeedPostSkeleton = ({ variant }: FeedPostSkeletonProps) => {
  const imageAspectRatio = variant === 'large' ? 'aspect-video' : 'aspect-square';

  return (
    <div className="w-full">
      <Skeleton className={`w-full ${imageAspectRatio} rounded-xl`} />
      <div className="mt-2 px-1">
        {variant === 'large' ? (
          <>
            <div className="flex justify-between items-start mb-2">
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
            </div>
          </>
        ) : ( // Variante Small
          <>
            <Skeleton className="h-4 w-24 mt-1 mb-1" />
            <Skeleton className="h-3 w-16 mb-1.5" />
            <div className="flex items-center space-x-3">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedPostSkeleton;

