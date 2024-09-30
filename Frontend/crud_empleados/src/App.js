import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './componentes/Inicio';
// import Empleados from './componentes/Empleados';
import Proyectos from './componentes/Proyectos';
import Configuracion from './componentes/Configuracion';
import Multisede from './componentes/Multisede';
import Organigrama from './componentes/Organigrama';
import Protocolo from './componentes/Protocolo';
import Salas from './componentes/Salas';
import EmpleadoManager from './componentes/EmpleadoManager';

function App() {
  return (
    <>
      <Inicio /> {/* El menú siempre estará visible */}
      <div className="content-wrapper"> {/* Contenedor para todo el contenido */}
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/empleados" element={<EmpleadoManager />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/multisede" element={<Multisede />} />
          <Route path="/organigrama" element={<Organigrama />} />
          <Route path="/protocolo" element={<Protocolo />} />
          <Route path="/salas" element={<Salas />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
