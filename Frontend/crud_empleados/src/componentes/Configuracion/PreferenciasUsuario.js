//Este componente gestiona las preferencias de tema e idioma.
import React, { useState } from 'react';

const Preferencias = () => {
  const [tema, setTema] = useState('Claro');
  const [idioma, setIdioma] = useState('Español');
  const [recibirNotificaciones, setRecibirNotificaciones] = useState(true);

  const handleGuardarPreferencias = (e) => {
    e.preventDefault();
    // Lógica para guardar preferencias
    alert('Preferencias guardadas');
  };

  return (
    <div className="config-section">
      <h2>Preferencias</h2>
      <form onSubmit={handleGuardarPreferencias}>
        <select value={tema} onChange={(e) => setTema(e.target.value)}>
          <option value="Claro">Claro</option>
          <option value="Oscuro">Oscuro</option>
        </select>
        <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
        </select>
        
        {/* Agrupamos la casilla y el texto en un contenedor */}
        <div className="checkbox-container">
        <label htmlFor="recibirNotificaciones">Recibir Notificaciones</label>
          <input 
            type="checkbox" 
            checked={recibirNotificaciones} 
            onChange={(e) => setRecibirNotificaciones(e.target.checked)} 
            id="recibirNotificaciones"
          />
        </div>
        
        <button type="submit">Guardar Preferencias</button>
      </form>
    </div>
  );
};

export default Preferencias;
