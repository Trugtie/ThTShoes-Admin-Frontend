import { API_URL, authAxios } from "./constants";
import axios from "axios";

const customerApi = {
  getAll: async () => {
    const url = "/nhanvien/khachhang";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getById: async (payload) => {
    const url = `/nhanvien/khachhang/${payload}`;
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
};

export default customerApi;
