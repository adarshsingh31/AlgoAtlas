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

function App() {
  const location = useLocation();
  const showNavbarFooter = location.pathname === '/';

  return (
    <AuthProvider>
      <ProgressProvider>
        {showNavbarFooter && <Navbar />}
        <Routes>
          {/* Public & sheet routes (anonymous browsing allowed) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/questions" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dp" element={<Dashboard defaultTab="dp" />} />
          <Route path="/tree" element={<Dashboard defaultTab="tree" />} />
          <Route path="/graph" element={<Dashboard defaultTab="graph" />} />

          {/* Protected routes */}
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
        {showNavbarFooter && <Footer />}
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
