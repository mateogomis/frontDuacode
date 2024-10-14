// Sedes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SedeCard from './SedeCard';
import MovingBar from './MovingBar';
import Footer from './Footer';
import '../styles/sedes.css';

const Sedes = () => {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sedes/sedes/');
        setSedes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSedes();
  }, []);

  if (loading) return <p>Cargando sedes...</p>;
  if (error) return <p>Error al cargar sedes: {error}</p>;

  return (
    <div className="sedes-container">
      <MovingBar /> {/* Barra en movimiento */}
      
      <div className="sedes-grid">
        {sedes.length > 0 ? (
          sedes.map(sede => <SedeCard key={sede.id} sede={sede} />) // Reutiliza el componente SedeCard para cada sede
        ) : (
          <p>No hay sedes disponibles.</p>
        )}
      </div>

      <Footer /> {/* Pie de página */}
    </div>
  );
};

export default Sedes;