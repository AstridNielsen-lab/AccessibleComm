import React from 'react';
import { VirtualKey } from './VirtualKey';
import { useKeyboardLayout } from '../../../hooks/useKeyboardLayout';

interface VirtualKeyboardProps {
  onLetterSelect: (letter: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onLetterSelect }) => {
  const rows = useKeyboardLayout();

  return (
    <div className="grid gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((letter) => (
            <VirtualKey 
              key={letter} 
              letter={letter} 
              onSelect={onLetterSelect} 
            />
          ))}
        </div>
      ))}
    </div>
  );
};