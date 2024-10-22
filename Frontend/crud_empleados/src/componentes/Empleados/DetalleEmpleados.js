import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useWindowSize } from "react-use";
import Header from "../Header";
import DetalleEmplCarta from "./DetalleEmplCarta";
import MensajeCumple from "../MensajeCumple";
import Confettis from "../Confettis";
import Spinner from "../Spinner";
import MensajeError from "../MensajeError";
import "../../styles/DetalleEmpleados.css";

const DetalleEmpleados = () => {
  const { id } = useParams();
  const [empleadoDetail, setEmpleadoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(500);

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
        const response = await axios.get(
          `http://localhost:8000/api/empleados/${id}/`
        );
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
  }, [esCumpleaños]);

  if (loading) return <Spinner />;
  if (error) return <MensajeError error={error.message} />;

  return (
    <div className="detalle-empleado-container">
      <Header />

      {showBirthdayMessage && <MensajeCumple name={empleadoDetail.nombre} />}

      {showConfetti && (
        <Confettis
          width={width}
          height={height}
          confettiPieces={confettiPieces}
        />
      )}

      {empleadoDetail && (
        <DetalleEmplCarta empleadoDetail={empleadoDetail} />
      )}
    </div>
  );
};

export default DetalleEmpleados;
