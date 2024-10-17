import React from 'react';

const LoadMoreButton = ({ cargarMas }) => {
  return (
    <div className="load-more">
      <button onClick={cargarMas}>Cargar más</button>
    </div>
  );
};

export default LoadMoreButton;
