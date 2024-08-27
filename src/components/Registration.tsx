import React, { useState } from 'react';
import { useAuth, AuthContextType } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import 'node-polyfill-webpack-plugin';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth: AuthContextType | null = useAuth();
  const { signupWithEmail } = auth || {};
  const { currentUser } = auth || {};
  const navigate = useNavigate();

  const emailSignup = async (e: React.FormEvent, email: string, password: string) => {
    console.log('emailSignup');
    e.preventDefault();
    if (!currentUser) {
      // Your signup logic here
      console.log('Signing up with:', email, password);
      if(signupWithEmail) {
        signupWithEmail(email, password).then(() => {
          console.log('Signed up successfully');
          console.log('Navigating to profile-completion');
          navigate('profile-completion');
        }).catch((error) => {
          console.error('Failed to sign up:', error);
        } );
      }
    }
  };


  return (
    <div className="registration">
      <form onSubmit={(e) => emailSignup(e, email, password)}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign up</button>
      <h6>
            Click <Link to="/login">Here</Link> to log in
      </h6>
    </form>
    </div>
  );
};

export default Registration;