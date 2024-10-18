import React, { useState, useEffect } from 'react';
import './PanelEmpleados.css';

const PanelEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '', 
    apellido_1: '', 
    apellido_2: '', 
    email: '', 
    telefono: '', 
    fecha_contratacion: '', 
    cumpleaños: '', 
    is_on_leave: false, 
    rol: '', 
    sede: ''
  });
  const [editandoEmpleado, setEditandoEmpleado] = useState(null); // Para controlar qué empleado se está editando
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/api/empleados/';

  // Función para cargar empleados
  const fetchEmpleados = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar datos');
      const data = await response.json();
      setEmpleados(data);
    } catch (err) {
      setError(err);
    }
  };

  // Efecto para cargar empleados al montar el componente
  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleAddEmployee = async () => {
    if (!nuevoEmpleado.nombre || !nuevoEmpleado.apellido_1 || !nuevoEmpleado.email) {
      alert('Por favor, completa todos los campos requeridos.');
      return; // Salir si falta información
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
      });
      if (!response.ok) throw new Error('Error al agregar empleado');
      await fetchEmpleados(); // Vuelve a cargar los datos después de agregar
      setNuevoEmpleado({ 
        nombre: '', 
        apellido_1: '', 
        apellido_2: '', 
        email: '', 
        telefono: '', 
        puesto: '', 
        fecha_contratacion: '', 
        cumpleaños: '', 
        is_on_leave: false, 
        rol: '', 
        sede: ''
      });
      alert('Empleado agregado con éxito');
    } catch (error) {
      console.error('Error al agregar empleado:', error);
      alert('No se pudo agregar el empleado. Por favor, verifica los datos.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      try {
        const response = await fetch(API_URL + id + '/', {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar empleado');
        await fetchEmpleados(); // Vuelve a cargar los datos después de eliminar
        alert('Empleado eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar empleado:', error);
        alert('No se pudo eliminar el empleado. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleSave = async (id) => {
    try {
      // Aquí se usa editandoEmpleado, que debería tener los cambios realizados
      const response = await fetch(API_URL + id + '/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editandoEmpleado), // Enviar los datos editados
      });
      if (!response.ok) throw new Error('Error al guardar cambios');
      await fetchEmpleados(); // Vuelve a cargar los datos después de actualizar
      setEditandoEmpleado(null); // Reiniciar el estado de edición
      alert('Cambios guardados con éxito');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('No se pudieron guardar los cambios. Por favor, verifica los datos.');
    }
  };

  const handleInputChange = (key, value) => {
    if (editandoEmpleado) {
      setEditandoEmpleado(prev => ({
        ...prev,
        [key]: value,
      }));
    } else {
      setNuevoEmpleado(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  if (error) return <div className="section full"><h2>Error al cargar la lista de empleados</h2><p>{error.message}</p></div>;
  if (!empleados) return <div className="section full"><h2>Cargando empleados...</h2></div>;

  return (
    <div className="section full">
      <h2>Lista de Empleados</h2>

      <div className="nuevo-empleado">
        <h3>Agregar Nuevo Empleado</h3>
        {Object.keys(nuevoEmpleado).map((key) => (
          <input
            key={key}
            type={key === 'is_on_leave' ? 'checkbox' : (key.includes('fecha') ? 'date' : 'text')}
            placeholder={key.replace('_', ' ').toUpperCase()}
            value={nuevoEmpleado[key]}
            onChange={(e) => handleInputChange(key, key === 'is_on_leave' ? e.target.checked : e.target.value)}
          />
        ))}
        <button onClick={handleAddEmployee}>Agregar Empleado</button>
      </div>

      <h3>Empleados Existentes</h3>
      <ul>
        {empleados.map((empleado) => (
          <li key={empleado.id} className="empleado">
            <div className="empleado-info">
              <img src={empleado.foto} alt={`${empleado.nombre} ${empleado.apellido_1}`} className="empleado-foto" />
              <div className="input-group">
                {Object.keys(empleado).filter(key => key !== 'id' && key !== 'foto').map((key) => (
                  <input
                    key={key}
                    type={key.includes('fecha') ? 'date' : 'text'}
                    value={editandoEmpleado ? editandoEmpleado[key] : empleado[key]} // Usar el valor de editandoEmpleado si existe
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                ))}
                <label>
                  En licencia:
                  <input
                    type="checkbox"
                    checked={editandoEmpleado ? editandoEmpleado.is_on_leave : empleado.is_on_leave} // Controlar el estado del checkbox
                    onChange={(e) => handleInputChange('is_on_leave', e.target.checked)}
                  />
                </label>
                <button onClick={() => handleSave(empleado.id)}>Guardar Cambios</button>
                <button onClick={() => handleDelete(empleado.id)}>Eliminar</button>
                <button onClick={() => setEditandoEmpleado(empleado)}>Editar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelEmpleados;


