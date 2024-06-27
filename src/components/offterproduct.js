import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { fetchProducts } from '../services/productService';

const OfferProduct = () => {
  const [codigo, setCodigo] = useState('');
  const [tipoDescuento, setTipoDescuento] = useState('2x1');
  const [valor, setValor] = useState('');
  const [productosAplicables, setProductosAplicables] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      try {
        const productsList = await fetchProducts(); // Asumiendo que fetchProducts obtiene los productos de Firestore
        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      }
    };

    fetchProductsFromFirestore();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const offerData = {
        codigo,
        tipo: tipoDescuento === '2x1' ? '2x1' : 'descuento',
        valor: Number(valor),
        productosAplicables,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin)
      };

      const docRef = await addDoc(collection(db, 'ofertas'), offerData);
      console.log('Oferta creada con ID: ', docRef.id);

      Swal.fire(
        '¡Oferta Creada!',
        'La oferta ha sido creada correctamente.',
        'success'
      );

      setCodigo('');
      setTipoDescuento('2x1');
      setValor('');
      setProductosAplicables([]);
      setFechaInicio('');
      setFechaFin('');
    } catch (error) {
      console.error('Error al crear la oferta: ', error);
      Swal.fire(
        'Error',
        'Hubo un problema al intentar crear la oferta.',
        'error'
      );
    }
  };

  const handleProductSelection = (productId) => {
    if (productosAplicables.includes(productId)) {
      setProductosAplicables(productosAplicables.filter(id => id !== productId));
    } else {
      setProductosAplicables([...productosAplicables, productId]);
    }
  };

  // Filtrar productos recomendados basados en la categoría 'Sobre stock'
  const recommendedProducts = products.filter(product => product.category === 'Sobre stock');

  console.log('Productos:', products);
  console.log('Productos recomendados:', recommendedProducts);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-6">Gestión de Ofertas</h2>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
              Código de la Oferta
            </label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="tipoDescuento" className="block text-sm font-medium text-gray-700">
              Tipo de Descuento
            </label>
            <select
              id="tipoDescuento"
              value={tipoDescuento}
              onChange={(e) => setTipoDescuento(e.target.value)}
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              required
            >
              <option value="2x1">2x1</option>
              <option value="%">%</option>
            </select>
          </div>
          <div>
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
              {tipoDescuento === '2x1' ? 'Cantidad de productos' : 'Valor del Descuento'}
            </label>
            <input
              type={tipoDescuento === '2x1' ? 'number' : 'text'}
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="productosAplicables" className="block text-sm font-medium text-gray-700">
              Productos Aplicables
            </label>
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              <div className="mt-1">
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {recommendedProducts.length > 0 ? (
                    recommendedProducts.map(product => (
                      <li key={product.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          onChange={() => handleProductSelection(product.id)}
                          checked={productosAplicables.includes(product.id)}
                        />
                        <label htmlFor={`product-${product.id}`} className="ml-2 text-sm text-gray-600">{product.name}</label>
                      </li>
                    ))
                  ) : (
                    <li>No hay productos disponibles</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">
              Fecha de Fin
            </label>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear Oferta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferProduct;
