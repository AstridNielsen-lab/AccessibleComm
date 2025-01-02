import { useState, useEffect, useCallback } from 'react';
import { useModelLoader } from './useModelLoader';

export const useEyeTracking = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isTracking, setIsTracking] = useState(false);
  const { model, loadModel, isLoading, error } = useModelLoader();

  const startTracking = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      const detector = await loadModel();
      if (!detector) return;

      setIsTracking(true);

      const detect = async () => {
        if (!videoRef.current || !isTracking) return;

        try {
          const predictions = await detector.estimateFaces(videoRef.current);
          if (predictions.length > 0) {
            const eyeData = predictions[0].keypoints.filter((kp: any) => 
              kp.name && (kp.name.includes('leftEye') || kp.name.includes('rightEye'))
            );
            // Process eye data here
          }
          if (isTracking) {
            requestAnimationFrame(detect);
          }
        } catch (error) {
          if (isTracking) {
            requestAnimationFrame(detect);
          }
        }
      };

      detect();
    } catch (error) {
      console.error('Failed to start eye tracking:', error);
      setIsTracking(false);
    }
  }, [videoRef, isTracking, loadModel]);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    isTracking,
    isLoading,
    error,
    startTracking,
    stopTracking
  };
};