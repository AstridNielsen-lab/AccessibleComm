import React, { useEffect } from 'react';
import { Eye } from 'lucide-react';
import { VideoFeed } from './VideoFeed';
import { usePermissions } from '../../hooks/usePermissions';
import { PermissionsRequest } from '../PermissionsRequest';
import { useCamera } from '../../hooks/useCamera';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export const EyeTrackingWindow: React.FC = () => {
  const { hasPermissions, requestPermissions } = usePermissions();
  const { videoRef, startCamera } = useCamera();
  const { isTracking, isLoading, error, startTracking } = useEyeTracking(videoRef);

  useEffect(() => {
    if (hasPermissions) {
      const initCamera = async () => {
        await startCamera();
        await startTracking();
      };
      initCamera();
    }
  }, [hasPermissions, startCamera, startTracking]);

  if (!hasPermissions) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Eye Movement Control
        </h2>
        <PermissionsRequest onPermissionsGranted={requestPermissions} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Eye className="w-6 h-6" />
        Eye Movement Control
      </h2>
      
      <div className="space-y-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        <VideoFeed 
          videoRef={videoRef}
          isTracking={isTracking}
        />
      </div>
    </div>
  );
};