

import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./componentes/Inicio";
import Empleados from "./componentes/Empleados";
import Proyectos from "./componentes/Proyectos";
import Configuracion from "./componentes/Configuracion";
import Multisede from "./componentes/Multisede";
import Organigrama from "./componentes/Organigrama";
import Protocolo from "./componentes/Protocolo";
import Salas from "./componentes/Salas";
import EmpleadoManager from "./componentes/EmpleadoManager";
import Principal from "./componentes/Principal";

function App() {
  return (
    <>
      <Inicio>
        <Principal />
      </Inicio>{" "}
      {/* El menú siempre estará visible */}
      <div className="content-wrapper">
        {" "}
        {/* Contenedor para todo el contenido */}
      </div>
    </>
  );
}

export default App;


