import { useState, useCallback } from 'react';

export const useCamera = () => {
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      return mediaStream;
    } catch (err) {
      setError('Failed to start camera');
      console.error(err);
      return null;
    }
  }, []);

  return {
    error,
    startCamera
  };
};