import React from 'react';

const DetalleEmplCarta = ({ empleadoDetail }) => {
  return (
    <div className="detalle-empleado-card">
      <img
        src={empleadoDetail.foto}
        alt={`${empleadoDetail.nombre} ${empleadoDetail.apellido_1}`}
        className="empleado-imagen"
      />
      <h2>{empleadoDetail.nombre} {empleadoDetail.apellido_1} {empleadoDetail.apellido_2}</h2>
      <p><strong>Email:</strong> {empleadoDetail.email}</p>
      <p><strong>Teléfono:</strong> {empleadoDetail.telefono}</p>
      <p><strong>Puesto:</strong> {empleadoDetail.puesto}</p>
      <p><strong>Fecha de Contratación:</strong> {empleadoDetail.fecha_contratacion}</p>
      <p><strong>Cumpleaños:</strong> {empleadoDetail.cumpleaños}</p>
      <p><strong>Estado:</strong> {empleadoDetail.is_on_leave ? 'Está de baja' : 'No está de baja'}</p>
    </div>
  );
};

export default DetalleEmplCarta;
