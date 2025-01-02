import { EyePosition } from '../types/eyeTracking';

export const calculateEyePosition = (
  leftEye: any[],
  rightEye: any[],
  videoElement: HTMLVideoElement
): EyePosition => {
  const leftCenter = {
    x: (leftEye[0].x + leftEye[1].x) / 2,
    y: (leftEye[0].y + leftEye[1].y) / 2
  };
  
  const rightCenter = {
    x: (rightEye[0].x + rightEye[1].x) / 2,
    y: (rightEye[0].y + rightEye[1].y) / 2
  };

  // Map eye position to screen coordinates with proper scaling
  const x = window.innerWidth * (leftCenter.x + rightCenter.x) / (2 * videoElement.videoWidth);
  const y = window.innerHeight * (leftCenter.y + rightCenter.y) / (2 * videoElement.videoHeight);

  return { x, y };
};