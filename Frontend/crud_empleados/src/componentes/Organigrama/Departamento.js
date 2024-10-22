import React from 'react';
import Empleado from './Empleado';

const Departamento = ({ departamento }) => {
  return (
    <div className="departamento">
      <h2>{departamento.departamento}</h2>
      <div className="empleados">
        {departamento.empleados.map((empleado, index) => (
          <Empleado key={index} empleado={empleado} />
        ))}
      </div>
    </div>
  );
};

export default Departamento;
