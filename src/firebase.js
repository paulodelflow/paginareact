import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db ,getFirestore ,addDoc, collection, getDocs};
