import React from 'react';

interface VirtualKeyProps {
  letter: string;
  onSelect: (letter: string) => void;
}

export const VirtualKey: React.FC<VirtualKeyProps> = ({ letter, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(letter)}
      className="w-16 h-16 text-2xl font-bold bg-white border-2 border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {letter}
    </button>
  );
};