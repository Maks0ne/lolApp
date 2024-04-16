import { useState } from 'react';
import axios from 'axios';

export const useHttp = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };


  return { fetchData, data, loading, error };
};



