import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/empleados.css';  // Asegúrate de que el CSS está en la ruta correcta

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
      nombre: '',
      apellido_1: '',
      apellido_2: '',
      email: '',
      telefono: '',
      puesto: '',
      fecha_contratación: '',
      cumpleaños: '',
      is_on_leave: false,
      foto: null,
  });
  const [editingEmpleadoId, setEditingEmpleadoId] = useState(null);

  // Cargar empleados
  const fetchEmpleados = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/empleados/');
          setEmpleados(response.data);
      } catch (error) {
          console.error('Error fetching empleados:', error);
      }
  };

  useEffect(() => {
      fetchEmpleados();
  }, []);

  return (
    <div className="employees-container">
      {empleados.map((empleado) => (
        <div className="employee-card" key={empleado.id}>
          {empleado.foto && (
              <img
                  src={empleado.foto} // Cambia la URL según tu configuración
                  alt={`${empleado.nombre} ${empleado.apellido_1}`}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }} // Estilo para la imagen
              />
          )}
          <p>{empleado.nombre} {empleado.apellido_1}</p>
        </div>
      ))}
    </div>
  );
};

export default Empleados;
