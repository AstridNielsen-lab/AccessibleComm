export interface EyePosition {
  x: number;
  y: number;
}

export interface EyeTrackingState {
  isTracking: boolean;
  isModelLoading: boolean;
  cursorPosition: EyePosition;
}