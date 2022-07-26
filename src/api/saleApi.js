import { API_URL, authAxios } from "./constants";
import axios from "axios";

const saleApi = {
  getAll: async () => {
    const url = "/nhanvien/khuyenmai";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getById: async (payload) => {
    const url = `/nhanvien/khuyenmai/getbyid/${payload}`;
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  addSale: (payload) => {
    const url = `/nhanvien/khuyenmai`;
    return authAxios.post(`${API_URL}${url}`, payload);
  },
  addImage: (payload) => {
    const url = `/nhanvien/hinh/khuyenmai/${payload.makm}`;
    const token = localStorage.getItem("admin_access_token");
    return axios({
      method: "post",
      url: `${API_URL}${url}`,
      data: payload.data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default saleApi;
