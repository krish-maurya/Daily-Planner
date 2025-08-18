// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppContent from "./AppContent"; 
import { AuthProvider, useAuth } from "./AuthContext";
import LoginPage from "./components/Auth/Login";
import LandingPage from "./LandingPage";
import ResetPassword from "./components/Auth/ResetPassword";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; 
  return user ? <>{children}</> : <Navigate to="/login" />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage mobileMenuOpen={false} setMobileMenuOpen={() => {}} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <AppContent />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
