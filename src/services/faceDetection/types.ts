export interface FaceDetectionOptions {
  runtime: 'tfjs';
  refineLandmarks: boolean;
  maxFaces: number;
}

export interface FaceKeypoint {
  x: number;
  y: number;
  z?: number;
  name?: string;
}

export interface DetectedFace {
  keypoints: FaceKeypoint[];
  box?: {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
  };
}