import React, { useEffect, useState } from 'react';

const Perfil = ({ id }) => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/empleados/${id}/`, {
          method: 'GET',
          credentials: 'include', // Asegúrate de incluir las cookies
        });

        if (!response.ok) {
          throw new Error('Error al obtener la información del empleado');
        }

        const data = await response.json();
        setEmployeeInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeInfo();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="perfil-container">
      <h2>Perfil de {employeeInfo.nombre}</h2>
      <p><strong>Apellido:</strong> {employeeInfo.apellido_1} {employeeInfo.apellido_2}</p>
      <p><strong>Email:</strong> {employeeInfo.email}</p>
      <p><strong>Teléfono:</strong> {employeeInfo.telefono}</p>
      <p><strong>Puesto:</strong> {employeeInfo.puesto}</p>
      <p><strong>Fecha de Contratación:</strong> {new Date(employeeInfo.fecha_contratación).toLocaleDateString()}</p>
      <p><strong>Cumpleaños:</strong> {new Date(employeeInfo.cumpleaños).toLocaleDateString()}</p>
      <img src={employeeInfo.foto} alt={`${employeeInfo.nombre} ${employeeInfo.apellido_1}`} />
    </div>
  );
};

export default Perfil;
