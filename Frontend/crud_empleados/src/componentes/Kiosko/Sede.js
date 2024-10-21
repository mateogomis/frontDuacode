import React from 'react';

const Sede = ({ sede }) => {
  return (
    <div key={sede.id} className="sede">
      {/* <h3>{sede.nombre}</h3> Nombre de la sede */}
      <p>Dirección: {sede.direccion}</p> {/* Dirección de la sede */}
      <p>Ciudad: {sede.ciudad}</p> {/* Ciudad de la sede */}
      <p>País: {sede.pais}</p> {/* País de la sede */}
      {/* Agrega más campos según sea necesario */}
    </div>
  );
};

export default Sede;
