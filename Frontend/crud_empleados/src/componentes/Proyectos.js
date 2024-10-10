import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Proyectos = () => {
    const { id } = useParams(); 
    const [proyecto, setProyecto] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/proyectos/`);
                console.log(response.data);
                setProyecto(response.data);
                setLoading(false);
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
            {proyecto && ( 
                <div>
                    <p>Nombre del Proyecto: {proyecto.nombre}</p>
                    <p>{proyecto.descripcion}</p>
                    <p>Fecha de Inicio: {proyecto.fecha_inicio}</p>
                    <p>Fecha de Fin: {proyecto.fecha_fin ? proyecto.fecha_fin : 'En curso'}</p>
                </div> 
            )}
        </div>
    );
};

export default Proyectos;
