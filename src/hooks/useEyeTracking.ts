import { useState, useEffect } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const useEyeTracking = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isTracking, setIsTracking] = useState(false);
  const [detector, setDetector] = useState<any>(null);

  const startTracking = async () => {
    if (!videoRef.current) return;

    try {
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detector = await faceLandmarksDetection.createDetector(model, {
        runtime: 'tfjs',
        refineLandmarks: true,
        maxFaces: 1
      });

      setDetector(detector);
      setIsTracking(true);

      const detect = async () => {
        if (!videoRef.current || !isTracking) return;

        try {
          const predictions = await detector.estimateFaces(videoRef.current);
          if (predictions.length > 0) {
            // Process eye tracking data
            const eyeData = predictions[0].keypoints.filter((kp: any) => 
              kp.name && (kp.name.includes('leftEye') || kp.name.includes('rightEye'))
            );
            // You can process eye data here
          }
          if (isTracking) {
            requestAnimationFrame(detect);
          }
        } catch (error) {
          console.error('Detection error:', error);
        }
      };

      detect();
    } catch (error) {
      console.error('Initialization error:', error);
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
    setDetector(null);
  };

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    isTracking,
    startTracking,
    stopTracking
  };
};