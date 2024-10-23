
//Este componente se encargará de la sección de perfil de usuario.
import React, { useState } from 'react';

const PerfilUsuario = () => {
  const [nombre, setNombre] = useState('Brittany');
  const [email, setEmail] = useState('brittany@duacode.com');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    // Lógica para guardar los cambios
    alert('Cambios guardados');
  };

  return (
    <div className="config-section">
      <h2>Perfil de Usuario</h2>
      <form onSubmit={handleGuardarCambios}>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          placeholder="Nombre" 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Correo Electrónico" 
        />
        <input 
          type="file" 
          onChange={(e) => setFotoPerfil(e.target.files[0])} 
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default PerfilUsuario;
