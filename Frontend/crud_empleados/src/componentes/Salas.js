import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Importamos Link
import '../styles/salas.css';

const Salas = () => {
  const { sedeId } = useParams();
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        console.log(`Fetching salas for sede ID: ${sedeId}`);
        const response = await axios.get(`http://localhost:8000/api/sedes/salas/?sede_id=${sedeId}`);
        console.log('Salas fetched:', response.data);
        setSalas(response.data);
      } catch (err) {
        console.error('Error fetching salas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSalas();
  }, [sedeId]);

  if (loading) return <p>Cargando salas...</p>;
  if (error) return <p>Error al cargar salas: {error}</p>;

  return (
    <div id="salas-container">
      <h1>Salas Disponibles en Sede {sedeId}</h1>
      {salas.length === 0 ? (
        <p>No hay salas disponibles en esta sede.</p>
      ) : (
        <div className="salas-horizontal">
          {salas.map((sala) => (
            <div 
              key={sala.id} 
              className="sala-card"
            >
              <h2>{sala.nombre}</h2>
              <p><strong>Capacidad:</strong> {sala.capacidad} personas</p>
              <p><strong>Sede:</strong> {sala.sede.nombre}</p>
              <p><strong>Ubicación:</strong> {sala.sede.direccion}, {sala.sede.ciudad}, {sala.sede.pais}</p>
              
              {/* Botón de reserva siempre visible */}
              <Link 
                to={`/reserva/${sala.id}`} 
                className="reservar-btn"
              >
                Reservar
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Salas;
