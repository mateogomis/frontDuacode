import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/empleados.css';  // Asegúrate de que el CSS está en la ruta correcta

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filtra los empleados según el término de búsqueda
  const filteredEmpleados = empleados.filter((empleado) =>
    `${empleado.nombre} ${empleado.apellido_1}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employees-container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar empleado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Actualiza el estado del término de búsqueda
        />
      </div>

      {/* Grid de empleados */}
      <div className="employees-grid">
        {filteredEmpleados.map((empleado) => (
          <div className="employee-card" key={empleado.id}>
            {empleado.foto && (
              <img
                src={empleado.foto}
                alt={`${empleado.nombre} ${empleado.apellido_1}`}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            )}
            <p>{empleado.nombre} {empleado.apellido_1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empleados;
