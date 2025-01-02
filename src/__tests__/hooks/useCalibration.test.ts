import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalibration } from '../../hooks/useCalibration';

describe('useCalibration', () => {
  it('should initialize with default calibration points', () => {
    const { result } = renderHook(() => useCalibration());
    
    expect(result.current.calibrationPoints).toHaveLength(5);
    expect(result.current.calibrationPoints.every(point => !point.completed)).toBe(true);
  });

  it('should mark a point as complete', () => {
    const { result } = renderHook(() => useCalibration());

    act(() => {
      result.current.markPointComplete(0);
    });

    expect(result.current.calibrationPoints[0].completed).toBe(true);
    expect(result.current.calibrationPoints.slice(1).every(point => !point.completed)).toBe(true);
  });

  it('should detect when calibration is complete', () => {
    const { result } = renderHook(() => useCalibration());

    expect(result.current.isCalibrationComplete()).toBe(false);

    act(() => {
      result.current.calibrationPoints.forEach((_, index) => {
        result.current.markPointComplete(index);
      });
    });

    expect(result.current.isCalibrationComplete()).toBe(true);
  });
});