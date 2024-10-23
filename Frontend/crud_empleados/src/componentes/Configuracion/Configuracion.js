//El principal que agrupa todas las secciones.
import React from 'react';
import PerfilUsuario from './PerfilUsuario';
import Preferencias from './PreferenciasUsuario';
import Seguridad from './SeguridadUsuario';
import SesionesActivas from './SesionesActivas';
import '../../styles/configuracion.css'; // Asegúrate de tener los estilos necesarios aquí.

const Configuracion = () => {
  return (
    <div className="configuracion-container">
      <h1>Configuración</h1>
      <div className="configuracion-grid">
        <PerfilUsuario />
        <Preferencias />
        <Seguridad />
        <SesionesActivas />
      </div>
    </div>
  );
};

export default Configuracion;
