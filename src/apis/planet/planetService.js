// services/planetService.js
import { API } from '../axios.js';

// 행성 설정
export const postPlanetName = async (planetName) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await API.post(`/api/users/${userId}/planets`, {
      name: planetName,
    });
    return response.data.id;
  } catch (error) {
    console.error('행성 생성 실패:', error);
    throw error;
  }
};

export async function patchPlanetName(id, name) {
  try {
    await API.patch(`/posts/${id}`, { planetName: name });
    return true;
  } catch (error) {
    console.error('jsonplaceholder patch 에러:', error);
    return false;
  }
}
