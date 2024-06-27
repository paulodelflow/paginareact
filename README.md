# Mi Proyecto de inventario

Este es un proyecto de React que utiliza Firebase para gestionar datos y SweetAlert2 para mostrar alertas interactivas. El proyecto incluye una interfaz para gestionar ofertas de productos.

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

## Configuración

1. Crea un archivo `.env` en la raíz de tu proyecto y agrega tus credenciales de Firebase:

    ```env
    REACT_APP_FIREBASE_API_KEY=tu-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=tu-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=tu-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=tu-app-id
    ```

2. Configura tu proyecto para desplegar en GitHub Pages. Abre tu `package.json` y asegúrate de tener las siguientes líneas:

    ```json
    "homepage": "https://tu-usuario.github.io/tu-repositorio",
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
    ```

## Uso

Para ejecutar el proyecto en un entorno de desarrollo, utiliza:

```bash
npm start

## link
```pagina
https://paulodelflow.github.io/paginareact/
