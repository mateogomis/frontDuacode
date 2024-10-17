import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./Header";
import EmployeeGrid from "./EmployeeGrid";
import LoadMoreButton from "./LoadMoreButton";
import Spinner from "./Spinner";
import "../styles/empleados.css";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const empleadosPorPagina = 10;

  const fetchEmpleados = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/api/empleados/", {
        params: { page, limit: empleadosPorPagina },
      });
      if (data.length > 0) {
        setEmpleados((prev) => [
          ...prev,
          ...data.filter((e) => !prev.some((emp) => emp.id === e.id)),
        ]);
        if (data.length < empleadosPorPagina) setHasMore(false);
      } else setHasMore(false);
    } catch (error) {
      console.error("Error fetching empleados:", error);
      setHasMore(false);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchEmpleados();
  }, [fetchEmpleados]);

  const cargarMas = () =>
    !loading && hasMore && setPage((prev) => prev + 1);

  const filteredEmpleados = empleados.filter(({ nombre, apellido_1 }) =>
    `${nombre} ${apellido_1}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`empleados-page ${menuOpen ? "menu-active" : ""}`}>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="employees-section">
        <EmployeeGrid
          empleados={filteredEmpleados.slice(0, page * empleadosPorPagina)}
        />

        {hasMore && !loading && (
          <LoadMoreButton cargarMas={cargarMas} />
        )}

        {loading && <Spinner />}
      </main>
    </div>
  );
};

export default Empleados;
