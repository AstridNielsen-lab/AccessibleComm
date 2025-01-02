import * as tf from '@tensorflow/tfjs';

export const configureMemory = async () => {
  // Start a new scope for better memory management
  tf.engine().startScope();

  // Configure WebGL memory settings if available
  if (tf.env().get('WEBGL_VERSION') === 2) {
    await tf.env().set('WEBGL_FORCE_F16_TEXTURES', true);
    await tf.env().set('WEBGL_CHECK_NUMERICAL_PROBLEMS', false);
    await tf.env().set('CPU_HANDOFF', false);
  }

  // Set up automatic garbage collection
  tf.tidy(() => {});
};

export const cleanupMemory = () => {
  try {
    // End the current scope and dispose of tensors
    tf.engine().endScope();
    
    // Clean up any remaining tensors
    const tensors = tf.memory().numTensors;
    if (tensors > 0) {
      tf.disposeVariables();
    }
  } catch (error) {
    // Log but don't throw - cleanup should be best-effort
    console.warn('TensorFlow cleanup warning:', error);
  }
};