import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Preferencias = () => {
  const [tema, setTema] = useState('Claro'); // Por defecto, tema claro
  const [idioma, setIdioma] = useState('Español');
  const [recibirNotificaciones, setRecibirNotificaciones] = useState(true);
  const { i18n } = useTranslation();

  // Cambia el tema aplicando una clase al body
  useEffect(() => {
    document.body.className = tema === 'Oscuro' ? 'dark-theme' : 'light-theme';
  }, [tema]);

  // Cambia el idioma usando i18next
  useEffect(() => {
    i18n.changeLanguage(idioma === 'Español' ? 'es' : 'en');
  }, [idioma, i18n]);

  const handleGuardarPreferencias = (e) => {
    e.preventDefault();
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
