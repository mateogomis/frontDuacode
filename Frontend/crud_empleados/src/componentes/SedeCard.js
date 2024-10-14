<<<<<<< HEAD
// SedeCard.js
=======
>>>>>>> fb3e9cb977d732d409ff8c7e979025f3adcdf10b
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faGlobe, faUniversity } from '@fortawesome/free-solid-svg-icons';

const SedeCard = ({ sede }) => {
  return (
    <div key={sede.id} className="sede-card">
      <FontAwesomeIcon
        icon={sede.tipo === 'principal' ? faBuilding : sede.tipo === 'internacional' ? faGlobe : faUniversity}
        size="3x"
        className="sede-icon"
      />
      <h2>{sede.nombre}</h2>
      <p>Ubicación: {sede.direccion}, {sede.ciudad}, {sede.pais}</p>
      <Link to={`/salas/${sede.id}`} className="ver-salas-btn">
        Ver Salas Disponibles
      </Link>
    </div>
  );
};

<<<<<<< HEAD
export default SedeCard;
=======
export default SedeCard;
>>>>>>> fb3e9cb977d732d409ff8c7e979025f3adcdf10b
