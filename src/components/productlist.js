import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faTag } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, 'products', id));
          loadProducts();

          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado correctamente.',
            'success'
          );
        } catch (error) {
          console.error('Error al eliminar el producto: ', error);
          Swal.fire(
            'Error',
            'Hubo un problema al intentar eliminar el producto.',
            'error'
          );
        }
      }
    });
  };

  const handleEdit = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Producto',
      html: `
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input id="name" class="swal2-input w-full" value="${product.name}" placeholder="Nombre">
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
            <input id="price" type="number" class="swal2-input w-full" value="${product.price}" placeholder="Precio">
          </div>
          <div>
            <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
            <input id="stock" type="number" class="swal2-input w-full" value="${product.stock}" placeholder="Stock">
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea id="description" class="swal2-textarea w-full" placeholder="Descripción">${product.description}</textarea>
          </div>
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Imagen URL</label>
            <input id="image" class="swal2-input w-full" value="${product.image}" placeholder="Imagen URL">
          </div>
          <div>
            <label for="offer" class="block text-sm font-medium text-gray-700">Oferta</label>
            <input id="offer" class="swal2-input w-full" value="${product.offer || ''}" placeholder="Oferta">
          </div>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('name').value,
          price: parseFloat(document.getElementById('price').value),
          stock: parseInt(document.getElementById('stock').value, 10),
          description: document.getElementById('description').value,
          image: document.getElementById('image').value,
          offer: document.getElementById('offer').value
        };
      }
    });

    if (formValues) {
      try {
        await updateDoc(doc(db, 'products', product.id), formValues);
        loadProducts();

        Swal.fire(
          '¡Actualizado!',
          'El producto ha sido actualizado correctamente.',
          'success'
        );
      } catch (error) {
        console.error('Error al actualizar el producto: ', error);
        Swal.fire(
          'Error',
          'Hubo un problema al intentar actualizar el producto.',
          'error'
        );
      }
    }
  };

  const handleOfferRecommendation = async (product) => {
    const recommendation = Math.random() < 0.5 ? '50% de descuento' : '2x1';
    const { value: offer } = await Swal.fire({
      title: 'Recomendación de Oferta',
      text: `Recomendación: ${recommendation}`,
      input: 'text',
      inputLabel: 'Aceptar o modificar oferta',
      inputValue: recommendation,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    });

    if (offer) {
      try {
        await updateDoc(doc(db, 'products', product.id), { offer });
        loadProducts();

        Swal.fire(
          '¡Oferta Actualizada!',
          'La oferta ha sido actualizada correctamente.',
          'success'
        );
      } catch (error) {
        console.error('Error al actualizar la oferta: ', error);
        Swal.fire(
          'Error',
          'Hubo un problema al intentar actualizar la oferta.',
          'error'
        );
      }
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getStockStatus = (stock) => {
    if (stock === 0) return 'No hay stock';
    if (stock < 3) return 'Stock bajo';
    if (stock > 60) return 'Sobrestock';
    return 'Stock normal';
  };

  const formatPriceCLP = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-6">Lista de Productos</h2>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado del Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oferta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatPriceCLP(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${product.stock === 0 ? 'text-black' : product.stock < 3 ? 'text-red-500' : product.stock > 60 ? 'text-blue-500' : 'text-green-500'}`}>
                  {getStockStatus(product.stock)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.offer ? product.offer : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none mx-2"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none mx-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {product.stock > 60 && (
                    <button
                      onClick={() => handleOfferRecommendation(product)}
                      className="text-green-500 hover:text-green-700 focus:outline-none mx-2"
                    >
                      <FontAwesomeIcon icon={faTag} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
