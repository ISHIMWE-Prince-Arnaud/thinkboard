import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";

export const userApi = axios.create({
  baseURL: `${BASE_URL}/user`,
  withCredentials: true,
});

export const notesApi = axios.create({
  baseURL: `${BASE_URL}/notes`,
  withCredentials: true,
});

[userApi, notesApi].forEach((api) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken"); // optional: useful for extra checks
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});