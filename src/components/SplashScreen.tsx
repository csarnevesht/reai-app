import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SplashScreen: React.FC = () => {
  console.log('SplashScreen');
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    console.log('SplashScreen useEffect');
    const timer = setTimeout(() => {
      if (authContext?.currentUser) {
        console.log('User is logged in');
        navigate('/my-docs');
      } else {
        console.log('User is not logged in');
        navigate('/login');
      }
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, [authContext, navigate]);

  return (
    <div>Loading...</div>
  );
};

export default SplashScreen;