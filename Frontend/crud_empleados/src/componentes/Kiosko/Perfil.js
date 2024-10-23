
import React, { useEffect, useState } from 'react';

const Perfil = ({ id, setIsAuthenticated, onLogout }) => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/empleados/${id}/`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del empleado');
        }
        const data = await response.json();
        setEmployeeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleLogout = () => {
    // Aquí puedes agregar cualquier lógica adicional antes de cerrar sesión
    onLogout(); // Llama a la función onLogout que apaga la webcam
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Perfil de Empleado</h1>
      {employeeData ? (
        <div>
          <p>ID del Empleado: {employeeData.id}</p>
          <p>Nombre: {employeeData.nombre} {employeeData.apellido_1} {employeeData.apellido_2}</p>
          <p>Email: {employeeData.email}</p>
          <p>Teléfono: {employeeData.telefono}</p>
          <p>Puesto: {employeeData.puesto}</p>
          <p>Fecha de Contratación: {new Date(employeeData.fecha_contratación).toLocaleDateString()}</p>
          <p>Cumpleaños: {new Date(employeeData.cumpleaños).toLocaleDateString()}</p>
          {employeeData.foto && <img src={employeeData.foto} alt={`${employeeData.nombre} ${employeeData.apellido_1}`} />}
        </div>
      ) : (
        <p>No se encontró el empleado.</p>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Perfil;

