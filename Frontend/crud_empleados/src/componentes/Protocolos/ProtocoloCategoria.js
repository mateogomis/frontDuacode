import React from 'react';
import ProtocoloCard from './ProtocoloCard';

const ProtocoloCategoria = ({ categoria }) => {
  return (
    <div className="protocolo-categoria">
      <h2>{categoria.categoria}</h2>
      <div className="protocolo-grid">
        {categoria.protocolos.map((protocolo, index) => (
          <ProtocoloCard key={index} protocolo={protocolo} />
        ))}
      </div>
    </div>
  );
};

export default ProtocoloCategoria;
