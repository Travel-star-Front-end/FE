import axios from 'axios';

// 랜덤 색상 근데 이제 백으로부터 감정 받아야함함
export const getRandomColor = () => {
  const colors = [
    '#ff6600',
    '#ff9900',
    '#ffcc00',
    '#66ff33',
    '#33ccff',
    '#cc66ff',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 랜덤 사이즈즈
export const getRandomStarSize = () => {
  const sizes = ['7rem', '9rem', '11rem'];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

// Google Geocoding API로 위도와 경도 가져오기
export const fetchCoordinates = async (city) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_TOKEN;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    city
  )}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.log('너 뭐임?');
      return null;
    }
  } catch (error) {
    console.error('Geocoding API 요청 중 오류 발생:', error);
    return null;
  }
};
