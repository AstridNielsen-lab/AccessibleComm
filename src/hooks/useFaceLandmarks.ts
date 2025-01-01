import { useEffect, useState } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const useFaceLandmarks = () => {
  const [detector, setDetector] = useState<any>(null);

  const startDetection = async (videoElement: HTMLVideoElement) => {
    try {
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detector = await faceLandmarksDetection.createDetector(model, {
        runtime: 'tfjs',
      });
      setDetector(detector);
      // Start detection loop
    } catch (error) {
      console.error('Error starting face detection:', error);
    }
  };

  const stopDetection = () => {
    setDetector(null);
  };

  return { startDetection, stopDetection };
};