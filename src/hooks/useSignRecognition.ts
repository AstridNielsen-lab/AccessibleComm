import { useState, useCallback, useRef } from 'react';
import { SignGesture } from '../types';
import { detectSign } from '../utils/signDetection';
import { speak } from '../utils/speechUtils';

export const useSignRecognition = () => {
  const [currentSign, setCurrentSign] = useState<string>('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const lastGestureTime = useRef<number>(0);
  const recognitionLoop = useRef<number>();
  const gestureBuffer = useRef<SignGesture[]>([]);

  const processGesture = useCallback((gesture: SignGesture) => {
    const now = Date.now();
    // Prevent rapid gesture changes (debounce)
    if (now - lastGestureTime.current < 1000) return;

    // Add gesture to buffer
    gestureBuffer.current.push(gesture);
    if (gestureBuffer.current.length > 3) {
      gestureBuffer.current.shift();
    }

    // Check for gesture combinations
    const translation = translateGestureSequence(gestureBuffer.current);
    if (translation && translation !== currentSign) {
      setCurrentSign(translation);
      speak(translation);
      lastGestureTime.current = now;
    }
  }, [currentSign]);

  const startRecognition = useCallback(async (
    videoElement: HTMLVideoElement,
    onUpdatePoints?: (points: any[]) => void
  ) => {
    setIsRecognizing(true);
    lastGestureTime.current = 0;
    gestureBuffer.current = [];
    
    const recognize = async () => {
      if (!isRecognizing) return;
      
      const gesture = await detectSign(videoElement, onUpdatePoints);
      if (gesture) {
        processGesture(gesture);
      }
      
      recognitionLoop.current = requestAnimationFrame(recognize);
    };

    recognize();
  }, [processGesture, isRecognizing]);

  const stopRecognition = useCallback(() => {
    setIsRecognizing(false);
    if (recognitionLoop.current) {
      cancelAnimationFrame(recognitionLoop.current);
    }
    gestureBuffer.current = [];
  }, []);

  return {
    currentSign,
    isRecognizing,
    startRecognition,
    stopRecognition
  };
};

const translateGestureSequence = (gestures: SignGesture[]): string => {
  // Single gesture translations
  const singleGestureTranslations: Record<SignGesture, string> = {
    HAND_UP: 'Olá',
    HAND_DOWN: 'Tchau',
    HAND_WAVE: 'Até logo',
    HAND_POINT: 'Você',
    SELF: 'Eu',
    OTHER: 'Outro',
    SMILE: 'Feliz'
  };

  // Check for gesture combinations
  const sequence = gestures.join('_');
  const combinationTranslations: Record<string, string> = {
    'SELF_HAND_UP': 'Eu quero',
    'HAND_POINT_HAND_WAVE': 'Você pode',
    'SELF_SMILE': 'Eu gosto',
    'HAND_POINT_SELF': 'Com você',
  };

  // Check for combinations first
  const combinationTranslation = combinationTranslations[sequence];
  if (combinationTranslation) {
    return combinationTranslation;
  }

  // Fall back to single gesture translation
  const lastGesture = gestures[gestures.length - 1];
  return lastGesture ? singleGestureTranslations[lastGesture] : '';
};