import React from 'react';
import { Camera, Mic } from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';

interface PermissionsRequestProps {
  onPermissionsGranted: () => void;
}

export const PermissionsRequest: React.FC<PermissionsRequestProps> = ({ onPermissionsGranted }) => {
  const { hasPermissions, error, requestPermissions } = usePermissions();

  const handleRequestPermissions = async () => {
    const granted = await requestPermissions();
    if (granted) {
      onPermissionsGranted();
    }
  };

  if (hasPermissions) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Permission Required</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-blue-600" />
            <span>Camera access for movement detection</span>
          </div>
          <div className="flex items-center gap-3">
            <Mic className="w-6 h-6 text-blue-600" />
            <span>Microphone access for voice features</span>
          </div>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <button
          onClick={handleRequestPermissions}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Allow Access
        </button>
        
        <p className="mt-4 text-sm text-gray-600">
          These permissions are required for the application to function properly.
          You can always change these settings in your browser later.
        </p>
      </div>
    </div>
  );
};