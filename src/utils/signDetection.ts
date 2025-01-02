import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { SignGesture } from '../types';

let detector: any = null;

export const detectSign = async (
  video: HTMLVideoElement,
  onUpdatePoints?: (predictions: any[]) => void
): Promise<SignGesture | null> => {
  try {
    if (!detector) {
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      detector = await faceLandmarksDetection.createDetector(model, {
        runtime: 'tfjs',
        refineLandmarks: true,
        maxFaces: 1
      });
    }

    const predictions = await detector.estimateFaces(video);
    if (onUpdatePoints) {
      onUpdatePoints(predictions);
    }

    if (!predictions.length) return null;

    const face = predictions[0];
    const rightWrist = face.keypoints.find((kp: any) => kp.name === 'rightWrist');
    const leftWrist = face.keypoints.find((kp: any) => kp.name === 'leftWrist');
    const nose = face.keypoints.find((kp: any) => kp.name === 'noseTip');

    if (!rightWrist || !leftWrist || !nose) return null;

    // Detect wave gesture (horizontal movement)
    if (isWavingHand(rightWrist, nose) || isWavingHand(leftWrist, nose)) {
      return 'HAND_WAVE';
    }

    // Detect raised hand (hello gesture)
    if (isRaisedHand(rightWrist, nose) || isRaisedHand(leftWrist, nose)) {
      return 'HAND_UP';
    }

    // Detect pointing gesture
    if (isPointingGesture(rightWrist, nose) || isPointingGesture(leftWrist, nose)) {
      return 'HAND_POINT';
    }

    // Detect self-reference gesture (hand near chest)
    if (isSelfGesture(rightWrist, nose) || isSelfGesture(leftWrist, nose)) {
      return 'SELF';
    }

    return null;
  } catch (error) {
    console.error('Error in sign detection:', error);
    return null;
  }
};

// Gesture detection helper functions
const isWavingHand = (wrist: any, nose: any): boolean => {
  const horizontalDistance = Math.abs(wrist.x - nose.x);
  const verticalDistance = Math.abs(wrist.y - nose.y);
  return horizontalDistance > 100 && verticalDistance < 150;
};

const isRaisedHand = (wrist: any, nose: any): boolean => {
  return wrist.y < nose.y - 100;
};

const isPointingGesture = (wrist: any, nose: any): boolean => {
  const horizontalDistance = Math.abs(wrist.x - nose.x);
  return horizontalDistance > 150 && Math.abs(wrist.y - nose.y) < 100;
};

const isSelfGesture = (wrist: any, nose: any): boolean => {
  const distance = Math.sqrt(
    Math.pow(wrist.x - nose.x, 2) + Math.pow(wrist.y - nose.y, 2)
  );
  return distance < 100;
};