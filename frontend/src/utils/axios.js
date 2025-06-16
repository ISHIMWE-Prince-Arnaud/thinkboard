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

export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}