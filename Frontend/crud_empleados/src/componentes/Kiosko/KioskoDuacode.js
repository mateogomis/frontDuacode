import React, { useState } from 'react';
import './KioskoDuacode.css';
import Seccion from './Seccion';
import CarruselPortada from './CarruselPortada';
import useFetchData from './scripts/useFetchData';
import Empleado from './Empleado';
import Proyecto from './Proyecto';
import Sede from './Sede';
import LectorQr from './LectorQr';
import Perfil from './Perfil'; // Importa el componente Perfil

const KioskoDuacode = () => {
  const { data: empleado, error: empleadoError } = useFetchData('http://localhost:8000/api/empleados/20/');
  const { data: proyecto, error: proyectoError } = useFetchData('http://localhost:8000/api/proyectos/1/');
  const { data: sedes, error: sedesError } = useFetchData('http://localhost:8000/api/sedes/sedes/');

  const primeraSede = sedes && sedes.length > 0 ? sedes[0] : null;
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controla la autenticación
  const [employeeId, setEmployeeId] = useState(null);

  return (
    <div className="container">
      {empleadoError && <p>Error al cargar el empleado: {empleadoError.message}</p>}
      {empleado && (
        <Seccion title="Empleados" items={[empleado]} renderItem={(emp) => <Empleado empleado={emp} />} />
      )}
      {proyectoError && <p>Error al cargar el proyecto: {proyectoError.message}</p>}
      {proyecto && (
        <Seccion title="Proyectos" items={[proyecto]} renderItem={(proj) => <Proyecto proyecto={proj} />} />
      )}
      {sedesError && <p>Error al cargar las sedes: {sedesError.message}</p>}
      {primeraSede && (
        <Seccion title="Sede Principal" items={[primeraSede]} renderItem={(s) => <Sede sede={s} />} />
      )}
        {sedesError && <p>Error al cargar las sedes: {sedesError.message}</p>}
      {primeraSede && (
        <Seccion title="Sede Principal" items={[primeraSede]} renderItem={(s) => <Sede sede={s} />} />
      )}

      <div className="section large">
        <CarruselPortada />
      </div>
      <div className="section large">
        {isAuthenticated ? (
          <Perfil id={employeeId} setIsAuthenticated={setIsAuthenticated} /> // Pasa setIsAuthenticated al componente Perfil
        ) : (
          <LectorQr setIsAuthenticated={setIsAuthenticated} setEmployeeId={setEmployeeId} /> // Pasa setIsAuthenticated y setEmployeeId a LectorQr
        )}
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default KioskoDuacode;
