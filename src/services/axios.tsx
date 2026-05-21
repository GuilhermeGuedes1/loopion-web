import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    "VITE_API_URL não está configurado. O axios está usando fallback para:",
    baseURL,
  );
}

export const api = axios.create({
  baseURL,
});
