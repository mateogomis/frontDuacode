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
        <h2>Bienvenido <br /> Persona1</h2>
        <div className="user-icon">👤</div>
        <p>Empleado</p>
      </div>
    </div>
  );
}

export default Principal;
