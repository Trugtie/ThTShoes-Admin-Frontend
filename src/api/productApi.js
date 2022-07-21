import { API_URL, authAxios } from "./constants";
import axios from "axios";

const productApi = {
  getAllShoes: async () => {
    const url = "/nhanvien/giay";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getAllAccessory: async () => {
    const url = "/nhanvien/phukien";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
};

export default productApi;
