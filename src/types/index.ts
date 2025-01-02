export interface User {
  name: string;
  email: string;
  dateOfBirth: string;
  city: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export type CommunicationMode = 'movement' | 'libras';

export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export type SignGesture = 
  | 'HAND_UP' 
  | 'HAND_DOWN' 
  | 'HAND_WAVE' 
  | 'HAND_POINT' 
  | 'SELF' 
  | 'OTHER' 
  | 'SMILE';