import axios from "axios";
import type { User } from "../types/user";

export const BASE_URL = "http://localhost:8005/api";

const auth: User = JSON.parse(localStorage.getItem("credentials") ?? "{}");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  auth,
});

export default apiClient;
