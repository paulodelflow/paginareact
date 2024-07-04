import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './components/addproduct';
import ProductList from './components/productlist';
import Sidebar from './components/slidebar';
import OffterProduct from './components/offterproduct';
import Notification from './components/Notification'; // Import the Notification component
import { fetchProducts } from './services/productService';
import './index.css';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg flex overflow-hidden w-[95%] max-w-[1200px] h-[80%] max-h-[720px]">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Inventario</h1>
            </header>
            <main className="flex-1 p-6 overflow-y-auto">
              <div className="bg-white shadow rounded-lg p-4">
                <Routes>
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/product-list" element={<ProductList products={products} />} />
                  <Route path="/" element={<ProductList products={products} />} />
                  <Route path="/offers" element={<OffterProduct products={products} />} />
                  <Route path="/notifications" element={<Notification />} /> {/* Add the route for Notification */}
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
