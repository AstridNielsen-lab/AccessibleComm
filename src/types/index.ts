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