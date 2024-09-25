// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/empleados/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployees(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Lista de Empleados</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.apellido_1} {employee.apellido_2} - {employee.nombre}
                        <div>
                            <img
                                src={employee.foto}
                                alt="foto"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
