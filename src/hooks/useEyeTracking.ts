import { useState, useEffect, useCallback, useRef } from 'react';
import { createFaceDetector } from '../services/faceDetection/detector';
import { calculateEyePosition } from '../utils/eyeTrackingUtils';
import { EyePosition } from '../types/eyeTracking';

export const useEyeTracking = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isTracking, setIsTracking] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<EyePosition>({ x: 0, y: 0 });
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const detectorRef = useRef<ReturnType<typeof createFaceDetector> | null>(null);
  const requestRef = useRef<number>();

  const loadModel = async () => {
    if (detectorRef.current) return detectorRef.current;
    
    setIsModelLoading(true);
    setError(null);

    try {
      const detector = createFaceDetector();
      await detector.initialize();
      detectorRef.current = detector;
      return detector;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load model';
      setError(errorMessage);
      return null;
    } finally {
      setIsModelLoading(false);
    }
  };

  const startTracking = useCallback(async () => {
    if (!videoRef.current || isTracking) return;

    try {
      const detector = await loadModel();
      if (!detector) return;

      setIsTracking(true);

      const detect = async () => {
        if (!videoRef.current || !detectorRef.current) return;

        try {
          const faces = await detectorRef.current.detectFace(videoRef.current);
          if (faces && faces.length > 0) {
            const face = faces[0];
            if (face.keypoints) {
              const leftEye = face.keypoints.filter(kp => kp.name?.includes('leftEye'));
              const rightEye = face.keypoints.filter(kp => kp.name?.includes('rightEye'));
              
              if (leftEye.length > 0 && rightEye.length > 0) {
                const position = calculateEyePosition(leftEye, rightEye, videoRef.current);
                setCursorPosition(position);
              }
            }
          }
        } catch (error) {
          console.error('Detection error:', error);
        }

        requestRef.current = requestAnimationFrame(detect);
      };

      detect();
    } catch (error) {
      console.error('Tracking error:', error);
      setError('Failed to start tracking');
      setIsTracking(false);
    }
  }, [videoRef, isTracking]);

  const stopTracking = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
    if (detectorRef.current) {
      detectorRef.current.dispose();
      detectorRef.current = null;
    }
    setIsTracking(false);
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    isTracking,
    isModelLoading,
    error,
    cursorPosition,
    startTracking,
    stopTracking
  };
};