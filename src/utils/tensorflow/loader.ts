import * as tf from '@tensorflow/tfjs';

let isInitialized = false;

export async function loadTensorFlow(): Promise<void> {
  if (isInitialized) return;

  try {
    // First set the backend
    await tf.setBackend('webgl');
    
    // Then wait for TF to be ready
    await tf.ready();

    // Configure WebGL settings if available
    if (tf.env().get('WEBGL_VERSION') === 2) {
      await Promise.all([
        tf.env().set('WEBGL_FORCE_F16_TEXTURES', true),
        tf.env().set('WEBGL_CHECK_NUMERICAL_PROBLEMS', false),
        tf.env().set('WEBGL_PACK', true)
      ]);
    }

    // Start memory management scope
    tf.engine().startScope();
    
    isInitialized = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`TensorFlow initialization failed: ${message}`);
  }
}

export function cleanupTensorFlow(): void {
  try {
    tf.engine().endScope();
    tf.disposeVariables();
  } catch (error) {
    console.warn('TensorFlow cleanup warning:', error);
  }
}