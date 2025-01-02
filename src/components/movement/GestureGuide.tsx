import React from 'react';

export const GestureGuide: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-2">Gesture Guide:</h3>
      <ul className="space-y-2">
        <li>• Blink: Select letter</li>
        <li>• Smile: Delete last letter</li>
        <li>• Open mouth: Speak message</li>
      </ul>
    </div>
  );
};