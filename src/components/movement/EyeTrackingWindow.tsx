import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { CalibrationScreen } from './CalibrationScreen';
import { VideoFeed } from './VideoFeed';
import { usePermissions } from '../../hooks/usePermissions';
import { PermissionsRequest } from '../PermissionsRequest';

export const EyeTrackingWindow: React.FC = () => {
  const [isCalibrated, setIsCalibrated] = useState(false);
  const { hasPermissions, requestPermissions } = usePermissions();

  const handleCalibrationComplete = () => {
    setIsCalibrated(true);
  };

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
        {!isCalibrated ? (
          <CalibrationScreen onComplete={handleCalibrationComplete} />
        ) : (
          <VideoFeed />
        )}
      </div>
    </div>
  );
};