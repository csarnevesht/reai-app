// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import LoginSignup from './components/LoginSignup';
import ProfileCompletion from './components/ProfileCompletion';
import MyDocs from './components/MyDocs';
import UploadDocument from './components/UploadDocument';
import DocumentSharing from './components/DocumentSharing';
import DocSummarization from './components/DocSummarization';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/profile-completion" element={<ProfileCompletion />} />
          <Route path="/my-docs" element={<MyDocs />} />
          <Route path="/upload-document" element={<UploadDocument />} />
          <Route path="/document-sharing" element={<DocumentSharing />} />
          <Route path="/doc-summarization" element={<DocSummarization />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
