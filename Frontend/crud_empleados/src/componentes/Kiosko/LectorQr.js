import React, { useEffect, useRef, useState } from "react";
import './LectorQr.css';
import Perfil from './Perfil'; // Asegúrate de importar el componente Perfil

const LectorQr = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeId, setEmployeeId] = useState(null); // Aquí se almacena el ID del empleado
  const videoRef = useRef(null);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const csrfTokenValue = getCookie("csrftoken");
    setCsrfToken(csrfTokenValue);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@zxing/library@latest";
    script.async = true;
    script.onload = () => {
      const codeReader = new window.ZXing.BrowserQRCodeReader();

      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          const employeeData = JSON.parse(result.text);
          const newUsername = `${employeeData.nombre}.${employeeData.apellido_1}`;
          const newPassword = employeeData.contraseña;

          setUsername(newUsername);
          setPassword(newPassword);
          setEmployeeId(employeeData.id); // Asigna el ID del empleado
        }
        if (err && !(err instanceof window.ZXing.NotFoundException)) {
          console.error(err);
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrfToken,
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      setWelcomeMessage(data.message); // Asigna el mensaje de bienvenida devuelto
      setIsAuthenticated(true); // Cambia el estado a autenticado
    } else {
      const errorData = await response.json();
      setWelcomeMessage(errorData.error || "Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    // Lógica para manejar el cierre de sesión
    window.location.href = "/logout"; // Asegúrate de que esta ruta es correcta
  };

  // Renderiza el Perfil si el usuario está autenticado
  if (isAuthenticated) {
    return <Perfil id={welcomeMessage} />; // Pasa el ID del empleado al componente Perfil
  }

  return (
    <div className="container">
      {welcomeMessage && <div className="alert alert-info">{welcomeMessage}</div>}
      <div className="form-container">
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>

      <div className="video-container">
        <video id="preview" ref={videoRef} width="340" height="270"></video>
      </div>

      {welcomeMessage && <button onClick={handleLogout}>Cerrar Sesión</button>}
    </div>
  );
};

export default LectorQr;
