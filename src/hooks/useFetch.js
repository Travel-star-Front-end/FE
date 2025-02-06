import { useState, useEffect } from "react";
import { API } from "../apis/axios";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return; 

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const accessToken = localStorage.getItem("accessToken");
                const response = await API.get(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.data && (typeof response.data === "object" || Array.isArray(response.data))) {
                    setData(response.data);
                } else {
                    console.error("Error:", response.data);
                    setError("서버 응답이 올바르지 않습니다.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
