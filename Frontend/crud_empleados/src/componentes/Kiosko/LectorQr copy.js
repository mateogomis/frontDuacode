import React, { useEffect, useRef, useState } from "react";
import './LectorQr.css';
import Perfil from './Perfil';

const LectorQr = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState(""); // Este almacenará el ID del empleado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const videoRef = useRef(null);
  const videoStreamRef = useRef(null);

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

    const startVideoStream = async () => {
      try {
        videoStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = videoStreamRef.current;
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
      }
    };

    // Solo inicia el flujo de video si el usuario está autenticado
    if (isAuthenticated) {
      startVideoStream();
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@zxing/library@latest";
    script.async = true;
    script.onload = () => {
      const codeReader = new window.ZXing.BrowserQRCodeReader();

      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          const employeeData = JSON.parse(result.text);
          console.log("Empleado encontrado:", employeeData);
          const newUsername = `${employeeData.nombre}.${employeeData.apellido_1}`;
          const newPassword = employeeData.contraseña;

          setUsername(newUsername);
          setPassword(newPassword);
        }
        // if (err && !(err instanceof window.ZXing.NotFoundException)) {
        //   console.error(err);
        // }
      });
    };
    document.body.appendChild(script);

    return () => {
      // Detén el flujo de video al desmontar el componente
      if (videoStreamRef.current) {
        const tracks = videoStreamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
      document.body.removeChild(script);
    };
  }, [isAuthenticated]); // Ejecutar nuevamente si isAuthenticated cambia

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
      console.log("Inicio de sesión exitoso:", data);
      setWelcomeMessage(data.message); // Aquí estamos guardando el ID del empleado
      setIsAuthenticated(true); // Cambia el estado a autenticado
    } else {
      const errorData = await response.json();
      console.error("Error al iniciar sesión:", errorData);
      setWelcomeMessage(errorData.error || "Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Reinicia la autenticación
    setUsername(""); // Limpia el nombre de usuario
    setPassword(""); // Limpia la contraseña
    setWelcomeMessage(""); // Limpia el mensaje de bienvenida
  };

  // Añadir console logs para depurar
  console.log("isAuthenticated:", isAuthenticated);
  console.log("employeeId (welcomeMessage):", welcomeMessage);

  // Renderiza el Perfil si el usuario está autenticado y el ID está definido
  if (isAuthenticated && welcomeMessage) {
    return <Perfil id={welcomeMessage} setIsAuthenticated={setIsAuthenticated} onLogout={handleLogout} />;
  }

  return (
    <div className="container">
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
        <video id="preview" ref={videoRef} width="340" height="270" autoPlay></video>
      </div>

      {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}
    </div>
  );
};

export default LectorQr;
