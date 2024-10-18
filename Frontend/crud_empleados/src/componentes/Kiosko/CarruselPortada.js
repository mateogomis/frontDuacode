import React, { useEffect, useState } from 'react';
import './CarruselPortada.css'; // Asegúrate de tener este archivo para los estilos

const CarruselPortada = () => {
  const [rooms, setRooms] = useState([]); // Cambia el estado para almacenar información de las salas
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para obtener las imágenes del backend
  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sedes/salas/'); // Cambia la URL si es necesario
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data fetched:', data); // Cambiado a 'data' en lugar de 'response.data'

      // Establecer las salas en el estado
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const nextRoom = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const prevRoom = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button" onClick={prevRoom}>
        &#10094; {/* Flecha izquierda */}
      </button>

      {rooms.length > 0 && (
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
      )}

      <button className="carousel-button" onClick={nextRoom}>
        &#10095; {/* Flecha derecha */}
      </button>
    </div>
  );
};

export default CarruselPortada;


