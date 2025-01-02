import { useRef, useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { SignGesture, detectSign } from '../utils/signDetection';

interface UseSignDetectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onDetection: (translation: string) => void;
}

export const useSignDetection = ({ videoRef, onDetection }: UseSignDetectionProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const detectionInterval = useRef<number>();
  const gestureBuffer = useRef<SignGesture[]>([]);
  const lastDetectionTime = useRef<number>(0);

  const processGestureSequence = useCallback((gesture: SignGesture) => {
    const now = Date.now();
    
    // Clear buffer if too much time has passed
    if (now - lastDetectionTime.current > 2000) {
      gestureBuffer.current = [];
    }
    
    gestureBuffer.current.push(gesture);
    lastDetectionTime.current = now;

    // Keep only last 5 gestures
    if (gestureBuffer.current.length > 5) {
      gestureBuffer.current.shift();
    }

    // Check for known sequences
    const sequence = gestureBuffer.current.join(' ');
    const translation = translateSequence(sequence);
    
    if (translation) {
      onDetection(translation);
      gestureBuffer.current = []; // Reset after successful translation
    }
  }, [onDetection]);

  const startDetection = useCallback(async () => {
    if (!videoRef.current) return;

    setIsDetecting(true);
    gestureBuffer.current = [];
    
    const detect = async () => {
      if (!videoRef.current || !isDetecting) return;

      const gesture = await detectSign(videoRef.current);
      if (gesture) {
        processGestureSequence(gesture);
      }

      detectionInterval.current = requestAnimationFrame(detect);
    };

    detect();
  }, [videoRef, isDetecting, processGestureSequence]);

  const stopDetection = useCallback(() => {
    setIsDetecting(false);
    if (detectionInterval.current) {
      cancelAnimationFrame(detectionInterval.current);
    }
    gestureBuffer.current = [];
  }, []);

  return {
    isDetecting,
    startDetection,
    stopDetection
  };
};

const translateSequence = (sequence: string): string => {
  // Common Libras sequences and their translations
  const translations: Record<string, string> = {
    'HAND_UP HAND_WAVE': 'Hello',
    'SELF': 'I/Me',
    'THUMBS_UP': 'Yes/Good',
    'HAND_WAVE HAND_DOWN': 'Goodbye',
    'POINT NOD': 'You',
    'SELF HAPPY': 'I am happy',
    'THANK POINT': 'Thank you',
    'HELP PLEASE': 'Need help',
    // Add more translations as needed
  };

  return translations[sequence] || '';
};