import React from 'react';

const Empleado = ({ empleado }) => {
  return (
    <div className="empleado-card">
      <img src={empleado.foto} alt={empleado.nombre} className="empleado-foto" />
      <h3>{empleado.nombre}</h3>
      <p>{empleado.perfil}</p>
      <p>{empleado.email}</p>
    </div>
  );
};

export default Empleado;
