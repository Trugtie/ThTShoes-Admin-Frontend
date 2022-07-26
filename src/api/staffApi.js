import { API_URL, authAxios } from "./constants";
import axios from "axios";

const staffApi = {
  getAll: async () => {
    const url = "/nhanvien";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  getById: async (payload) => {
    const url = `/nhanvien/getbyid/${payload}`;
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  addStaff: (payload) => {
    const url = `/nhanvien/themnhanvien`;
    return authAxios.post(`${API_URL}${url}`, payload);
  },
  lockStaff: (payload) => {
    const url = `/nhanvien/lock/${payload}`;
    return authAxios.put(`${API_URL}${url}`);
  },
  unlockStaff: (payload) => {
    const url = `/nhanvien/unlock/${payload}`;
    return authAxios.put(`${API_URL}${url}`);
  },
};

export default staffApi;
