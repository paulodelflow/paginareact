// productService.js
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchProducts = async () => {
  try {
    const productsCollectionRef = collection(db, 'products'); // Aquí se cambia a 'products'
    const snapshot = await getDocs(productsCollectionRef);
    
    // Mapear los datos de los documentos Firestore a un arreglo de productos
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return products;
  } catch (error) {
    console.error('Error al obtener productos desde Firebase:', error);
    throw error; // Propaga el error para manejarlo en el componente que llama a fetchProducts
  }
};

export { fetchProducts };
