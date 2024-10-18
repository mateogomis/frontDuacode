import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LectorQr from './LectorQr'

const Perfil = ({ id }) => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/empleados/${id}/`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener la información del empleado');
        }

        const data = await response.json();
        setEmployeeInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeInfo();
  }, [id]);

  const getCsrfToken = () => {
    const cookies = document.cookie.split('; ');
    const csrfCookie = cookies.find(cookie => cookie.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : '';
  };

  const handleLogout = async () => {
    // try {
    //   const response = await fetch('http://localhost:8000/auth/logout/', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'X-CSRFToken': getCsrfToken(), // Incluye el token CSRF en los headers
    //     },
    //   });

      // if (response.ok) {           
    // return <LectorQr />; 
        // navigate('/'); // Redirige a KioskoDuacode después de logout
    //   } else {
    //     console.error('Error al hacer logout');
    //   }
    // } catch (error) {
    //   console.error('Error al hacer logout:', error);
    // }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="perfil-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="info-section" style={{ flex: 1 }}>
        <h2>Perfil de {employeeInfo.nombre}</h2>
        <p><strong>Apellido:</strong> {employeeInfo.apellido_1} {employeeInfo.apellido_2}</p>
        <p><strong>Email:</strong> {employeeInfo.email}</p>
        <p><strong>Teléfono:</strong> {employeeInfo.telefono}</p>
        <p><strong>Puesto:</strong> {employeeInfo.puesto}</p>
        <p><strong>Fecha de Contratación:</strong> {new Date(employeeInfo.fecha_contratación).toLocaleDateString()}</p>
        <p><strong>Cumpleaños:</strong> {new Date(employeeInfo.cumpleaños).toLocaleDateString()}</p>
        <img src={employeeInfo.foto} alt={`${employeeInfo.nombre} ${employeeInfo.apellido_1}`} />
      </div>
      <div className="logout-section" style={{ alignSelf: 'center' }}>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Perfil;
