import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notificationsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Notificaciones</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-700">No hay notificaciones</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="mb-4">
                <p className="text-gray-700">
                  <strong>Acción:</strong> {notification.action}
                </p>
                <p className="text-gray-700">
                  <strong>Producto:</strong> {notification.productName}
                </p>
                <p className="text-gray-700">
                  <strong>Usuario:</strong> {notification.user}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Fecha:</strong> {new Date(notification.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;
