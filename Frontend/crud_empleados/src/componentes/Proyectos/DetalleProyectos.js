import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/DetalleProyectos.css';
//detalle proy
const DetalleProyectos = () => {
    const { id } = useParams();
    const [ProyectoDetail, setProyectoDetail] = useState(null);
    const [empleadosNombres, setEmpleadosNombres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmpleados = async (empleadosIds) => {
        try {
            const empleadosPromises = empleadosIds.map(async (empleadoId) => {
                const response = await axios.get(`http://localhost:8000/api/empleados/${empleadoId}/`);
                const { nombre, apellido_1, apellido_2 } = response.data;
                return `${nombre} ${apellido_1} ${apellido_2}`;
            });

            const nombres = await Promise.all(empleadosPromises);
            setEmpleadosNombres(nombres);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/proyectos/${id}/`);
                setProyectoDetail(response.data);
                setLoading(false);

                if (response.data.empleados && response.data.empleados.length > 0) {
                    fetchEmpleados(response.data.empleados);
                }
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProyecto();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar el proyecto: {error.message}</div>;

    return (
        <div>
            <h1 id="det">Detalles del Proyecto</h1>
            {ProyectoDetail && (
                <div className="detalle-proyecto-box">
                    <p><strong>Nombre:</strong> {ProyectoDetail.nombre}</p>
                    <p><strong>Descripción:</strong> {ProyectoDetail.descripcion}</p>
                    <p><strong>Fecha de Inicio:</strong> {ProyectoDetail.fecha_inicio}</p>
                    <p><strong>Fecha de fin:</strong> {ProyectoDetail.fecha_fin ? ProyectoDetail.fecha_fin : 'En curso'}</p>
                    <p><strong>Empleados involucrados:</strong></p>
                    <ul>
                        {empleadosNombres.map((nombreCompleto, index) => (
                            <li key={index}>{nombreCompleto}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DetalleProyectos;
