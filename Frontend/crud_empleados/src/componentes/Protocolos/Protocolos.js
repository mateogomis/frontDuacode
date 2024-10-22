import React, { useState, useEffect } from 'react';
import ProtocoloCategoria from './ProtocoloCategoria';
import '../../styles/protocolos.css'; // Asegúrate de tener los estilos aquí.

const Protocolos = () => {
  const [categorias, setCategorias] = useState([]);

  // Simulación de datos (esto podría venir de una API real).
  useEffect(() => {
    const data = [
      {
        categoria: 'Acceso Oficina',
        protocolos: [
          {
            titulo: 'Protocolo de Seguridad en la Oficina',
            descripcion: 'Cómo acceder y las medidas de seguridad en las oficinas.',
            enlace: '/manuales/acceso-seguridad.pdf',
          },
          {
            titulo: 'Protocolo de Ingreso para Visitantes',
            descripcion: 'Normas de acceso para visitantes y proveedores.',
            enlace: '/manuales/visitantes.pdf',
          },
        ],
      },
      {
        categoria: 'Manuales de la Empresa',
        protocolos: [
          {
            titulo: 'Manual de Conducta Laboral',
            descripcion: 'Políticas y normas de conducta laboral en la empresa.',
            enlace: '/manuales/conducta.pdf',
          },
          {
            titulo: 'Guía de Recursos Humanos',
            descripcion: 'Recursos y guías para los empleados.',
            enlace: '/manuales/rrhh.pdf',
          },
        ],
      },
    ];

    setCategorias(data);
  }, []);

  return (
    <div className="protocolos-container">
      <h1>Protocolos de la Empresa</h1>
      {categorias.map((categoria, index) => (
        <ProtocoloCategoria key={index} categoria={categoria} />
      ))}
    </div>
  );
};

export default Protocolos;
