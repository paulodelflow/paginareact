import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDbErmKAzsgAVGxSCNZ90TIU6jG_2DqUBc",
    authDomain: "pagina-de-compra.firebaseapp.com",
    projectId: "pagina-de-compra",
    storageBucket: "pagina-de-compra.appspot.com",
    messagingSenderId: "801937252796",
    appId: "1:801937252796:web:37a506a2dda8644af44bb9",
    measurementId: "G-4TEGGLHXMQ"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db ,getFirestore ,addDoc, collection, getDocs};