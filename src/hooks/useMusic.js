import { useState, useEffect } from "react";
import { API } from "../apis/posts/spotifyService"

const useMusic = (query) => {
  const [musicResults, setMusicResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMusicResults([]);
      return;
    }

    const fetchMusic = async () => {
      setLoading(true);
      setError(null);

      try {
        const tracks = await API(query);
        setMusicResults(tracks);
      } catch (err) {
        setError("검색 실패.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [query]);

  return { musicResults, loading, error };
};

export default useMusic;
