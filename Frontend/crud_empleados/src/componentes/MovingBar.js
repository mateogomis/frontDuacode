import React from 'react';
import '../styles/sedes.css';

const MovingBar = () => {
  return (
    <div className="moving-bar">
      <div className="moving-content">
        {/* Repite los elementos de la barra en movimiento */}
        <div className="moving-item">
          <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience">PERIENCE</span><span className="uxperience">.</span></p>
          <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
        </div>
        <div className="moving-item">
          <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience">PERIENCE</span><span className="uxperience">.</span></p>
          <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
        </div>
        {/* Duplicar más elementos para asegurar la continuidad */}
        <div className="moving-item">
          <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience">PERIENCE</span><span className="uxperience">.</span></p>
          <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
        </div>
        <div className="moving-item">
          <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience">PERIENCE</span><span className="uxperience">.</span></p>
          <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
        </div>
        <div className="moving-item">
          <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience">PERIENCE</span><span className="uxperience">.</span></p>
          <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
        </div>
        <div className="moving-item">
          <p className="moving-text">THE SOFTWARE <span className="uxperience">UX</span><span className="movingperience">PERIENCE</span><span className="uxperience">.</span></p>
          <img src="/images/file.png" alt="duacode logo" className="moving-logo" />
        </div>
      </div>
    </div>
  );
};

export default MovingBar;
