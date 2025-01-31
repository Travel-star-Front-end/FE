// services/planetService.js
import { API } from '../axios.js';

// 행성 설정
export const postPlanetName = async (planetName) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    const response = await API.post('/planet', { name }, 
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
    );
    // console.log(response.data);
    return response.data?.id ?? null;
  } catch (error) {
    console.error('Error:', error);
    return null;
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
