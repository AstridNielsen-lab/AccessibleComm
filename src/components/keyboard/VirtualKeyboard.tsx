import React from 'react';
import { VirtualKey } from './VirtualKey';

interface VirtualKeyboardProps {
  onLetterSelect: (letter: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onLetterSelect }) => {
  const keys = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
    ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z', ' ', '⌫']
  ];

  const handleKeyClick = (key: string) => {
    if (key === '⌫') {
      // Handle backspace
      onLetterSelect('BACKSPACE');
    } else {
      onLetterSelect(key);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-4">
      <div className="grid gap-2">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((key) => (
              <VirtualKey
                key={key}
                letter={key}
                onClick={() => handleKeyClick(key)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};