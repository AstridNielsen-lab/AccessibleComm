import { useRef, useCallback } from 'react';

export const useVideoStream = () => {
  const streamRef = useRef<MediaStream | null>(null);

  const attachStream = useCallback(async (videoElement: HTMLVideoElement, stream: MediaStream) => {
    try {
      videoElement.srcObject = stream;
      streamRef.current = stream;
      
      // Wait for video to be ready before playing
      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => resolve();
      });
      
      await videoElement.play();
    } catch (error) {
      console.error('Error attaching video stream:', error);
    }
  }, []);

  const detachStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  return {
    attachStream,
    detachStream
  };
};