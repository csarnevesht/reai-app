import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDfTXCAcT90y0Dy8JzPvxsfb8l3t0HdcHc',
  authDomain: 'fir-demo-e5eec.firebaseapp.com',
  databaseURL: 'https://fir-demo-e5eec.firebaseio.com',
  projectId: 'fir-demo-e5eec',
  storageBucket: 'fir-demo-e5eec.appspot.com',
  messagingSenderId: '616954384014',
  appId: '1:616954384014:web:3e06f93ccc4bce81c7c3df'
};

console.log('calling initializeApp ' + firebaseConfig);
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();