// services/planetService.js
import { API } from '../axios.js';

export async function postPlanetName(name) {
  try {
    const response = await API.post('/posts', { planetName: name });
    return response.data?.id ?? null;
  } catch (error) {
    console.error('jsonplaceholder post 에러:', error);
    return null;
  }
}

export async function patchPlanetName(id, name) {
  try {
    await API.patch(`/posts/${id}`, { planetName: name });
    return true;
  } catch (error) {
    console.error('jsonplaceholder patch 에러:', error);
    return false;
  }
}
