

import React from "react";
import Inicio from "./componentes/Inicio";
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


