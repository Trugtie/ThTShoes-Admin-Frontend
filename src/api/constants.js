import axios from "axios";

export const API_URL = "http://localhost:8080";

export const authAxios = axios.create({
  baseUrl: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

authAxios.interceptors.request.use(async (config) => {
  const customHeaders = {};

  const accessToken = localStorage.getItem("admin_access_token");

  if (accessToken) {
    customHeaders.Authorization = "Bearer " + accessToken;
  }

  return {
    ...config,
    headers: {
      ...customHeaders,
      ...config.headers,
    },
  };
});

export const STATUS_IDLE = "idle";
export const STATUS_PENDING = "loading";
export const STATUS_FULFILLED = "success";
export const STATUS_REJECTED = "error";
