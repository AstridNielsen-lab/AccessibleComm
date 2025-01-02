import React from 'react';

interface VirtualKeyProps {
  letter: string;
  isHovered: boolean;
  dwellTimeStart: number | null;
  dwellTime: number;
  onSelect: (letter: string) => void;
}

export const VirtualKey: React.FC<VirtualKeyProps> = ({
  letter,
  isHovered,
  dwellTimeStart,
  dwellTime,
  onSelect
}) => {
  const progress = dwellTimeStart
    ? Math.min(((Date.now() - dwellTimeStart) / dwellTime) * 100, 100)
    : 0;

  return (
    <button
      data-key={letter}
      onClick={() => onSelect(letter)}
      className="relative w-16 h-16 text-2xl font-bold rounded-lg overflow-hidden focus:outline-none"
    >
      <div className="absolute inset-0 bg-white border-2 border-blue-200" />
      {isHovered && (
        <div
          className="absolute bottom-0 left-0 bg-blue-500/20 transition-all"
          style={{
            width: '100%',
            height: `${progress}%`,
          }}
        />
      )}
      <span className="relative z-10">{letter}</span>
    </button>
  );
};