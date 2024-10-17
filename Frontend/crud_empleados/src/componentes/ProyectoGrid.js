import React from "react";
import ProyectoCard from "./ProyectoCard";

const ProyectoGrid = ({ proyectos }) => {
  return (
    <div className="employees-grid">
      {proyectos.map((proyecto) => (
        <ProyectoCard key={proyecto.id} proyecto={proyecto} />
      ))}
    </div>
  );
};

export default ProyectoGrid;
