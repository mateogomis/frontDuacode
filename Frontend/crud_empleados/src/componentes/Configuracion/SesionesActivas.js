//Este componente gestiona las sesiones activas del usuario.
import React from 'react';

const SesionesActivas = () => {
  const sesiones = [
    {
      dispositivo: 'Windows - Chrome',
      ultimaActividad: 'Hace 2 horas',
    },
    {
      dispositivo: 'Android - Firefox',
      ultimaActividad: 'Hace 1 día',
    },
  ];

  const handleCerrarSesion = (dispositivo) => {
    // Lógica para cerrar sesión
    alert(`Cerrada sesión en: ${dispositivo}`);
  };

  return (
    <div className="config-section">
      <h2>Sesiones Activas</h2>
      <ul className="sesiones-activas">
        {sesiones.map((sesion, index) => (
          <li key={index}>
            <strong>Dispositivo:</strong> {sesion.dispositivo} <br />
            <strong>Última Actividad:</strong> {sesion.ultimaActividad} <br />
            <button onClick={() => handleCerrarSesion(sesion.dispositivo)}>
              Cerrar Sesión
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SesionesActivas;
