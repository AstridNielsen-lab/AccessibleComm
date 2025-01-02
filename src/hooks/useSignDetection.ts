import { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { SignGesture, detectSign } from '../utils/signDetection';

interface UseSignDetectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onDetection: (translation: string) => void;
}

export const useSignDetection = ({ videoRef, onDetection }: UseSignDetectionProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const detectionInterval = useRef<number>();

  const startDetection = async () => {
    if (!videoRef.current) return;

    setIsDetecting(true);
    let currentSequence: SignGesture[] = [];
    
    const detect = async () => {
      if (!videoRef.current || !isDetecting) return;

      const gesture = await detectSign(videoRef.current);
      if (gesture) {
        currentSequence.push(gesture);
        
        // Process sequence when we have enough gestures
        if (currentSequence.length >= 3) {
          const translation = translateSequence(currentSequence);
          if (translation) {
            onDetection(translation);
            currentSequence = [];
          }
        }
      }

      detectionInterval.current = requestAnimationFrame(detect);
    };

    detect();
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (detectionInterval.current) {
      cancelAnimationFrame(detectionInterval.current);
    }
  };

  return {
    isDetecting,
    startDetection,
    stopDetection
  };
};

const translateSequence = (sequence: SignGesture[]): string => {
  // Simple example of sequence translation
  // In a real implementation, this would use a more sophisticated model
  const sequenceStr = sequence.join(' ');
  
  // Basic mapping of common Libras sequences to words/phrases
  const translations: Record<string, string> = {
    'HAND_UP HAND_WAVE HAND_DOWN': 'Hello',
    'HAND_POINT SELF SMILE': 'I am happy',
    'HAND_WAVE HAND_POINT OTHER': 'Thank you',
    // Add more mappings based on Libras grammar
  };

  return translations[sequenceStr] || '';
};