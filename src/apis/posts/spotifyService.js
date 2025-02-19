import axios from "axios";
import { getAccessToken } from "./auth";

export const API2 = async (query) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: query,
        type: "track",
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.tracks.items;
  } catch (err) {
    console.error("Spotify API 호출 에러:", err);
    throw new Error("음악 검색 실패");
  }
};
