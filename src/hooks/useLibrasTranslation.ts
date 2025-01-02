import { useRef, useState, useEffect } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import { useHandPoseDetection } from './useHandPoseDetection';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyC9_tWhLz-XE-dS_b_GaNFm3jqnrei7TBY";

export const useLibrasTranslation = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [translation, setTranslation] = useState('');
  const [detectedWord, setDetectedWord] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { startDetection, stopDetection } = useHandPoseDetection({
    onGestureDetected: (gesture: string) => {
      setDetectedWord(gesture);
      setTranslation(gesture);
      setChatMessages(prev => [...prev, { sender: 'Detected', message: gesture }]);
    }
  });

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Failed to start camera:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopDetection();
      setIsRecording(false);
    } else {
      if (videoRef.current) {
        startDetection(videoRef.current);
        setIsRecording(true);
      }
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { sender: 'User', message: chatInput }]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          input: chatInput,
          maxOutputTokens: 100,
        }),
      });

      const data = await response.json();
      const reply = data?.output?.text || 'Error getting AI response';

      setChatMessages(prev => [...prev, { sender: 'Gemini', message: reply }]);
      setChatInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prev => [...prev, { sender: 'System', message: 'Error sending message' }]);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
      stopDetection();
    };
  }, []);

  return {
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
  };
};