import React from 'react';
import { EyeTrackingWindow } from '../components/movement/EyeTrackingWindow';
import { GeminiChat } from '../components/Chat/GeminiChat';

export const CommunicationHub: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid lg:grid-cols-2 gap-6 min-h-[600px]">
        <EyeTrackingWindow />
        <div className="h-full">
          <GeminiChat />
        </div>
      </div>
    </div>
  );
};