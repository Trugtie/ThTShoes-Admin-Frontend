import { API_URL, authAxios } from "./constants";
import axios from "axios";

const userApi = {
  login: (payload) => {
    const url = "/login";
    return axios.post(`${API_URL}${url}`, null, {
      params: {
        username: payload.username,
        password: payload.password,
      },
    });
  },
  getMe: async () => {
    const url = `/nhanvien/info`;
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },

};

export default userApi;
