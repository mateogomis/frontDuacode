import React, { useState } from 'react';
import useFetchData from './scripts/useFetchData'; // Asegúrate de que la ruta sea correcta
import EditarPerfil from './EditarPerfil'; // Asegúrate de que la ruta sea correcta

const Perfil = ({ id, setIsAuthenticated, onLogout }) => {
  const { data: employeeData, error } = useFetchData(`http://localhost:8000/api/empleados/${id}/`);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    // Aquí puedes agregar cualquier lógica adicional antes de cerrar sesión
    onLogout(); // Llama a la función onLogout que apaga la webcam
  };

  const handleSave = (updatedData) => {
    // Aquí puedes manejar la actualización del estado en el componente padre si es necesario
    setIsEditing(false);
  };

  if (!employeeData) {
    if (error) return <p>{error.message}</p>;
    return <p>Cargando...</p>;
  }

  return (
    <div>
      {isEditing ? (
        <EditarPerfil 
          id={id} 
          onSave={handleSave} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        <>
          <h1>Perfil de Empleado</h1>
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
          <button onClick={handleLogout}>Cerrar Sesión</button>
          <button onClick={() => setIsEditing(true)}>Modificar Datos</button>
        </>
      )}
    </div>
  );
};

export default Perfil;

