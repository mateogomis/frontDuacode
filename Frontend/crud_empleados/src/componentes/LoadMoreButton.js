import React from 'react';

const LoadMoreButton = ({ cargarMasEmpleados }) => {
  return (
    <div className="load-more">
      <button onClick={cargarMasEmpleados}>Cargar más</button>
    </div>
  );
};

export default LoadMoreButton;
