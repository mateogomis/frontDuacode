import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/DetalleEmp.css'; 



const DetalleEmpleados = () => {
    const { id } = useParams(); // Obtener el ID del empleado de la URL
    const [empleadoDetail, setEmpleadoDetail] = useState(null); // Cambié el nombre para evitar conflictos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/empleados/${id}/`);
                console.log(response.data);
                setEmpleadoDetail(response.data); // Cambié el nombre aquí también
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchEmpleado();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar el empleado: {error.message}</div>;

    return (
        <div>
            <h1>Detalles del Empleado</h1>
            {empleadoDetail && ( // Cambié el nombre aquí
                <div>
                    <img src={empleadoDetail.foto} alt={`${empleadoDetail.nombre} ${empleadoDetail.apellido_1}`} />
                    <h2>{empleadoDetail.nombre} {empleadoDetail.apellido_1} {empleadoDetail.apellido_2}</h2>
                    <p>Email: {empleadoDetail.email}</p>
                    <p>Teléfono: {empleadoDetail.telefono}</p>
                    <p>Puesto: {empleadoDetail.puesto}</p>
                    <p>Fecha de Contratación: {empleadoDetail.fecha_contratación}</p>
                    <p>Cumpleaños: {empleadoDetail.cumpleaños}</p>
                    <p>{empleadoDetail.is_on_leave ? 'Está de baja' : 'No está de baja'}</p>
                </div>
            )}
        </div>
    );
};

export default DetalleEmpleados;

