import React, { useRef } from 'react';
import SalaCard from './SalaCard';
import '../../styles/carrusel.css'; // Asegúrate de tener los estilos aquí

const SalaList = ({ salas }) => {
  const carruselRef = useRef(null);

  // Función para desplazar el carrusel a la izquierda (una tarjeta a la vez)
  const scrollLeft = () => {
    const cardWidth = carruselRef.current.querySelector('.sala-card').offsetWidth;
    carruselRef.current.scrollBy({
      left: -cardWidth, // Desplazar el ancho de una tarjeta completa
      behavior: 'smooth',
    });
  };

  // Función para desplazar el carrusel a la derecha (una tarjeta a la vez)
  const scrollRight = () => {
    const cardWidth = carruselRef.current.querySelector('.sala-card').offsetWidth;
    carruselRef.current.scrollBy({
      left: cardWidth, // Desplazar el ancho de una tarjeta completa
      behavior: 'smooth',
    });
  };

  if (salas.length === 0) {
    return <p>No hay salas disponibles en esta sede.</p>;
  }

  return (
    <div className="carrusel-container">
      <button className="carrusel-button left" onClick={scrollLeft}>
        &#10094; {/* Flecha hacia la izquierda */}
      </button>

      <div className="carrusel" ref={carruselRef}>
        {salas.map((sala) => (
          <SalaCard key={sala.id} sala={sala} />
        ))}
      </div>

      <button className="carrusel-button right" onClick={scrollRight}>
        &#10095; {/* Flecha hacia la derecha */}
      </button>
    </div>
  );
};

export default SalaList;
