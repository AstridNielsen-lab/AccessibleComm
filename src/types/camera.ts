export interface CameraError {
  type: 'camera_error' | 'permission_denied';
  message: string;
  details: Error;
}