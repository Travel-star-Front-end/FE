// services/planetService.js
import { API } from '../axios.js';

// 행성 설정
export const postPlanetName = async (planetName) => {
  try {
    const authToken = localStorage.getItem('accessToken');
    const response = await API.post(
      '/planet',
      { name: planetName },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data?.user.user_id ?? null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export async function patchPlanetName(userId, newPlanetName) {
  try {
    const authToken = localStorage.getItem('accessToken');
    const response = await API.patch(
      `/planet/${userId}`,
      {
        name: newPlanetName,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data?.user.planet_name ?? null;
  } catch (error) {
    console.error('행성 이름 수정 에러:', error);
    return false;
  }
}

export const checkPlanetExists = async (userId) => {
  try {
    const authToken = localStorage.getItem('accessToken');
    const response = await API.get(`/prod/planet/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data);
    return response.data?.exists ?? false; // API 응답에서 'exists' 여부 반환
  } catch (error) {
    console.error('Error checking planet existence:', error);
    return false;
  }
};

export const getCalenderData = async (selectedID) => {
  try {
    const authToken = localStorage.getItem('accessToken');
    const response = await API.get(`/schedule/${selectedID}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data);
    return response.data ?? false; // API 응답에서 'exists' 여부 반환
  } catch (error) {
    console.error('Error checking planet existence:', error);
    return false;
  }
};
