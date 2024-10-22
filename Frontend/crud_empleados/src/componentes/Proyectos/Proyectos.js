import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../Header";
import ProyectoGrid from "./ProyectoGrid";
import LoadMoreButton from "../LoadMoreButton";
import Spinner from "../Spinner";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const proyectosPorPagina = 10;

  const fetchProyectos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/proyectos/", {
        params: { page, limit: proyectosPorPagina },
      });
      const newProyectos = response.data;
      if (newProyectos.length > 0) {
        const filteredNewProyectos = newProyectos.filter(
          (newProyecto) =>
            !proyectos.some(
              (existingProyecto) => existingProyecto.id === newProyecto.id
            )
        );
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
    proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cargarMasProyectos = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={`proyectos-page ${menuOpen ? "menu-active" : ""}`}>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="proyectos-section">
        <ProyectoGrid proyectos={filteredProyectos.slice(0, page * proyectosPorPagina)} />
        <LoadMoreButton hasMore={hasMore} loading={loading} onLoadMore={cargarMasProyectos} />
        {loading && <Spinner />}
      </main>
    </div>
  );
};

export default Proyectos;
