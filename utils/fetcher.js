import axios from "axios";

export const fetcher = (url) => {
  try {
    return axios.get(`${process.env.VITE_API_URL}/${url}`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.VITE_API_KEY,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
