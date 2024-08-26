import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (currentUser) {
        navigate('/my-docs');
      } else {
        navigate('/login');
      }
    }, 3000);
  }, [currentUser, navigate]);

  return (
    <div className="splash-screen">
      <h1>RE-AI APP</h1>
    </div>
  );
};

export default SplashScreen;