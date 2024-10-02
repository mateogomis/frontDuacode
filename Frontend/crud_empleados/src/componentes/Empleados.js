import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/empleados.css';  // Asegúrate de que el CSS está en la ruta correcta

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const empleadosPorPagina = 9;

  // Función que obtiene empleados desde el backend utilizando paginación
  const fetchEmpleados = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/empleados/', {
        params: { page, limit: empleadosPorPagina },
      });
      const newEmpleados = response.data;

      if (newEmpleados.length > 0) {
        // Filtramos los empleados para evitar duplicados
        const filteredNewEmpleados = newEmpleados.filter(
          (newEmpleado) => !empleados.some((existingEmpleado) => existingEmpleado.id === newEmpleado.id)
        );

        // Si hay nuevos empleados sin duplicados, los agregamos a la lista
        if (filteredNewEmpleados.length > 0) {
          setEmpleados((prevEmpleados) => [...prevEmpleados, ...filteredNewEmpleados]);
        }

        if (newEmpleados.length < empleadosPorPagina) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching empleados:', error);
      setHasMore(false);
    }
    setLoading(false);
  }, [page, empleados]);

  useEffect(() => {
    fetchEmpleados();
  }, [fetchEmpleados]);

  const filteredEmpleados = empleados.filter((empleado) =>
    `${empleado.nombre} ${empleado.apellido_1}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cargarMasEmpleados = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={`empleados-page ${menuOpen ? 'menu-active' : ''}`}>
      <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
        <div className={`menu-button ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="logo">
          <h1>duacode<span>.</span></h1>
        </div>
        <div className="search-toggle">
          <button onClick={() => setSearchVisible(!searchVisible)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </div>
        {searchVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </header>

      {/* Sección de empleados */}
      <main className="employees-section">
        <div className="employees-grid">
          {filteredEmpleados.slice(0, page * empleadosPorPagina).map((empleado) => (
            <div className="employee-card" key={empleado.id}>
              {empleado.foto && (
                <img
                  src={empleado.foto}
                  alt={`${empleado.nombre} ${empleado.apellido_1}`}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
              )}
              <p>{empleado.nombre} {empleado.apellido_1}</p>
            </div>
          ))}
        </div>

        {hasMore && !loading && (
          <div className="load-more">
            <button onClick={cargarMasEmpleados}>Cargar más</button>
          </div>
        )}

        {loading && <div className="spinner">Cargando...</div>}
      </main>
    </div>
  );
};

export default Empleados;
