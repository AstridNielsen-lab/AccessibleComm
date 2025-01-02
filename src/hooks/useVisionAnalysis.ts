import { useState, useRef } from 'react';
import { analyzeImage } from '../services/gemini/visionService';

export const useVisionAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureImage = async (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return null;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(videoRef.current, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const analyzeFrame = async (
    videoRef: React.RefObject<HTMLVideoElement>,
    prompt: string
  ) => {
    try {
      setIsAnalyzing(true);
      setError(null);

      const imageData = await captureImage(videoRef);
      if (!imageData) {
        throw new Error('Failed to capture image from camera');
      }

      const analysis = await analyzeImage(imageData, prompt);
      return analysis;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze image';
      setError(message);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeFrame,
    isAnalyzing,
    error
  };
};