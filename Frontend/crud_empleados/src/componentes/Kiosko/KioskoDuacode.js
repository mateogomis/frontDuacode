import React, { useState } from 'react';
import './KioskoDuacode.css';
import Seccion from './Seccion'; 
import CarruselPortada from './CarruselPortada'; 
import useFetchData from './scripts/useFetchData'; 
import Empleado from './Empleado'; 
import Proyecto from './Proyecto'; 
import Sede from './Sede'; 
import Login from './Login';
import Navigation from './Navigation';
import LectorQr from './LectorQr'
import Perfil from './Perfil'; // Import the Perfil component

const KioskoDuacode = () => {
  const { data: empleado, error: empleadoError } = useFetchData('http://localhost:8000/api/empleados/20/');
  const { data: proyecto, error: proyectoError } = useFetchData('http://localhost:8000/api/proyectos/1/');
  const { data: sedes, error: sedesError } = useFetchData('http://localhost:8000/api/sedes/sedes/'); 

  const primeraSede = sedes && sedes.length > 0 ? sedes[0] : null;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
      <Seccion title="Navegacion" items={[]} renderItem={() => <Navigation />} />
      <div className="section large">
        <CarruselPortada />
      </div>
      <div className="section large">
              {isAuthenticated ? (
        <Perfil id={employeeId} /> // Show Perfil component if authenticated
      ) : (
        <LectorQr setIsAuthenticated={setIsAuthenticated} setEmployeeId={setEmployeeId} /> // Show LectorQr if not authenticated
      )}
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default KioskoDuacode;