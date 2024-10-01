import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmpleadoManager = () => {
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
        const response = await axios.get('http://localhost:8000/api/empleados/');
        setEmpleados(response.data);

    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    //Crear o actualizar empleado
 const handleSubmit = async (e) => {
     e.preventDefault();
     const formDataToSend = new FormData();
     for (const key in formData) {
         if (key !== 'foto' || formData[key]) { // Solo agregar foto si existe
             formDataToSend.append(key, formData[key]);
         }
     }

         try {
             if (editingEmpleadoId) {
                 // Actualizar empleado
                 await axios.put(`http://localhost:8000/api/empleados/${editingEmpleadoId}/`, formDataToSend, {
                     headers: {
                         'Content-Type': 'multipart/form-data',
                     },
                 });
             } else {
                 // Crear nuevo empleado
                 await axios.post('http://localhost:8000/api/empleados/', formDataToSend, {
                     headers: {
                         'Content-Type': 'multipart/form-data',
                     },
                });
             }
             fetchEmpleados();
             resetForm();
         } catch (error) {
             console.error('Error al guardar empleado:', error);
             if (error.response) {
                 console.error('Response data:', error.response.data);
                 alert(`Error: ${error.response.data}`);
             }
         }
     };

     //Eliminar empleado
     const deleteEmpleado = async (id) => {
         try {
             await axios.delete(`http://localhost:8000/api/empleados/${id}/`);
             fetchEmpleados();
         } catch (error) {
             console.error('Error al eliminar empleado:', error);
         }
     };
 //Cargar datos en el formulario para edición
     const editEmpleado = (empleado) => {
         setFormData({
             nombre: empleado.nombre,
             apellido_1: empleado.apellido_1,
             apellido_2: empleado.apellido_2,
             email: empleado.email,
             telefono: empleado.telefono,
             puesto: empleado.puesto,
             fecha_contratación: empleado.fecha_contratación,
             cumpleaños: empleado.cumpleaños,
             is_on_leave: empleado.is_on_leave,
             foto: null,
        });
        setEditingEmpleadoId(empleado.id);
     };

     // Reiniciar formulario
     const resetForm = () => {
         setFormData({
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
         setEditingEmpleadoId(null);
     };
>>>>>>> d36ea76ad7275d7740fdda4695aaf9f666ef7e9e

    return (
        <div>
            <h1>Gestión de Empleados</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                <input type="text" placeholder="Primer Apellido" value={formData.apellido_1} onChange={(e) => setFormData({ ...formData, apellido_1: e.target.value })} required />
                <input type="text" placeholder="Segundo Apellido" value={formData.apellido_2} onChange={(e) => setFormData({ ...formData, apellido_2: e.target.value })} />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input type="text" placeholder="Teléfono" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                <input type="text" placeholder="Puesto" value={formData.puesto} onChange={(e) => setFormData({ ...formData, puesto: e.target.value })} required />
                <input type="date" value={formData.fecha_contratación} onChange={(e) => setFormData({ ...formData, fecha_contratación: e.target.value })} required />
                <input type="date" value={formData.cumpleaños} onChange={(e) => setFormData({ ...formData, cumpleaños: e.target.value })} required />
                <input type="file" onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })} />
                <button type="submit">{editingEmpleadoId ? 'Actualizar Empleado' : 'Agregar Empleado'}</button>
                {editingEmpleadoId && <button type="button" onClick={resetForm}>Cancelar</button>}
            </form>

            <h2>Lista de Empleados</h2>
            <ul>
                {empleados.map((empleado) => (
                    <li key={empleado.id}>
                        {empleado.foto && (
                            <img
                                src={empleado.foto} // Cambia la URL según tu configuración
                                alt={`${empleado.nombre} ${empleado.apellido_1}`}
                                style={{ width: '50px', height: '50px', marginRight: '10px' }} // Estilo para la imagen
                            />
                        )}
                        {empleado.nombre} {empleado.apellido_1}
                         <button onClick={() => editEmpleado(empleado)}>Editar</button>
                        <button onClick={() => deleteEmpleado(empleado.id)}>Eliminar</button> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmpleadoManager;
