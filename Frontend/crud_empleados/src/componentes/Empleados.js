import React from 'react';
import '../styles/empleados.css';  // Asegúrate de que el CSS está en la ruta correcta

function Empleados() {
  return (
    <div className="container">
      <div className="search-bar">
        <input type="text" placeholder="Buscar empleado" />
      </div>
      <div className="employees-grid">
        <div className="employee-card">
          <span className="user-icon">👤</span>
          <p>Nombre1</p>
        </div>
        <div className="employee-card">
          <span className="user-icon">👤</span>
          <p>Nombre2</p>
        </div>
        <div className="employee-card">
          <span className="user-icon">👤</span>
          <p>Nombre3</p>
        </div>
        <div className="employee-card">
          <span className="user-icon">👤</span>
          <p>Nombre4</p>
        </div>
        <div className="employee-card">
          <span className="user-icon">👤</span>
          <p>Nombre5</p>
        </div>
        <div className="employee-card">
          <span className="user-icon">👤</span>
          <p>Nombre6</p>
        </div>
      </div>
    </div>
  );
}

export default Empleados;
