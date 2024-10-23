import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SedeCard from './SedeCard';
import MovingBar from '../MovingBar';
import Footer from '../Footer';
import '../../styles/sedes.css';
import { useTranslation } from 'react-i18next'; // Importamos useTranslation

const Sedes = () => {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation(); // Usamos useTranslation

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

  if (loading) return <p>{t('mensajes.cargandoSedes')}</p>; // Mensaje de carga traducido
  if (error) return <p>{t('mensajes.errorCargarSedes')}: {error}</p>; // Mensaje de error traducido

  return (
    <div className="sedes-container">
      <MovingBar /> {/* Barra en movimiento */}
      
      <div className="sedes-grid">
        {sedes.length > 0 ? (
          sedes.map(sede => <SedeCard key={sede.id} sede={sede} />) // Reutiliza el componente SedeCard para cada sede
        ) : (
          <p>{t('mensajes.noSedesDisponibles')}</p> // Mensaje de no hay sedes traducido
        )}
      </div>

      <Footer /> {/* Pie de página */}
    </div>
  );
};

export default Sedes;
