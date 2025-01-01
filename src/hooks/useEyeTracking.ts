import { useState, useEffect } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const useEyeTracking = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isTracking, setIsTracking] = useState(false);
  const [eyePositions, setEyePositions] = useState<any>(null);
  
  const startTracking = async () => {
    if (!videoRef.current) return;

    try {
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detector = await faceLandmarksDetection.createDetector(model, {
        runtime: 'tfjs',
        refineLandmarks: true,
      });

      setIsTracking(true);

      const detect = async () => {
        if (!videoRef.current || !isTracking) return;

        const faces = await detector.estimateFaces(videoRef.current);
        if (faces.length > 0) {
          const face = faces[0];
          setEyePositions({
            leftEye: face.keypoints.filter((kp: any) => kp.name?.includes('leftEye')),
            rightEye: face.keypoints.filter((kp: any) => kp.name?.includes('rightEye'))
          });
        }

        if (isTracking) {
          requestAnimationFrame(detect);
        }
      };

      detect();
    } catch (error) {
      console.error('Error starting eye tracking:', error);
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    isTracking,
    eyePositions,
    startTracking,
    stopTracking
  };
};