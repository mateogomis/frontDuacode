import React from 'react';

function Principal() {
  return (
    <div className="main">
      <div className="header">
        <h1>duacode<span>.</span></h1>
        <div className="icons">
          <span className="icon-bell">🔔</span>
          <span className="icon-login">→</span>
        </div>
      </div>

      <div className="content">
        <p>Nombre:{empleado.nombre}</p>
        <p>Apellido:{empleado.apellido1}</p>
      </div>
    </div>
  );
}

export default Principal;
