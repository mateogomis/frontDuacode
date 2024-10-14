import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/mapa.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapaSedes = () => {
  const [mapMode, setMapMode] = useState("light"); // Estado para controlar el modo oscuro o claro del mapa

  useEffect(() => {
    // Configuramos el icono por defecto de Leaflet manualmente
    const DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Inicializar el mapa centrado en España
    const map = L.map("map").setView([40.416775, -3.70379], 6);

    // Función para agregar las capas
    const addLayers = (mode) => {
      const lightLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
        }
      );

      const darkLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap contributors & CartoDB",
        }
      );

      // Añadir capa según el modo seleccionado
      if (mode === "light") {
        lightLayer.addTo(map);
      } else {
        darkLayer.addTo(map);
      }

      // Añadir los marcadores
      L.marker([40.416775, -3.70379], { icon: DefaultIcon }) // Madrid
        .addTo(map)
        .bindPopup("<b>Sede Internacional</b><br>Madrid");

      L.marker([43.367417, -8.400889], { icon: DefaultIcon }) // Galicia
        .addTo(map)
        .bindPopup(
          "<b>Sede Principal</b><br>Galicia, Av. Porto da Coruña, 3, Local 3, 15003 A Coruña"
        );

      L.marker([39.484677, -0.363434], { icon: DefaultIcon }) // Valencia
        .addTo(map)
        .bindPopup(
          "<b>Sede Secundaria</b><br>Valencia, Av. de Catalunya, 9, Entlo, Benimaclet 46020"
        );
    };

    // Inicialmente cargamos el modo claro
    addLayers(mapMode);

    // Cleanup: eliminar el mapa al desmontar el componente
    return () => {
      map.remove();
    };
  }, [mapMode]); // El useEffect se ejecuta cuando cambia el modo

  return (
    <div className="mapa-sedes-container">
      <h1>Mapa de Sedes</h1>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>

      {/* Botón para alternar entre los modos */}
      <button
        className="toggle-mode-btn"
        onClick={() => setMapMode(mapMode === "light" ? "dark" : "light")}
      >
        Cambiar a Modo {mapMode === "light" ? "Oscuro" : "Claro"}
      </button>
    </div>
  );
};

export default MapaSedes;
