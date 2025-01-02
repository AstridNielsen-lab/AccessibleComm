import React from 'react';

interface VirtualKeyProps {
  letter: string;
  onClick: () => void;
}

export const VirtualKey: React.FC<VirtualKeyProps> = ({ letter, onClick }) => {
  const isSpecial = letter === '⌫' || letter === ' ';
  
  return (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 
        flex items-center justify-center
        text-lg font-medium
        rounded-lg
        transition-colors
        ${isSpecial 
          ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
          : 'bg-white hover:bg-blue-50 text-gray-900'}
        border border-gray-200
        hover:border-blue-300
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
      `}
    >
      {letter === ' ' ? '␣' : letter}
    </button>
  );
};