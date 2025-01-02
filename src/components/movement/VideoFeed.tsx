import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { CameraError } from '../../types/camera';

interface VideoFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isTracking: boolean;
  error?: CameraError | null;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ 
  videoRef, 
  isTracking,
  error 
}) => {
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
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error.message}</span>
          </div>
        </div>
      )}

      {isTracking && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Tracking Active
        </div>
      )}
    </div>
  );
};