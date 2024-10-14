import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Principal.css';

function Principal() {
  const [principal, setPrincipal] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = 5;
    const fetchPrincipal = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/empleados/${id}`);
        setPrincipal(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrincipal();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main">
      <div className="header">
        <h1>duacode<span>.</span></h1>
        <div className="icons">
          <span className="icon-bell">🔔</span>
          <span className="icon-login">→</span>
        </div>
      </div>

      <div className="content">
        <h2>Bienvenido {principal.nombre}</h2>
        <div className="user-icon">
          <img src={principal.foto} alt={`${principal.nombre} ${principal.apellido_1}`} />
        </div>
        <p>{principal.rol.nombre}</p>
      </div>
    </div>
  );
}

export default Principal;
