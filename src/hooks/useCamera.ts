import { useState, useEffect, useRef } from 'react';
import { CameraError } from '../types/camera';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<CameraError | null>(null);
  const isInitializingRef = useRef(false);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    if (isInitializingRef.current || streamRef.current) {
      return;
    }

    // Stop any existing streams first
    stopCamera();

    isInitializingRef.current = true;
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = mediaStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Wait for video metadata to load before playing
        await new Promise((resolve) => {
          if (!videoRef.current) return;
          videoRef.current.onloadedmetadata = resolve;
        });

        // Ensure video element still exists before playing
        if (videoRef.current) {
          await videoRef.current.play();
        }
      }
    } catch (err) {
      const error = err as Error;
      setError({
        type: 'camera_error',
        message: error.message,
        details: error
      });
      console.error('Camera error:', error);
    } finally {
      isInitializingRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    error,
    startCamera,
    stopCamera,
    isInitializing: isInitializingRef.current
  };
};