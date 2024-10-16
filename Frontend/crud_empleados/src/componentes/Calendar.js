//Calendario vista reserva (Componente del calendario)
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ reservas, handleDateSelect }) => {
  return (
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
  );
};

export default Calendar;
