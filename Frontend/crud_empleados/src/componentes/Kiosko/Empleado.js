import React from 'react';

const Empleado = ({ empleado }) => {
  return (
  <div key={empleado.id}>
    <img
      src={empleado.foto} // Usar la URL completa directamente
      alt={`Foto de ${empleado.nombre}`} // Texto alternativo para la imagen
      className="empleado-foto" // Añade una clase para estilos
    />
    <p>Nombre: {empleado.nombre}</p>
    <p>Puesto: {empleado.rol.nombre}</p>
    {/* Agrega más campos según sea necesario */}
  </div>
  );
};

export default Empleado;