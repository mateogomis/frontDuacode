// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KioskoDuacode from './componentes/Kiosko/KioskoDuacode'; // Si aún lo necesitas
import PanelEmpleados from './componentes/Kiosko/PanelEmpleados';

function App() {
  return (
    <Router>
      <div className="content-wrapper"> {/* Contenedor para el contenido */}
        <Routes>
          <Route path="/empleados" element={<PanelEmpleados />} />
          <Route path="/" element={<KioskoDuacode />} /> {/* Muestra KioskoDuacode en la ruta principal */}
          {/* Agrega más rutas aquí según sea necesario */}
          <Route path="/proyectos" element={<h2>Lista de Proyectos</h2>} />
          <Route path="/sedes" element={<h2>Lista de Sedes</h2>} />
          <Route path="/salas" element={<h2>Lista de Salas</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


