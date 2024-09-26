import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; // Asegúrate de la ruta correcta

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

    // Cargar empleados
    const fetchEmpleados = async () => {
        const response = await axios.get('empleados/');
        setEmpleados(response.data);
    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    // Crear empleado
    const createEmpleado = async () => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        await axios.post('empleados/', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        fetchEmpleados(); // Volver a cargar empleados
    };

    // Actualizar empleado
    const updateEmpleado = async (id) => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        await axios.put(`empleados/${id}/`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        fetchEmpleados(); // Volver a cargar empleados
    };

    // Eliminar empleado
    const deleteEmpleado = async (id) => {
        await axios.delete(`empleados/${id}/`);
        fetchEmpleados(); // Volver a cargar empleados
    };

    return (
        <div>
            <h1>Gestión de Empleados</h1>

            <form onSubmit={(e) => {
                e.preventDefault();
                createEmpleado();
            }}>
                <input type="text" placeholder="Nombre" onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                <input type="text" placeholder="Primer Apellido" onChange={(e) => setFormData({ ...formData, apellido_1: e.target.value })} required />
                <input type="text" placeholder="Segundo Apellido" onChange={(e) => setFormData({ ...formData, apellido_2: e.target.value })} />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input type="text" placeholder="Teléfono" onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                <input type="text" placeholder="Puesto" onChange={(e) => setFormData({ ...formData, puesto: e.target.value })} required />
                <input type="date" onChange={(e) => setFormData({ ...formData, fecha_contratación: e.target.value })} required />
                <input type="date" onChange={(e) => setFormData({ ...formData, cumpleaños: e.target.value })} required />
                <input type="file" onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })} />
                <button type="submit">Agregar Empleado</button>
            </form>

            <h2>Lista de Empleados</h2>
            <ul>
                {empleados.map((empleado) => (
                    <li key={empleado.id}>
                        {empleado.nombre} {empleado.apellido_1}
                        <button onClick={() => updateEmpleado(empleado.id)}>Actualizar</button>
                        <button onClick={() => deleteEmpleado(empleado.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmpleadoManager;



