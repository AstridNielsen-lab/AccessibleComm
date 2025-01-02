import React, { useEffect } from 'react';

interface VideoFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isTracking: boolean;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ videoRef, isTracking }) => {
  // Ensure video fills container while maintaining aspect ratio
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.style.objectFit = 'cover';
      video.style.width = '100%';
      video.style.height = '100%';
    }
  }, [videoRef]);

  return (
    <div className="relative aspect-video mb-6 bg-gray-100 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      {isTracking && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Tracking Active
        </div>
      )}
    </div>
  );
};