import { useState, useEffect } from 'react';
import * as handpose from '@tensorflow-models/handpose';

interface UseHandPoseDetectionProps {
  onGestureDetected: (gesture: string) => void;
}

export const useHandPoseDetection = ({ onGestureDetected }: UseHandPoseDetectionProps) => {
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [detectionInterval, setDetectionInterval] = useState<number | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await handpose.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const interpretGestures = (landmarks: number[][]): string => {
    if (landmarks[0][0] > landmarks[9][0]) return 'OI';
    if (landmarks[0][1] < landmarks[9][1]) return 'TCHAU';
    return 'UNKNOWN GESTURE';
  };

  const startDetection = (videoElement: HTMLVideoElement) => {
    if (!model) return;

    const interval = window.setInterval(async () => {
      const predictions = await model.estimateHands(videoElement);
      if (predictions.length > 0) {
        const gesture = interpretGestures(predictions[0].landmarks);
        onGestureDetected(gesture);
      }
    }, 100);

    setDetectionInterval(interval);
  };

  const stopDetection = () => {
    if (detectionInterval) {
      clearInterval(detectionInterval);
      setDetectionInterval(null);
    }
  };

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  return {
    startDetection,
    stopDetection,
  };
};