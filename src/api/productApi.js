import { API_URL, authAxios } from "./constants";
import axios from "axios";

const productApi = {
  getAllShoes: async () => {
    const url = "/nhanvien/giay";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getAllLoaiGiay: async () => {
    const url = "/nhanvien/loaigiay";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getAllLoaiPK: async () => {
    const url = "/nhanvien/loaiphukien";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getAllHang: async () => {
    const url = "/nhanvien/hang";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getAllDanhMuc: async () => {
    const url = "/nhanvien/danhmuc";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getAllSize: async () => {
    const url = "/nhanvien/size";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getAllMau: async () => {
    const url = "/nhanvien/mausac";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  addShoe: (payload) => {
    const url = `/nhanvien/giay`;
    return authAxios.post(`${API_URL}${url}`, payload);
  },
  deleteShoe: (payload) => {
    const url = `/nhanvien/giay/${payload}`;
    return authAxios.delete(`${API_URL}${url}`);
  },
  addPhuKien: (payload) => {
    const url = `/nhanvien/phukien`;
    return authAxios.post(`${API_URL}${url}`, payload);
  },
  deletePhuKien: (payload) => {
    const url = `/nhanvien/phukien/${payload}`;
    return authAxios.delete(`${API_URL}${url}`);
  },
  addImage: (payload) => {
    const url = `/nhanvien/hinh`;
    const token = localStorage.getItem("admin_access_token");
    return axios({
      method: "post",
      url: `${API_URL}${url}`,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getShoeById: async (payload) => {
    const url = `/nhanvien/giay/${payload}`;
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
