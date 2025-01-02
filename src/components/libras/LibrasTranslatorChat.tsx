import React, { useState } from 'react';
import { VideoRecorder } from './VideoRecorder';
import { TranslationDisplay } from './TranslationDisplay';
import { ChatInterface } from './ChatInterface';
import { useLibrasTranslation } from '../../hooks/useLibrasTranslation';
import { PermissionsHandler } from '../PermissionsHandler';

export const LibrasTranslatorChat: React.FC = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const {
    videoRef,
    isRecording,
    translation,
    detectedWord,
    chatInput,
    chatMessages,
    toggleRecording,
    setChatInput,
    sendMessage,
    startCamera,
  } = useLibrasTranslation();

  const handlePermissionsGranted = async () => {
    setHasPermissions(true);
    await startCamera();
  };

  if (!hasPermissions) {
    return <PermissionsHandler onPermissionsGranted={handlePermissionsGranted} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Libras Translator & Chat</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <VideoRecorder
            videoRef={videoRef}
            isRecording={isRecording}
            onToggleRecording={toggleRecording}
          />
          <TranslationDisplay
            translation={translation}
            detectedWord={detectedWord}
          />
        </div>

        <ChatInterface
          chatInput={chatInput}
          chatMessages={chatMessages}
          onChatInputChange={setChatInput}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
};