import * as tf from '@tensorflow/tfjs';

export const TF_CONFIG = {
  BACKEND: 'webgl',
  DEBUG_MODE: false,
  MEMORY_CONFIG: {
    FORCE_F16_TEXTURES: true,
    CHECK_NUMERICAL_PROBLEMS: false,
    CPU_HANDOFF: false
  }
} as const;