//Este componente gestiona el cambio de contraseñas.
import React, { useState } from 'react';

const Seguridad = () => {
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleCambiarContrasena = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Lógica para cambiar la contraseña
    alert('Contraseña cambiada');
  };

  return (
    <div className="config-section">
      <h2>Seguridad</h2>
      <form onSubmit={handleCambiarContrasena}>
        <input 
          type="password" 
          value={actualPassword} 
          onChange={(e) => setActualPassword(e.target.value)} 
          placeholder="Contraseña Actual" 
        />
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="Nueva Contraseña" 
        />
        <input 
          type="password" 
          value={confirmNewPassword} 
          onChange={(e) => setConfirmNewPassword(e.target.value)} 
          placeholder="Confirmar Nueva Contraseña" 
        />
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default Seguridad;
