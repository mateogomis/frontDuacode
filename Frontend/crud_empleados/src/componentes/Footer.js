import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <p>&copy; 2024 duacode. Todos los derechos reservados.</p>
        <p>
          <a href="mailto:mateoopg01@gmail.com?subject=Solicitud%20de%20Soporte&body=Por%20favor%2C%20explique%20su%20problema%3A">Contactar Soporte</a>
          | 
          <Link to="/mapa"> Ver Mapa de Sedes</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
