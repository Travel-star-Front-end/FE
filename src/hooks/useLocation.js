import { useState, useCallback } from "react";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_TOKEN;

const useLocation = () => {
    const [locationQuery, setLocationQuery] = useState("");
    const [locationResults, setLocationResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchLocation = useCallback(async (query) => {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        address: query,
                        key: GOOGLE_MAPS_API_KEY,
                    },
                }
            );
            setLoading(false);

            if (response.data.status === "OK") {
                setLocationResults(response.data.results.slice(0, 5));
            } else {
                setError("위치 정보를 찾을 수 없습니다.");
            }
        } catch (err) {
            setLoading(false);
            setError("위치 정보를 검색하는 데 오류가 발생했습니다.");
        }
    }, []);

    const handleLocationChange = (e) => {
        const query = e.target.value;
        setLocationQuery(query);
        setLocationResults([]);
        searchLocation(query);
    };

    return {
        locationQuery,
        setLocationQuery,
        locationResults,
        loading,
        error,
        handleLocationChange,
    };
};

export default useLocation;
