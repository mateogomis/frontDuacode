import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faGlobe, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const SedeCard = ({ sede }) => {
  const { t } = useTranslation(); // Usamos useTranslation

  // Determina el tipo de sede usando la traducción
  const getIcon = (tipo) => {
    switch (tipo) {
      case 'principal':
        return faBuilding;
      case 'internacional':
        return faGlobe;
      default:
        return faUniversity;
    }
  };

  return (
    <div key={sede.id} className="sede-card">
      <FontAwesomeIcon
        icon={getIcon(sede.tipo)}
        size="3x"
        className="sede-icon"
      />
      <h2>{sede.nombre}</h2>
      <p>{t('sedes.ubicacion')}: {sede.direccion}, {sede.ciudad}, {sede.pais}</p>
      <Link to={`/salas/${sede.id}`} className="ver-salas-btn">
        {t('sedes.verSalasDisponibles')}
      </Link>
    </div>
  );
};

export default SedeCard;
