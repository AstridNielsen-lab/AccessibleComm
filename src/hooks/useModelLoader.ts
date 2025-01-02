import { useState, useCallback } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const useModelLoader = () => {
  const [model, setModel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadModel = useCallback(async () => {
    if (model) return model;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const detector = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          refineLandmarks: true,
          maxFaces: 1
        }
      );
      
      setModel(detector);
      return detector;
    } catch (err) {
      const errorMessage = 'Failed to load face detection model';
      console.error(errorMessage, err);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [model]);

  return {
    model,
    isLoading,
    error,
    loadModel
  };
};