import React, { useState, useEffect } from 'react';
import './CarruselPortada.css'; // Asegúrate de tener este archivo para los estilos
import useFetchData from './scripts/useFetchData'; // Importa el hook personalizado

const CarruselPortada = () => {
  const { data: rooms, error, setData } = useFetchData('http://localhost:8000/api/sedes/salas/'); // Usa el hook para obtener las salas
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setCurrentIndex(0); // Reinicia el índice cuando los datos se cargan correctamente
    }
  }, [rooms]);

  const nextRoom = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const prevRoom = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length);
  };

  if (error) {
    return <p>Error al cargar las salas: {error.message}</p>;
  }

  return (
    <div className="carousel">
      <button className="carousel-button" onClick={prevRoom}>
        &#10094; {/* Flecha izquierda */}
      </button>

      {rooms && rooms.length > 0 ? (
        <div className="image-container">
          <img
            src={`http://localhost:8000${rooms[currentIndex].imagen_url}`} // Mostrar la imagen
            alt={`Imagen de ${rooms[currentIndex].nombre}`}
            className="carousel-image"
          />
          <div className="room-info">
            <h3>{rooms[currentIndex].nombre}</h3> {/* Nombre de la sala */}
            <p>Capacidad: {rooms[currentIndex].capacidad}</p> {/* Capacidad */}
            <p>Sede: {rooms[currentIndex].sede.nombre}</p> {/* Nombre de la sede */}
            <p>Dirección: {rooms[currentIndex].sede.direccion}</p> {/* Dirección */}
          </div>
        </div>
      ) : (
        <p>Cargando salas...</p>
      )}

      <button className="carousel-button" onClick={nextRoom}>
        &#10095; {/* Flecha derecha */}
      </button>
    </div>
  );
};

export default CarruselPortada;


