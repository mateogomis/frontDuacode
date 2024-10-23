// import React, { useEffect, useState } from 'react';
// import LectorQr from './LectorQr';

// const Perfil = ({ id, setIsAuthenticated }) => { // Añadir setIsAuthenticated como prop
//   const [employeeInfo, setEmployeeInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     const fetchEmployeeInfo = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/empleados/${id}/`, {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Error al obtener la información del empleado');
//         }

//         const data = await response.json();
//         setEmployeeInfo(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeInfo();
//   }, [id]);

//   const getCsrfToken = () => {
//     const cookies = document.cookie.split('; ');
//     const csrfCookie = cookies.find(cookie => cookie.startsWith('csrftoken='));
//     return csrfCookie ? csrfCookie.split('=')[1] : '';
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/auth/logout/', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'X-CSRFToken': getCsrfToken(),
//         },
//       });

//       if (response.ok) {
        
//         // Cambiar el estado de autenticación a falso
//         setIsAuthenticated(false);
//       } else {
//         console.error('Error al hacer logout');
//       }
//     } catch (error) {
//       console.error('Error al hacer logout:', error);
//     }
//   };

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="perfil-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <div className="info-section" style={{ flex: 1 }}>
//         <h2>Perfil de {employeeInfo.nombre}</h2>
//         <p><strong>Apellido:</strong> {employeeInfo.apellido_1} {employeeInfo.apellido_2}</p>
//         <p><strong>Email:</strong> {employeeInfo.email}</p>
//         <p><strong>Teléfono:</strong> {employeeInfo.telefono}</p>
//         <p><strong>Puesto:</strong> {employeeInfo.puesto}</p>
//         <p><strong>Fecha de Contratación:</strong> {new Date(employeeInfo.fecha_contratación).toLocaleDateString()}</p>
//         <p><strong>Cumpleaños:</strong> {new Date(employeeInfo.cumpleaños).toLocaleDateString()}</p>
//         <img src={employeeInfo.foto} alt={`${employeeInfo.nombre} ${employeeInfo.apellido_1}`} />
//       </div>
//       <div className="logout-section" style={{ alignSelf: 'center' }}>
//         <button onClick={handleLogout} className="logout-button">Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Perfil;
import React from 'react';

const Perfil = ({ id, setIsAuthenticated, onLogout }) => {
  const handleLogout = () => {
    // Aquí puedes agregar cualquier lógica adicional antes de cerrar sesión
    onLogout(); // Llama a la función onLogout que apaga la webcam
  };

  return (
    <div>
      <h1>Perfil de Empleado</h1>
      <p>ID del Empleado: {id}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Perfil;
