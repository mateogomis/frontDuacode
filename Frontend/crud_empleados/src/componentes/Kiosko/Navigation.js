// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <div>
      <Link to="/empleados" className="nav-button">
        Empleados
      </Link><br/>
      <Link to="/proyectos" className="nav-button">
        Proyectos
      </Link><br/>
      <Link to="/sedes" className="nav-button">
        Sedes
      </Link><br/>
      <Link to="/salas" className="nav-button">
        Salas
      </Link>
      
    </div>
    
  );
};

export default Navigation;




