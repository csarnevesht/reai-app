import React from 'react';
import { useAuth } from '../context/AuthContext';

import 'node-polyfill-webpack-plugin';

// const loginWithGoogle = () => {
//   // Define loginWithGoogle function
//   console.log('*Login with Google');
// };

// const loginWithFacebook = () => {
//   // Define loginWithFacebook function
//   console.log('*Login with Facebook');
// };

// const signupWithEmail = (event: React.FormEvent) => {
//   event.preventDefault();
//   // Define signupWithEmail function
//   console.log('*Sign up with Email');
// };

const LoginSignup: React.FC = () => {
  const { loginWithGoogle, loginWithFacebook, signupWithEmail } = useAuth();

  return (
    <div className="login-signup">
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={loginWithFacebook}>Login with Facebook</button>
      <form onSubmit={signupWithEmail}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LoginSignup;