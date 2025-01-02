import { useState, useCallback } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

interface Point {
  x: number;
  y: number;
  name?: string;
}

export const useHandTracking = () => {
  const [handPoints, setHandPoints] = useState<Point[]>([]);

  const updateHandPoints = useCallback((predictions: any[]) => {
    if (!predictions.length) {
      setHandPoints([]);
      return;
    }

    const face = predictions[0];
    const points = face.keypoints
      .filter((kp: any) => 
        kp.name?.includes('hand') || 
        kp.name?.includes('Wrist') ||
        kp.name?.includes('finger')
      )
      .map((kp: any) => ({
        x: kp.x,
        y: kp.y,
        name: kp.name
      }));

    setHandPoints(points);
  }, []);

  return {
    handPoints,
    updateHandPoints
  };
};