import React, { useState, useEffect } from 'react';

const EditarPerfil = ({ id, onSave, onCancel }) => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/empleados/${id}/`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del empleado');
         
  const errorData = await response.json();
  console.error('Error details:', errorData);  // Muestra detalles del error
  throw new Error(`Error: ${errorData.detail || response.statusText}`);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Datos enviados:', employeeData); // Agrega esta línea
  try {
    const response = await fetch(`http://localhost:8000/api/empleados/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar los datos del empleado');
    }
    const updatedData = await response.json();
    onSave(updatedData); // Llama a la función onSave para actualizar el estado en el componente padre
  } catch (err) {
    setError(err.message);
  }
};

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={employeeData.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Apellido 1:
            <input
              type="text"
              name="apellido_1"
              value={employeeData.apellido_1}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Apellido 2:
            <input
              type="text"
              name="apellido_2"
              value={employeeData.apellido_2}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input
              type="tel"
              name="telefono"
              value={employeeData.telefono}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarPerfil;