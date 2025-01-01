import { useState, useCallback } from 'react';

export const usePermissions = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // Stop the stream immediately after getting permissions
      stream.getTracks().forEach(track => track.stop());
      
      setHasPermissions(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Permission denied for camera and/or microphone access');
      setHasPermissions(false);
      return false;
    }
  }, []);

  return {
    hasPermissions,
    error,
    requestPermissions
  };
};