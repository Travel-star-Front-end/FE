import axios from "axios";
import { Buffer } from "buffer";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET_ID;

export const getAccessToken = async () => {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  try {
    const response = await axios.post(tokenUrl, 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;
    // console.log(accessToken)
    return accessToken;
    
  } catch (err) {
    console.error("Access Token 요청 에러:", err);
    throw new Error("Access Token을 가져오지 못했습니다.");
  }
};
