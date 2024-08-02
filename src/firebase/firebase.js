import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJqPTOSW1MsffgXV0ZPi4Ka6rx8EsbMpk",
  authDomain: "inventorymanagement-38099.firebaseapp.com",
  projectId: "inventorymanagement-38099",
  storageBucket: "inventorymanagement-38099.appspot.com",
  messagingSenderId: "923080018938",
  appId: "1:923080018938:web:7078a28fa5ce0300ac7243",
  measurementId: "G-D9ZG6C1C0P"
};


const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
