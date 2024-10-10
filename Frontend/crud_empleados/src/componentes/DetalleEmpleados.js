//Esta es la vista una vez pinchas en un empleado, te muestra sus datos.He cambiado el nombre del fichero 
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/DetalleEmpleados.css'; 
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const DetalleEmpleados = () => {
  const { id } = useParams();
  const [empleadoDetail, setEmpleadoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(500);

  // Función para verificar si hoy es el cumpleaños del empleado
  const esCumpleaños = useCallback(() => {
    if (!empleadoDetail || !empleadoDetail.cumpleaños) return false;

    const today = new Date();
    const cumpleanos = new Date(empleadoDetail.cumpleaños);

    return (
      today.getMonth() === cumpleanos.getMonth() &&
      today.getDate() === cumpleanos.getDate()
    );
  }, [empleadoDetail]);

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/empleados/${id}/`);
        setEmpleadoDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchEmpleado();
  }, [id]);

  useEffect(() => {
    if (esCumpleaños()) {
      setShowConfetti(true);
      setShowBirthdayMessage(true);

      const interval = setInterval(() => {
        setConfettiPieces((pieces) => Math.max(pieces - 50, 0));
      }, 1000);

      const timer = setTimeout(() => {
        clearInterval(interval);
        setShowConfetti(false);
      }, 10000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [esCumpleaños]); // Incluye la función memoizada como dependencia

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el empleado: {error.message}</div>;

  return (
    <div className="detalle-empleado-container">
      <header className="header">
        <div className="logo">
          duacode<span>.</span>
        </div>
      </header>

      {showBirthdayMessage && (
        <h2 className="birthday-message">🎂 ¡Feliz cumpleaños {empleadoDetail.nombre}! 🎂</h2>
      )}

      {showConfetti && (
        <>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={confettiPieces}
            gravity={0.2}
            colors={['#ff009d', '#61368C', '#fff']}
          />
          <div className="balloons-container">
            <img src="/images/file.png" alt="celebration" className="balloon-image" />
            <img src="/images/file.png" alt="celebration" className="balloon-image" />
            <img src="/images/file.png" alt="celebration" className="balloon-image" />
          </div>
        </>
      )}
      
      {empleadoDetail && (
        <div className="detalle-empleado-card">
          <img
            src={empleadoDetail.foto}
            alt={`${empleadoDetail.nombre} ${empleadoDetail.apellido_1}`}
            className="empleado-imagen"
          />
          <h2>{empleadoDetail.nombre} {empleadoDetail.apellido_1} {empleadoDetail.apellido_2}</h2>
          <p><strong>Email:</strong> {empleadoDetail.email}</p>
          <p><strong>Teléfono:</strong> {empleadoDetail.telefono}</p>
          <p><strong>Puesto:</strong> {empleadoDetail.puesto}</p>
          <p><strong>Fecha de Contratación:</strong> {empleadoDetail.fecha_contratación}</p>
          <p><strong>Cumpleaños:</strong> {empleadoDetail.cumpleaños}</p>
          <p><strong>Estado:</strong> {empleadoDetail.is_on_leave ? 'Está de baja' : 'No está de baja'}</p>
        </div>
      )}
    </div>
  );
};

export default DetalleEmpleados;
