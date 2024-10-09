import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marketing = () => {
    const [empleados, setEmpleados] = useState([]);
    const [visibleEmpleados, setVisibleEmpleados] = useState(6); // Inicialmente mostrar 6 empleados

    // Cargar empleados
    const fetchEmpleados = async () => {
        const response = await axios.get('http://localhost:8000/api/empleados/');
        setEmpleados(response.data);
    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    // Función para cargar más empleados (incrementa el límite visible)
    const loadMoreEmpleados = () => {
        setVisibleEmpleados(prevVisible => prevVisible + 6); // Mostrar 6 más cada vez
    };

    return (
        <div>
            <h1>Gestión de Empleados</h1>
            <div>
                {empleados.slice(0, visibleEmpleados).map((empleado, index) => (
                    <div key={index} className="empleado-card">
                        {empleado.foto && (
                            <img
                                src={`http://localhost:8000${empleado.foto}`}
                                alt={`${empleado.nombre} ${empleado.apellido_1}`}
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                        )}
                        <div>
                            <p>{empleado.nombre} {empleado.apellido_1}</p>
                            <p>{empleado.puesto}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón Cargar más */}
            {visibleEmpleados < empleados.length && (
                <button onClick={loadMoreEmpleados}>Cargar más</button>
            )}
        </div>
    );
};

export default Marketing;