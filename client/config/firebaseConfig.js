import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'devzone-3f3ea.firebaseapp.com',
  projectId: 'devzone-3f3ea',
  storageBucket: 'devzone-3f3ea.appspot.com',
  messagingSenderId: '318168655108',
  appId: '1:318168655108:web:8c17c23e79b3cddddf9c51',
  measurementId: 'G-KXCBSJBNMD',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
export { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
