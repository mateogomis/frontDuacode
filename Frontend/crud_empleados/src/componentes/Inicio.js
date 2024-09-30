import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EmpleadoManager from './EmpleadoManager';
import Proyectos from './Proyectos';
import Configuracion from './Configuracion';
import Multisede from './Multisede';
import Organigrama from './Organigrama';
import Protocolo from './Protocolo';
import Salas from './Salas';
import '../styles/Menu.css'; // Asegúrate de que este archivo esté correctamente vinculado
import Principal from './Principal';
import Empleados from './Empleados';

function Inicio() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setSidebarOpen(!isSidebarOpen);  // Alterna el estado de la barra lateral
  };

  return (
    <div className="container">
      {/* Botón de menú (hamburguesa) */}
      <div className={`menu-button ${isSidebarOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Sidebar (menú lateral) */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/inicio" onClick={toggleMenu}>Inicio</Link></li>
          <li><Link to="/empleados" onClick={toggleMenu}>Empleados</Link></li>
          <li><Link to="/detalleEmpleado" onClick={toggleMenu}>detalleEmpleado</Link></li>
          <li><Link to="/proyectos" onClick={toggleMenu}>Proyectos</Link></li>
          <li><Link to="/salas" onClick={toggleMenu}>Salas</Link></li>
          <li><Link to="/organigrama" onClick={toggleMenu}>Organigrama</Link></li>
          <li><Link to="/protocolo" onClick={toggleMenu}>Protocolos</Link></li>
          <li><Link to="/multisede" onClick={toggleMenu}>Multisede</Link></li>
          <li><Link to="/configuracion" onClick={toggleMenu}>Configuración</Link></li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <header className={`header ${isSidebarOpen ? 'active' : ''}`}>
          <h1>duacode<span>.</span></h1>
        </header>
        
        {/* Aquí renderizamos el contenido basado en la ruta */}
        <div className="content">
          <Routes>
            <Route path="/inicio" element={<Principal/>} />
            <Route path="/empleados" element={<EmpleadoManager />} />
            <Route path="/detalleEmpleado" element={<Empleados />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/salas" element={<Salas />} />
            <Route path="/organigrama" element={<Organigrama />} />
            <Route path="/protocolo" element={<Protocolo />} />
            <Route path="/multisede" element={<Multisede />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
