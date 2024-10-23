import React from 'react';
import { useTranslation } from 'react-i18next';

const DetalleEmplCarta = ({ empleadoDetail }) => {
  const { t } = useTranslation(); // Usamos `t` para las traducciones

  return (
    <div className="detalle-empleado-card">
      <img
        src={empleadoDetail.foto}
        alt={`${empleadoDetail.nombre} ${empleadoDetail.apellido_1}`}s
        className="empleado-imagen"
      />
      <h2>{empleadoDetail.nombre} {empleadoDetail.apellido_1} {empleadoDetail.apellido_2}</h2>
      <p><strong>{t('email')}:</strong> {empleadoDetail.email}</p>
      <p><strong>{t('telefono')}:</strong> {empleadoDetail.telefono}</p>
      <p><strong>{t('puesto')}:</strong> {empleadoDetail.puesto}</p>
      <p><strong>{t('fechaContratacion')}:</strong> {empleadoDetail.fecha_contratacion}</p>
      <p><strong>{t('cumpleaños')}:</strong> {empleadoDetail.cumpleaños}</p>
      <p><strong>{t('estado')}:</strong> {empleadoDetail.is_on_leave ? t('enBaja') : t('noEnBaja')}</p>
    </div>
  );
};

export default DetalleEmplCarta;
