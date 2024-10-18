import React from 'react';
import './Seccion.css'; // Si tienes estilos específicos para esta sección

const Seccion = ({ title, items, renderItem }) => {
  return (
    <div className="section small">
      <h3>{title}</h3>
      {/* Verificar si hay elementos para mostrar */}
      {items.length > 0 ? (
        items.map((item) => renderItem(item)) // Renderizar cada item usando la función proporcionada
      ) : (
        renderItem() // Renderizar el componente proporcionado cuando no hay items
      )}
    </div>
  );
};

export default Seccion;


