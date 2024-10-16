//Componente principal de vista Reserva 
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';
import ErrorMessage from './ErrorMessage';

const Reserva = () => {
  const { salaId } = useParams(); // Obtiene el ID de la sala desde la URL.
  const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas.
  const [error, setError] = useState(null); // Estado para manejar errores.

  useEffect(() => {
    // Función para obtener las reservas de la sala desde la API.
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/sedes/reservas`);
        setReservas(response.data);
        console.log('Fetched reservations data:', response.data); // Almacena las reservas obtenidas.
      } catch (error) {
        setError('Error al cargar las reservas'); // Guarda un mensaje de error si falla la solicitud.
      }
    };

    fetchReservas(); // Ejecuta la función al montar el componente.
  }, [salaId]);

  // Función que gestiona la selección de fechas en el calendario
  const handleDateSelect = async (info) => {
    const reservaData = {
      sala_id: salaId,
      fecha_inicio: info.startStr,
      fecha_fin: info.endStr
    };

    try {
      const response = await axios.post('http://localhost:8000/api/reserva/', reservaData);
      alert('Reserva realizada con éxito');
      
      setReservas([...reservas, {
        title: `Reserva - Sala ${salaId}`,
        start: info.startStr,
        end: info.endStr,
      }]);
    } catch (error) {
      alert('Error al realizar la reserva'); // Muestra un mensaje de error si falla la solicitud.
    }
  };

  return (
    <div>
      <h1>Reservar Sala</h1>
      {error && <ErrorMessage message={error} />}
      <Calendar reservas={reservas} handleDateSelect={handleDateSelect} />
    </div>
  );
};

export default Reserva;
