import { useState, useEffect } from 'react';
import { API } from '../apis/axios';

const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await API.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('응답 데이터', response.data);
        setData(response.data);
      } catch (err) {
        console.log('요청 실패', err);
        setError(err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...dependencies]);

  return { data, loading, error };
};

export default useFetch;
