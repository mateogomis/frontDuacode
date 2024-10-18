import React from 'react';
import FileUpload from './scripts/FileUpload';
const Proyecto = ({ proyecto }) => {
  return (
    <div>
      <p>Título: {proyecto.titulo}</p>
      <p>Descripción: {proyecto.descripcion}</p>
      {/* Agrega más campos según sea necesario */}
      <FileUpload />
    </div>
  );
};

export default Proyecto;
