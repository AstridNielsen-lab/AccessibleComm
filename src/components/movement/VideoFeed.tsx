import React, { useRef, useEffect } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { useEyeTracking } from '../../hooks/useEyeTracking';

export const VideoFeed: React.FC = () => {
  const { videoRef, startCamera } = useCamera();
  const { isTracking, startTracking } = useEyeTracking(videoRef);

  useEffect(() => {
    const initializeVideo = async () => {
      await startCamera();
      await startTracking();
    };
    initializeVideo();
  }, []);

  return (
    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      {isTracking && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Tracking Active
        </div>
      )}
    </div>
  );
};