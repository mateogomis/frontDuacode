import React from "react";
import { Link } from "react-router-dom";
import '../styles/ProyectoCard.css';

const ProyectoCard = ({ proyecto }) => {
  return (
    <div className="employee-card">
      <p>{proyecto.nombre}</p>
      <Link to={`/proyectos/${proyecto.id}`} className="detalle-enlace">
        <span className="detalles">
          <button>Detalle Proyectos</button>
        </span>
      </Link>
    </div>
  );
};

export default ProyectoCard;
