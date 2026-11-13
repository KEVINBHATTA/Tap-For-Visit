import axios from "axios";

const api = axios.create({
   baseURL: `${import.meta.env.VITE_API_URL}/api`, // e.g. https://tap-for-visit.onrender.com/api
});

// attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tfv_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;