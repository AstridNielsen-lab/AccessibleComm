import * as tf from '@tensorflow/tfjs';
import { TF_CONFIG } from './config';

let isInitialized = false;

export const initializeTensorFlow = async () => {
  if (isInitialized) return;

  try {
    // Set backend to WebGL
    await tf.setBackend('webgl');
    await tf.ready();

    // Configure WebGL if available
    if (tf.env().get('WEBGL_VERSION') === 2) {
      await tf.env().set('WEBGL_FORCE_F16_TEXTURES', true);
      await tf.env().set('WEBGL_CHECK_NUMERICAL_PROBLEMS', false);
      await tf.env().set('CPU_HANDOFF', false);
    }
    
    isInitialized = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown initialization error';
    throw new Error(`TensorFlow initialization failed: ${message}`);
  }
};