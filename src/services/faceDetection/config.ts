import { FaceDetectionOptions } from './types';

export const FACE_DETECTION_CONFIG: FaceDetectionOptions = {
  runtime: 'tfjs',
  refineLandmarks: true,
  maxFaces: 1
} as const;