import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { fetchProducts } from '../services/productService';

const OfferProduct = () => {
  const [codigo, setCodigo] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaAplicable, setCategoriaAplicable] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      try {
        const productsList = await fetchProducts();
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

    // Validar que la fecha de fin sea mayor que la fecha de inicio
    if (new Date(fechaFin) <= new Date(fechaInicio)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de fin debe ser posterior a la fecha de inicio.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Validar que la fecha de inicio sea mayor o igual a la fecha actual
    const today = new Date();
    if (new Date(fechaInicio) < today) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de inicio debe ser mayor a la fecha actual.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Validar que el valor del descuento sea un número positivo
    const parsedValor = Number(valor.replace(/[^\d]/g, ''));
    if (parsedValor <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un valor de descuento válido.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      const offerData = {
        codigo,
        tipo: '%', // Siempre se guarda como porcentaje
        valor: parsedValor,
        categoriaAplicable,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin)
      };

      // Guardar en la colección 'codigos' en Firestore
      const docRef = await addDoc(collection(db, 'codigos'), offerData);
      console.log('Código creado con ID: ', docRef.id);

      Swal.fire({
        icon: 'success',
        title: '¡Código Creado!',
        text: 'El código ha sido creado correctamente.',
        confirmButtonText: 'Aceptar',
      });

      setCodigo('');
      setValor('');
      setCategoriaAplicable('');
      setFechaInicio('');
      setFechaFin('');
    } catch (error) {
      console.error('Error al crear el código: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al intentar crear el código.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Obtener las categorías únicas de los productos
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-6">Gestión de Códigos</h2>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
              Código del Descuento
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
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
              Valor del Descuento (%)
            </label>
            <input
              type="text"
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
              className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="categoriaAplicable" className="block text-sm font-medium text-gray-700">
              Categoría Aplicable
            </label>
            {loading ? (
              <p>Cargando categorías...</p>
            ) : (
              <select
                id="categoriaAplicable"
                value={categoriaAplicable}
                onChange={(e) => setCategoriaAplicable(e.target.value)}
                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                required
              >
                <option value="">Seleccione una categoría</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
              Crear Código
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferProduct;
