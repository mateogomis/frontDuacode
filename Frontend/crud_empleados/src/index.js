import React from 'react';
import ReactDOM from 'react-dom/client';  // En React 18, usamos `ReactDOM.createRoot`
import { BrowserRouter } from 'react-router-dom';  // Para manejar las rutas
import './index.css';  // Importa los estilos globales
import App from './App';  // El componente principal de la aplicación

// Crear el root para React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos la aplicación dentro de BrowserRouter para habilitar la navegación
root.render(

    <BrowserRouter>
      <App />
    </BrowserRouter>
  
);
