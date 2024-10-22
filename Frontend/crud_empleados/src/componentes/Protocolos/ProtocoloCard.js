import React from 'react';

const ProtocoloCard = ({ protocolo }) => {
  return (
    <div className="protocolo-card">
      <h3>{protocolo.titulo}</h3>
      <p>{protocolo.descripcion}</p>
      <a href={protocolo.enlace} target="_blank" rel="noopener noreferrer" className="protocolo-enlace">
        Ver Documento
      </a>
    </div>
  );
};

export default ProtocoloCard;
