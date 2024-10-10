import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const Reserva = () => {
  const { salaId } = useParams(); // Obtiene el ID de la sala desde la URL.
  const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas.
  const [error, setError] = useState(null); // Estado para manejar errores.

  useEffect(() => {
    // Función para obtener las reservas de la sala desde la API.
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/sedes/${salaId}/reservas`);
        setReservas(response.data); // Almacena las reservas obtenidas.
      } catch (error) {
        setError('Error al cargar las reservas'); // Guarda un mensaje de error si falla la solicitud.
      }
    };

    fetchReservas(); // Ejecuta la función al montar el componente.
  }, [salaId]);

  const handleDateSelect = async (info) => {
    // Datos de la nueva reserva.
    const reservaData = {
      sala_id: salaId,
      fecha_inicio: info.startStr,
      fecha_fin: info.endStr
    };

    try {
      // Enviar la nueva reserva a la API.
      const response = await axios.post('http://localhost:8000/api/reserva/', reservaData);
      alert('Reserva realizada con éxito');
      
      // Actualiza el estado de las reservas con la nueva.
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
      {error && <p className="error">{error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // Muestra la vista de la semana con las horas.
        selectable={true} // Permite seleccionar un rango de fechas.
        events={reservas} // Muestra las reservas en el calendario.
        select={handleDateSelect} // Llama a la función cuando el usuario selecciona un rango de fechas.
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />
    </div>
  );
};

export default Reserva;
