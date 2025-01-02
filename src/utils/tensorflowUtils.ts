import * as tf from '@tensorflow/tfjs';

let isInitialized = false;

export const initializeTensorFlow = async () => {
  if (isInitialized) return;

  try {
    await tf.ready();
    await tf.setBackend('webgl');
    
    // Configure memory management
    tf.engine().configureDebugMode(false);
    tf.engine().startScope();
    
    // Set memory growth to prevent memory leaks
    if (tf.env().get('WEBGL_VERSION') === 2) {
      await tf.env().set('WEBGL_FORCE_F16_TEXTURES', true);
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('Error initializing TensorFlow:', error);
    throw new Error('Failed to initialize TensorFlow');
  }
};

export const cleanupTensorFlow = () => {
  try {
    tf.engine().endScope();
    tf.disposeVariables();
  } catch (error) {
    console.error('Error cleaning up TensorFlow:', error);
  }
};