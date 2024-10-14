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

<<<<<<< HEAD
export default SalaList;
=======
export default SalaList;
>>>>>>> fb3e9cb977d732d409ff8c7e979025f3adcdf10b
