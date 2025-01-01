import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Welcome } from './components/Welcome';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { ModeSelect } from './components/ModeSelect';
import { EyeMovementControl } from './components/movement/EyeMovementControl';
import { LibrasTranslation } from './components/libras/LibrasTranslation';
import { useAuthStore } from './store/authStore';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="mode-select"
            element={
              <ProtectedRoute>
                <ModeSelect />
              </ProtectedRoute>
            }
          />
          <Route
            path="movement"
            element={
              <ProtectedRoute>
                <EyeMovementControl />
              </ProtectedRoute>
            }
          />
          <Route
            path="libras"
            element={
              <ProtectedRoute>
                <LibrasTranslation />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;