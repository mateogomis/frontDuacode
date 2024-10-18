import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llama a la función fetch

  }, [url]); // Incluye la URL en las dependencias

  return { data, error, setData }; // Retorna setData además de data y error
};

export default useFetchData;

