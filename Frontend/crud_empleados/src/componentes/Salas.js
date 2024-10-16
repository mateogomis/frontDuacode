import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Asegúrate de importar useParams
import axios from 'axios';
import SalaList from './SalaList';
import '../styles/salas.css';

const Salas = () => {
  const { sedeId } = useParams(); // Ahora useParams estará correctamente definido
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        console.log(`Fetching salas for sede ID: ${sedeId}`);
        const response = await axios.get(
          `http://localhost:8000/api/sedes/salas/?sede_id=${sedeId}`
        );
        console.log("Salas fetched:", response.data);
        setSalas(response.data);
      } catch (err) {
        console.error("Error fetching salas:", err);
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
      <SalaList salas={salas} />
    </div>
  );
};

export default Salas;
