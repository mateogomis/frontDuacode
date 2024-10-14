import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EmpleadoManager from './EmpleadoManager';
import Proyectos from './Proyectos';
import Configuracion from './Configuracion';
import Multisede from './Multisede';
import Organigrama from './Organigrama';
import Protocolo from './Protocolo';
import Salas from './Salas';
import '../styles/inicio.css'; // Asegúrate de que este archivo esté correctamente vinculado
import Principal from './Principal';
import Empleados from './Empleados';
import DetalleEmpleados from './DetalleEmpleados';
import Sedes from './Sedes';
import Mapa from './Mapa';
import Reserva from './Reserva';
import DetalleProyectos from './DetalleProyectos';

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
          <li><Link to="/sedes" onClick={toggleMenu}>Salas</Link></li>
          <li><Link to="/proyectos" onClick={toggleMenu}>Proyectos</Link></li>
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
            <Route path="/proyectos/:id" element={<DetalleProyectos />} /> 
            <Route path="/organigrama" element={<Organigrama />} />
            <Route path="/protocolo" element={<Protocolo />} />
            <Route path="/multisede" element={<Multisede />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/empleados/:id" element={<DetalleEmpleados />} /> 
            <Route path="/sedes" element={<Sedes />} />
            <Route path="/salas/:sedeId" element={<Salas />} /> {/* Ruta dinámica */}
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/reserva/:salaId" element={<Reserva />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
