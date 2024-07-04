import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faTags, faBell } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="flex items-center justify-center h-16 bg-blue-500">
        <h1 className="text-white text-2xl">Inventario</h1>
      </div>
      <nav className="mt-10">
        <NavLink 
          to="/product-list" 
          className={({ isActive }) => 
            isActive ? "flex items-center px-4 py-2 text-gray-700 bg-gray-200" : "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          }
        >
          <FontAwesomeIcon icon={faList} className="mr-3" />
          Inventario
        </NavLink>
        <NavLink 
          to="/add-product" 
          className={({ isActive }) => 
            isActive ? "flex items-center px-4 py-2 text-gray-700 bg-gray-200 mt-2" : "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 mt-2"
          }
        >
          <FontAwesomeIcon icon={faPlus} className="mr-3" />
          Añadir Producto
        </NavLink>
        <NavLink 
          to="/offers" 
          className={({ isActive }) => 
            isActive ? "flex items-center px-4 py-2 text-gray-700 bg-gray-200 mt-2" : "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 mt-2"
          }
        >
          <FontAwesomeIcon icon={faTags} className="mr-3" />
          codigos
        </NavLink>
        <NavLink 
          to="/notifications" 
          className={({ isActive }) => 
            isActive ? "flex items-center px-4 py-2 text-gray-700 bg-gray-200 mt-2" : "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 mt-2"
          }
        >
          <FontAwesomeIcon icon={faBell} className="mr-3" />
          Notificaciones
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
