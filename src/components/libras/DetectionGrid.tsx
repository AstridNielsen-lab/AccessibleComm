import React from 'react';

interface DetectionGridProps {
  videoWidth: number;
  videoHeight: number;
}

export const DetectionGrid: React.FC<DetectionGridProps> = ({ videoWidth, videoHeight }) => {
  const gridSize = 50; // Size of each grid cell in pixels
  const cols = Math.floor(videoWidth / gridSize);
  const rows = Math.floor(videoHeight / gridSize);

  return (
    <svg
      className="absolute inset-0 pointer-events-none opacity-20"
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Vertical lines */}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * gridSize}
          y1={0}
          x2={i * gridSize}
          y2={videoHeight}
          stroke="#ffffff"
          strokeWidth="1"
        />
      ))}
      
      {/* Horizontal lines */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * gridSize}
          x2={videoWidth}
          y2={i * gridSize}
          stroke="#ffffff"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
};