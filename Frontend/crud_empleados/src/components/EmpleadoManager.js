import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmpleadoManager = () => {
    const [empleados, setEmpleados] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        nombre: '',
        apellido_1: '',
        apellido_2: '',
        email: '',
        telefono: '',
        puesto: '',
        fecha_contratación: '',
        cumpleaños: '',
        is_on_leave: false,
    });

    const fetchEmpleados = async () => {
        const response = await axios.get('http://localhost:8000/api/empleados/');
        setEmpleados(response.data);
    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const createEmpleado = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        await axios.post('http://localhost:8000/api/empleados/', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        fetchEmpleados();
        resetForm();
    };

    const updateEmpleado = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        try {
            await axios.put(`http://localhost:8000/api/empleados/${formData.id}/`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchEmpleados();
            resetForm();
        } catch (error) {
            if (error.response) {
                alert(`Error al actualizar el empleado: ${error.response.data}`);
            } else {
                alert('Error de conexión al intentar actualizar el empleado.');
            }
        }
    };

    const deleteEmpleado = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
        if (confirmDelete) {
            await axios.delete(`http://localhost:8000/api/empleados/${id}/`);
            fetchEmpleados();
        }
    };

    const fillFormWithEmpleadoData = (empleado) => {
        setFormData({
            id: empleado.id,
            nombre: empleado.nombre,
            apellido_1: empleado.apellido_1,
            apellido_2: empleado.apellido_2,
            email: empleado.email,
            telefono: empleado.telefono,
            puesto: empleado.puesto,
            fecha_contratación: empleado.fecha_contratación,
            cumpleaños: empleado.cumpleaños,
            is_on_leave: empleado.is_on_leave,
        });
    };

    const resetForm = () => {
        setFormData({
            id: null,
            nombre: '',
            apellido_1: '',
            apellido_2: '',
            email: '',
            telefono: '',
            puesto: '',
            fecha_contratación: '',
            cumpleaños: '',
            is_on_leave: false,
        });
    };

    return (
        <div>
            <h1>Gestión de Empleados</h1>

            <form onSubmit={formData.id ? updateEmpleado : createEmpleado}>
                <input type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                <input type="text" placeholder="Primer Apellido" value={formData.apellido_1} onChange={(e) => setFormData({ ...formData, apellido_1: e.target.value })} required />
                <input type="text" placeholder="Segundo Apellido" value={formData.apellido_2} onChange={(e) => setFormData({ ...formData, apellido_2: e.target.value })} />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input type="text" placeholder="Teléfono" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                <input type="text" placeholder="Puesto" value={formData.puesto} onChange={(e) => setFormData({ ...formData, puesto: e.target.value })} required />
                <input type="date" value={formData.fecha_contratación} onChange={(e) => setFormData({ ...formData, fecha_contratación: e.target.value })} required />
                <input type="date" value={formData.cumpleaños} onChange={(e) => setFormData({ ...formData, cumpleaños: e.target.value })} required />
                <button type="submit">
                    {formData.id ? 'Actualizar Empleado' : 'Agregar Empleado'}
                </button>
            </form>

            <h2>Lista de Empleados</h2>
            <ul>
                {empleados.map((empleado) => (
                    <li key={empleado.id}>
                        {empleado.nombre} {empleado.apellido_1}
                        <button onClick={() => fillFormWithEmpleadoData(empleado)}>Seleccionar</button>
                        <button onClick={() => deleteEmpleado(empleado.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmpleadoManager;
