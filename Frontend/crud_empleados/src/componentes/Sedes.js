import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faGlobe, faUniversity } from '@fortawesome/free-solid-svg-icons';
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
      {/* Barra en movimiento */}
      <div className="moving-bar">
        <div className="moving-content">
          <div className="moving-item">
            <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience ">PERIENCE</span>
             <span className="uxperience">.</span></p>
            <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
          </div>
          <div className="moving-item">
            <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience ">PERIENCE</span>
             <span className="uxperience">.</span></p>
            <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
          </div>
          {/* Duplicamos los elementos para asegurar la continuidad */}
          <div className="moving-item">
            <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience ">PERIENCE</span>
             <span className="uxperience">.</span></p>
            <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
          </div>
          <div className="moving-item">
             <span className="uxperience">.</span>
            <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience ">PERIENCE</span>
             <span className="uxperience">.</span></p>
            <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
          </div>
          <div className="moving-item">
            <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience ">PERIENCE</span>
            <span className="uxperience">.</span></p>
            <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
          </div>
          <div className="moving-item">
            <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience">PERIENCE</span>
            <span className="uxperience">.</span></p>
            <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
          </div>
          
        </div>
      </div>

      <h1 className="sedes"></h1>

      <div className="sedes-grid">
        {sedes.length > 0 ? (
          sedes.map((sede) => (
            <div key={sede.id} className="sede-card">
              <FontAwesomeIcon
                icon={sede.tipo === 'principal' ? faBuilding : sede.tipo === 'internacional' ? faGlobe : faUniversity}
                size="3x"
                className="sede-icon"
              />
              <h2>{sede.nombre}</h2>
              <p>Ubicación: {sede.direccion}, {sede.ciudad}, {sede.pais}</p>

              <Link to={`/salas/${sede.id}`} className="ver-salas-btn">
                Ver Salas Disponibles
              </Link>
            </div>
          ))
        ) : (
          <p>No hay sedes disponibles.</p>
        )}
      </div>

      {/* Pie de página */}
      <footer className="footer">
        <div className="footer-info">
          <p>&copy; 2024 duacode. Todos los derechos reservados.</p>
          <p>
          <a href="mailto:mateoopg01@gmail.com?subject=Solicitud%20de%20Soporte&body=Por%20favor%2C%20explique%20su%20problema%3A">Contactar Soporte</a>
          | 
            <Link to="/mapa"> Ver Mapa de Sedes</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Sedes;
