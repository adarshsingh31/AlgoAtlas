import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';
function App() {
  const location = useLocation();
  const showNavbarFooter = location.pathname === '/';

  return (
    <AuthProvider>
      <ProgressProvider>
        {showNavbarFooter && <Navbar />}
        <Routes>
          {/* Public routes (redirect to questions if authenticated) */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          
          {/* Protected routes */}
          <Route path="/questions" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dp" element={<ProtectedRoute><Dashboard defaultTab="dp" /></ProtectedRoute>} />
          <Route path="/tree" element={<ProtectedRoute><Dashboard defaultTab="tree" /></ProtectedRoute>} />
          <Route path="/graph" element={<ProtectedRoute><Dashboard defaultTab="graph" /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
        {showNavbarFooter && <Footer />}
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
