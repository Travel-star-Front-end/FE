import { useState, useEffect } from "react";
import { API } from "../apis/axios";

const usePost = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const triggerPost = async (body = {}) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(url, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            setData(response.data);
            return response.data; // 성공 시 데이터 반환
        } catch (err) {
            setError(err.message);
            return null; // 실패 시 null 반환
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, triggerPost };
};

export default usePost;