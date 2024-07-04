import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchCategories = async () => {
  const categoriesCollection = collection(db, 'categorias');
  const categorySnapshot = await getDocs(categoriesCollection);
  const categoryList = categorySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return categoryList;
};
