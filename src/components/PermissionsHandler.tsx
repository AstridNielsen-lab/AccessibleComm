import React, { useState } from 'react';
import { Camera, Mic, AlertCircle } from 'lucide-react';

interface PermissionsHandlerProps {
  onPermissionsGranted: () => void;
}

export const PermissionsHandler: React.FC<PermissionsHandlerProps> = ({ onPermissionsGranted }) => {
  const [error, setError] = useState<string | null>(null);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // Stop the stream immediately after getting permissions
      stream.getTracks().forEach(track => track.stop());
      
      onPermissionsGranted();
      setError(null);
    } catch (err) {
      setError('Permission denied. Please allow camera and microphone access.');
      console.error('Permission error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Permission Required</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Camera className="w-6 h-6 text-blue-600" />
            <span>Camera access for gesture detection</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Mic className="w-6 h-6 text-blue-600" />
            <span>Microphone access for voice features</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={requestPermissions}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Allow Access
        </button>
        
        <p className="mt-4 text-sm text-gray-600">
          These permissions are required for the application to function properly.
          You can manage these permissions in your browser settings at any time.
        </p>
      </div>
    </div>
  );
};