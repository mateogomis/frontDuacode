// Esta vista es la pagina incial de proyectos, aqui seleccionas el proyecto que prefieras
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import '../styles/proyectos.css';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const proyectosPorPagina = 10;

  // Función que obtiene proyectos desde el backend utilizando paginación
  const fetchProyectos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/proyectos/", {
        params: { page, limit: proyectosPorPagina },
      });
      const newProyectos = response.data;
      console.log(response.data);
      if (newProyectos.length > 0) {
        // Filtramos los proyectos para evitar duplicados
        const filteredNewProyectos = newProyectos.filter(
          (newProyecto) =>
            !proyectos.some(
              (existingProyecto) => existingProyecto.id === newProyecto.id
            )
        );

        // Si hay nuevos proyectos sin duplicados, los agregamos a la lista
        if (filteredNewProyectos.length > 0) {
          setProyectos((prevProyectos) => [
            ...prevProyectos,
            ...filteredNewProyectos,
          ]);
        }

        if (newProyectos.length < proyectosPorPagina) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching proyectos:", error);
      setHasMore(false);
    }
    setLoading(false);
  }, [page, proyectos]);

  useEffect(() => {
    fetchProyectos();
  }, [fetchProyectos]);

  const filteredProyectos = proyectos.filter((proyecto) =>
    `${proyecto.nombre}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cargarMasProyectos = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={`proyectos-page ${menuOpen ? "menu-active" : ""}`}>
      <header className={`header ${menuOpen ? "menu-open" : ""}`}>
        <div
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="logo">
          <h1>
            duacode<span>.</span>
          </h1>
        </div>
        <div className="search-toggle">
          <button onClick={() => setSearchVisible(!searchVisible)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>
        {searchVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar proyecto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </header>

      {/* Sección de proyectos */}
      <main className="employees-section">
        <div className="employees-grid">
          {filteredProyectos
            .slice(0, page * proyectosPorPagina)
            .map((proyecto) => (
              <div className="employee-card" key={proyecto.id}>
                <p>{proyecto.nombre}</p>
                <Link
                  to={`/proyectos/${proyecto.id}`}
                  className="detalle-enlace"
                >
                  <span className="detalles">
                    <button>Detalle Proyectos</button>
                  </span>
                </Link>
              </div>
            ))}
        </div>

        {hasMore && !loading && (
          <div className="load-more">
            <button onClick={cargarMasProyectos}>Cargar más</button>
          </div>
        )}

        {loading && <div className="spinner">Cargando...</div>}
      </main>
    </div>
  );
};

export default Proyectos;
