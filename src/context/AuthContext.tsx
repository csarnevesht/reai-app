// Import necessary Firebase modules
// import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth, googleProvider, facebookProvider } from '../firebase';
import React, { useEffect, createContext, useContext, useState, ReactNode } from 'react';

// Define an interface for the context value
export interface AuthContextType {
  currentUser: User | null;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>; 
  // Add other methods or properties as needed
}

console.log('calling createContext() ');
// Define the AuthContext and AuthProvider
const AuthContext = createContext<AuthContextType | null>(null);
console.log('after calling createContext() ');


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('AuthProvider');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user: User | null) => {
      console.log('onAuthStateChanged');
      console.log('user: ' + user);
      console.log('user name: ' + user?.displayName);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async (): Promise<void> => {
    console.log('loginWithGoogle');
    signInWithPopup(firebaseAuth, googleProvider).then((result) => {     
      console.log('result: ' + result);
      console.log('result user: ' + result.user);
      console.log('result user name: ' + result.user?.displayName);
    } );  
  };

  const loginWithFacebook = async (): Promise<void> => {
    console.log('loginWithFacebook');
    signInWithPopup(firebaseAuth, facebookProvider);
  };

  const signupWithEmail = async (email: string, password: string): Promise<void> => {
    console.log('signupWithEmail');
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };


  console.log('returning AuthContext.Provider');
  console.log('currentUser name: ' + currentUser?.displayName);
  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, loginWithFacebook, signupWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType | null => {
  console.log('useAuth');
  return useContext(AuthContext);
};

export default AuthContextType;