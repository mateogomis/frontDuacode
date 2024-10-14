// SedeCard.js
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

export default SedeCard;
