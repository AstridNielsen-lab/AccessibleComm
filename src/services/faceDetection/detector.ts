import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { FACE_DETECTION_CONFIG } from './config';
import { DetectedFace } from './types';
import { loadTensorFlow } from '../../utils/tensorflow/loader';

export class FaceDetector {
  private detector: faceLandmarksDetection.FaceLandmarksDetector | null = null;

  async initialize(): Promise<FaceDetector> {
    if (this.detector) return this;

    try {
      await loadTensorFlow();

      this.detector = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        FACE_DETECTION_CONFIG
      );

      return this;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Face detector initialization failed: ${message}`);
    }
  }

  async detectFace(video: HTMLVideoElement): Promise<DetectedFace[]> {
    if (!this.detector) {
      throw new Error('Face detector not initialized');
    }

    try {
      return await this.detector.estimateFaces(video);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Face detection failed: ${message}`);
    }
  }

  dispose(): void {
    if (this.detector?.dispose) {
      this.detector.dispose();
    }
    this.detector = null;
  }
}

export const createFaceDetector = (): FaceDetector => new FaceDetector();