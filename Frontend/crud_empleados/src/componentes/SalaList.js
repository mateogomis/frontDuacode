import React from 'react';
import SalaCard from './SalaCard'; // Importamos el componente SalaCard

const SalaList = ({ salas }) => {
  if (salas.length === 0) {
    return <p>No hay salas disponibles en esta sede.</p>;
  }

  return (
    <div className="salas-horizontal">
      {salas.map((sala) => (
        <SalaCard key={sala.id} sala={sala} />
      ))}
    </div>
  );
};

export default SalaList;
