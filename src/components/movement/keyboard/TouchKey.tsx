import React from 'react';

interface TouchKeyProps {
  letter: string;
  onPress: (letter: string) => void;
}

export const TouchKey: React.FC<TouchKeyProps> = ({ letter, onPress }) => {
  return (
    <button
      onClick={() => onPress(letter)}
      className="w-14 h-14 bg-white rounded-xl shadow-sm border-2 border-blue-100 
                 hover:bg-blue-50 active:bg-blue-100 transition-colors
                 flex items-center justify-center text-xl font-medium text-gray-700"
    >
      {letter}
    </button>
  );
};