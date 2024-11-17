
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSNFb_fTb8IQk0rPv-EVtKfHmA7u9KANY",
    authDomain: "autenticador-bb336.firebaseapp.com",
    projectId: "autenticador-bb336",
    storageBucket: "autenticador-bb336.appspot.com",
    messagingSenderId: "978384604705",
    appId: "1:978384604705:web:9cc87516d7147931ab1d60"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
