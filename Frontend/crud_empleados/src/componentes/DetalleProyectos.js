import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/DetalleEmp.css'; 



const DetalleProyectos = () => {
    const { id } = useParams(); // Obtener el ID del empleado de la URL
    const [ProyectoDetail, setProyectoDetail] = useState(null); // Cambié el nombre para evitar conflictos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/empleados/${id}/`);
                console.log(response.data);
                setProyectoDetail(response.data); // Cambié el nombre aquí también
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
            <h1 id="det">Detalles del Empleado</h1>
            {proyectoDetail && ( // Cambié el nombre aquí
                <div>
                    <p>Puesto: {ProyectoDetail.nombre}</p>
                    <p>{ProyectoDetail.descripcion}</p>
                    <p>Fecha de Inicio: {ProyectoDetail.fecha_inicio}</p>
                    <p>Fecha de fin:{ProyectoDetail.fecha_fin ? '{proyectoDetail.fecha_fin}' : 'En curso'}</p>
                </div> 
            )}
        </div>
    );
};

export default DetalleProyectos;

