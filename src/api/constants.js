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

  //const accessToken = localStorage.getItem("admin_access_token");

  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm1hbmd1b2lkdW5nIjoiTlY0IiwiaWF0IjoxNjU3Nzg5NjUyLCJleHAiOjE2NTkzOTQ0NTJ9.veueWzTp0u3rqJ7UlINbaJYDsJZFYiAynhXGz57P2zZOonPu_8cNu34jnhK3B5XqHC78DyVj6IrK6DmFE383cQ";

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
