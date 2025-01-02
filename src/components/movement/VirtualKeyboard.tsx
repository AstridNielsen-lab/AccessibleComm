import React, { useState, useEffect } from 'react';
import { VirtualKey } from './keyboard/VirtualKey';
import { useKeyboardLayout } from '../../hooks/useKeyboardLayout';

interface VirtualKeyboardProps {
  cursorPosition: { x: number; y: number };
  onLetterSelect: (letter: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  cursorPosition,
  onLetterSelect
}) => {
  const rows = useKeyboardLayout();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [dwellTimeStart, setDwellTimeStart] = useState<number | null>(null);
  const DWELL_TIME = 1000; // 1 second dwell time to select

  useEffect(() => {
    const checkKeyHover = () => {
      const element = document.elementFromPoint(cursorPosition.x, cursorPosition.y);
      const key = element?.getAttribute('data-key');
      
      if (key) {
        if (key !== hoveredKey) {
          setHoveredKey(key);
          setDwellTimeStart(Date.now());
        } else if (dwellTimeStart) {
          const dwellTime = Date.now() - dwellTimeStart;
          if (dwellTime >= DWELL_TIME) {
            onLetterSelect(key);
            setDwellTimeStart(null);
          }
        }
      } else {
        setHoveredKey(null);
        setDwellTimeStart(null);
      }
    };

    const interval = setInterval(checkKeyHover, 100);
    return () => clearInterval(interval);
  }, [cursorPosition, hoveredKey, dwellTimeStart, onLetterSelect]);

  return (
    <div className="grid gap-2 p-4 bg-gray-50 rounded-lg">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((letter) => (
            <VirtualKey
              key={letter}
              letter={letter}
              isHovered={letter === hoveredKey}
              dwellTimeStart={letter === hoveredKey ? dwellTimeStart : null}
              dwellTime={DWELL_TIME}
              onSelect={onLetterSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
};