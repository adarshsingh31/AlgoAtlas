import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import './styles/global.css';
import { ThemeProvider } from './context/ThemeContext';

// VITE_GOOGLE_CLIENT_ID must be set in the frontend .env file:
//   VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
// Get it from: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID
// Make sure http://localhost:5173 is listed as an authorized JavaScript origin.
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* GoogleOAuthProvider wraps the entire app so any page can trigger Google login */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
