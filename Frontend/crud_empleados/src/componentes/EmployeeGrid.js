import React from 'react';
import EmployeeCard from './EmployeeCard';

const EmployeeGrid = ({ empleados }) => {
  return (
    <div className="employees-grid">
      {empleados.map(({ id, nombre, apellido_1, foto }) => (
        <EmployeeCard key={id} id={id} nombre={nombre} apellido_1={apellido_1} foto={foto} />
      ))}
    </div>
  );
};

export default EmployeeGrid;
