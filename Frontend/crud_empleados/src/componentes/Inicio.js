import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EmpleadoManager from './Empleados/EmpleadoManager';
import Proyectos from './Proyectos/Proyectos';
import Configuracion from './Configuracion/Configuracion';
import Multisede from './Multisede';
import Organigrama from './Organigrama/Organigrama';
import Protocolo from './Protocolos/Protocolos';
import Salas from './Salas/Salas';
import '../styles/inicio.css'; // Asegúrate de que este archivo esté correctamente vinculado
import Principal from './Principal';
import Empleados from './Empleados/Empleados';
import DetalleEmpleados from './Empleados/DetalleEmpleados';
import Sedes from './Sedes/Sedes';
import Mapa from './Mapa';
import Reserva from './Reserva';
import DetalleProyectos from './Proyectos/DetalleProyectos';

// Importamos el hook de traducción
import { useTranslation } from 'react-i18next';

function Inicio() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation(); // Hook para obtener la función de traducción

  const toggleMenu = () => {
    setSidebarOpen(!isSidebarOpen); // Alterna el estado de la barra lateral
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
          <li><Link to="/inicio" onClick={toggleMenu}>{t('inicio')}</Link></li>
          <li><Link to="Empleados/empleados" onClick={toggleMenu}>{t('empleados')}</Link></li>
          <li><Link to="/detalleEmpleado" onClick={toggleMenu}>{t('detalleEmpleado')}</Link></li>
          <li><Link to="/sedes" onClick={toggleMenu}>{t('salas')}</Link></li>
          <li><Link to="/Proyectos/proyectos" onClick={toggleMenu}>{t('proyectos')}</Link></li>
          <li><Link to="/organigrama" onClick={toggleMenu}>{t('organigrama')}</Link></li>
          <li><Link to="/Protocolos/protocolos" onClick={toggleMenu}>{t('protocolos')}</Link></li>
           {/* <li><Link to="/multisede" onClick={toggleMenu}>Multisede</Link></li> */}
          <li><Link to="/configuracion" onClick={toggleMenu}>{t('configuracion')}</Link></li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <header className={`header ${isSidebarOpen ? 'active' : ''}`}>
          <h1>{t('menuHeader')}<span>.</span></h1>
        </header>
        
        {/* Aquí renderizamos el contenido basado en la ruta */}
        <div className="content">
          <Routes>
            <Route path="/inicio" element={<Principal/>} />
            <Route path="/Empleados/empleados" element={<EmpleadoManager />} /> 
            <Route path="/detalleEmpleado" element={<Empleados />} />
            <Route path="/Proyectos/proyectos" element={<Proyectos />} />
            <Route path="/proyectos/:id" element={<DetalleProyectos />} /> 
            <Route path="/organigrama" element={<Organigrama />} />
            <Route path="/Protocolos/Protocolos" element={<Protocolo />} />
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



