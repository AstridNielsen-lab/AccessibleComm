import React from 'react';

interface VirtualKeyboardProps {
  onLetterSelect: (letter: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onLetterSelect }) => {
  const rows = [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X'],
    ['Y', 'Z', ' ', '.', '?', '!'],
  ];

  return (
    <div className="grid gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterSelect(letter)}
              className="w-16 h-16 text-2xl font-bold bg-white border-2 border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};