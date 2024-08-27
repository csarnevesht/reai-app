import React, { useState } from 'react';
import { useAuth, AuthContextType } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import 'node-polyfill-webpack-plugin';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth: AuthContextType | null = useAuth();
  const { loginWithGoogle, loginWithFacebook, signupWithEmail } = auth || {};
  const { currentUser } = auth || {};

  const emailSignup = async (e: React.FormEvent, email: string, password: string) => {
    console.log('emailSignup');
    e.preventDefault();
    if (!currentUser) {
      // Your signup logic here
      console.log('Signing up with:', email, password);
      if(signupWithEmail) {
        signupWithEmail(email, password).then(() => {
          console.log('Signed up successfully');
          // const navigate = useNavigate();
          // console.log('Navigating to profile-completion');
          // navigate('profile-completion');
        }).catch((error) => {
          console.error('Failed to sign up:', error);
        } );
      }
    }
  };

  const navigate = useNavigate();

  const googleLogin = async (e: React.FormEvent) => {
    console.log('googleLogin');
    e.preventDefault();    
    if (!currentUser) {
      // Your login logic here
      if(loginWithGoogle) {
        console.log('loginWithGoogle');
        loginWithGoogle().then(() => {
          console.log('logged in with google successfully');
          console.log('Navigating to profile-completion');
          navigate('profile-completion');
        }).catch((error) => {
          console.error('Failed to log in:', error);
        } );
      }
    }
  };

  const facebookLogin = async (e: React.FormEvent) => {
    console.log('facebookLogin');
    e.preventDefault();
    if (!currentUser) {
      // Your login logic here
      if(loginWithFacebook) {
        console.log('loginWithFacebook');
        loginWithFacebook().then(() => {
          console.log('logged in with facebook successfully');
        }).catch((error) => {
          console.error('Failed to log in:', error);
        } );
        console.log('Navigating to profile-completion');
        navigate('profile-completion');
      }
    }
  };

  return (
    <div className="login-signup">
      <button onClick={googleLogin}>Login with Google</button>
      <button onClick={facebookLogin}>Login with Facebook</button>
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
      <button type="submit">Login</button>
      <h6>
            Click <Link to="/registration">Here</Link> to sign up
      </h6>
    </form>
    </div>
  );
};

export default Login;