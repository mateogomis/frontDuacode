import React, { useState, useEffect } from 'react';
import Departamento from './Departamento';
import '../../styles/organigrama.css'; // Asegúrate de tener los estilos aquí.

const Organigrama = () => {
  const [departamentos, setDepartamentos] = useState([]);

  // Simulación de datos (puede venir de una API)
  useEffect(() => {
    const data = [
      {
        departamento: 'Desarrollo',
        empleados: [
          {
            nombre: 'Brittany',
            perfil: 'Frontend',
            foto: 'brittany.jpg',
            email: 'brittany@duacode.com'
          },
          {
            nombre: 'Alex',
            perfil: 'Backend',
            foto: 'alex.jpg',
            email: 'alex@duacode.com'
          }
        ]
      },
      {
        departamento: 'Marketing',
        empleados: [
          {
            nombre: 'Ana',
            perfil: 'Diseñadora',
            foto: 'ana.jpg',
            email: 'ana@duacode.com'
          },
          {
            nombre: 'Felipe',
            perfil: 'Diseñadora',
            foto: 'ana.jpg',
            email: 'ana@duacode.com'
          }
          
        ]
      }
    ];

    setDepartamentos(data); // Cargar los datos simulados
  }, []);

  return (
    <div className="organigrama-container">
      <h1>Organigrama de la Empresa</h1>
      {departamentos.map((departamento, index) => (
        <Departamento key={index} departamento={departamento} />
      ))}
    </div>
  );
};

export default Organigrama;
