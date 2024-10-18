import React, { useState } from 'react';
import './Login.css'; // Importa la hoja de estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de autenticación
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>

      </form>

      
    </div>
  );
};

export default Login;
