import { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get("https://api.spotify.com/v1/search", {
          params: {
            q: query,
            type: "track",
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SPOTIFY_TOKEN}`,
          },
        });

        setMusicResults(response.data.tracks.items);
      } catch (err) {
        setError("검색 실패.");
        console.error("Spotify API 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [query]);

  return { musicResults, loading, error };
};

export default useMusic;
