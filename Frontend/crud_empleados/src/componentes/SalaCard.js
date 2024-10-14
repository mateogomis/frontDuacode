import React from 'react';
import { Link } from 'react-router-dom';

const SalaCard = ({ sala }) => {
  return (
    <div className="sala-card">
      <h2>{sala.nombre}</h2>
      <p><strong>Capacidad:</strong> {sala.capacidad} personas</p>
      <p><strong>Sede:</strong> {sala.sede.nombre}</p>
      <p><strong>Ubicación:</strong> {sala.sede.direccion}, {sala.sede.ciudad}, {sala.sede.pais}</p>
      
      {/* Botón de reserva siempre visible */}
      <Link to={`/reserva/${sala.id}`} className="reservar-btn">
        Reservar
      </Link>
    </div>
  );
};

<<<<<<< HEAD
export default SalaCard;
=======
export default SalaCard;
>>>>>>> fb3e9cb977d732d409ff8c7e979025f3adcdf10b
