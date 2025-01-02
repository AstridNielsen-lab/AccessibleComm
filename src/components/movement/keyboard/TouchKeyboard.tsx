import React from 'react';
import { TouchKey } from './TouchKey';

interface TouchKeyboardProps {
  onKeyPress: (letter: string) => void;
}

export const TouchKeyboard: React.FC<TouchKeyboardProps> = ({ onKeyPress }) => {
  const rows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
    ['space', '.', '?', '!']
  ];

  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      onKeyPress('BACKSPACE');
    } else if (key === 'space') {
      onKeyPress(' ');
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((key) => (
              <TouchKey
                key={key}
                letter={key}
                onPress={handleKeyPress}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};