import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePermissions } from '../../hooks/usePermissions';

describe('usePermissions', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePermissions());
    
    expect(result.current.hasPermissions).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle successful permission request', async () => {
    const mockMediaDevices = {
      getUserMedia: vi.fn().mockResolvedValue({
        getTracks: () => [{
          stop: vi.fn()
        }]
      })
    };

    global.navigator.mediaDevices = mockMediaDevices;

    const { result } = renderHook(() => usePermissions());

    await act(async () => {
      const success = await result.current.requestPermissions();
      expect(success).toBe(true);
    });

    expect(result.current.hasPermissions).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should handle permission denial', async () => {
    const mockMediaDevices = {
      getUserMedia: vi.fn().mockRejectedValue(new Error('Permission denied'))
    };

    global.navigator.mediaDevices = mockMediaDevices;

    const { result } = renderHook(() => usePermissions());

    await act(async () => {
      const success = await result.current.requestPermissions();
      expect(success).toBe(false);
    });

    expect(result.current.hasPermissions).toBe(false);
    expect(result.current.error).toBe('Permission denied for camera and/or microphone access');
  });
});