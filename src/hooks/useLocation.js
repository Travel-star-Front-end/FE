import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_TOKEN;
const GEOCODING_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&latlng=`;

const useLocation = () => {
    const [location, setLocation] = useState("");
    const [latLng, setLatLng] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatLng({ lat: latitude, lng: longitude });

                    fetch(`${GEOCODING_URL}${latitude},${longitude}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === "OK") {
                                const formattedAddress = data.results[0]?.formatted_address;
                                setLocation(formattedAddress || "주소를 찾을 수 없음");
                            } else {
                                setLocation("주소를 찾을 수 없음");
                            }
                        })
                        .catch(() => {
                            setError("주소를 가져오기 실패");
                            setLocation("주소를 가져오기 실패");
                        });
                },
                (error) => {
                    setError(error.message);
                    setLocation("위치를 가져오기 실패");
                }
            );
        } else {
            setError("위치 가져오기 실패");
            setLocation("위치 가져오기 실패");
        }
    }, []);

    return { location, latLng, error };
};

export default useLocation;
