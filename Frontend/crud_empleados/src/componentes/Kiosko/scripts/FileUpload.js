import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [descripcion, setDescripcion] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('descripcion', descripcion);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      const data = await response.json();
      console.log('Archivo subido:', data);
      alert('Archivo subido con éxito.');
      // Aquí puedes resetear los estados si lo deseas
      setFile(null);
      setDescripcion('');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo.');
    }
  };

  return (
    <div className="file-upload">
      <h4>Subir Archivo</h4>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={handleDescripcionChange}
        />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
};

export default FileUpload;
