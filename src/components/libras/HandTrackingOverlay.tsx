import React from 'react';

interface Point {
  x: number;
  y: number;
  name?: string;
}

interface HandTrackingOverlayProps {
  points: Point[];
  videoWidth: number;
  videoHeight: number;
}

export const HandTrackingOverlay: React.FC<HandTrackingOverlayProps> = ({
  points,
  videoWidth,
  videoHeight
}) => {
  // Group points by hand
  const leftHandPoints = points.filter(p => p.name?.includes('left'));
  const rightHandPoints = points.filter(p => p.name?.includes('right'));

  const drawHandOutline = (points: Point[]) => {
    if (points.length < 2) return null;
    
    const pathPoints = points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ');

    return (
      <path
        d={`${pathPoints} Z`}
        fill="none"
        stroke="#00ff00"
        strokeWidth="2"
        className="animate-pulse"
      />
    );
  };

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Draw hand outlines */}
      {drawHandOutline(leftHandPoints)}
      {drawHandOutline(rightHandPoints)}

      {/* Draw points */}
      {points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#00ff00"
            className="animate-pulse"
          />
          {point.name?.includes('Wrist') && (
            <>
              <circle
                cx={point.x}
                cy={point.y}
                r="20"
                fill="none"
                stroke="#00ff00"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-ping"
              />
              <text
                x={point.x + 25}
                y={point.y}
                fill="#00ff00"
                fontSize="12"
                className="font-bold"
              >
                {point.name?.includes('left') ? 'Left Hand' : 'Right Hand'}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
};