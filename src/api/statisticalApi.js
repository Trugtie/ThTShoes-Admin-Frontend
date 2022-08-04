import { API_URL, authAxios } from "./constants";

const statisticalApi = {
  getOrderByDate: async (payload) => {
    const url = `/nhanvien/thongke/donhang`;
    const { data } = await authAxios.get(`${API_URL}${url}`, payload);
    return data;
  },
  getShoesByDate: async (payload) => {
    const url = `/nhanvien/thongke/giay`;
    const { data } = await authAxios.get(`${API_URL}${url}`, payload);
    return data;
  },
  getAccessoryByDate: async (payload) => {
    const url = `/nhanvien/thongke/phukien`;
    const { data } = await authAxios.get(`${API_URL}${url}`, payload);
    return data;
  },
  getTurnoverByDate: async (payload) => {
    const url = `/nhanvien/thongke/doanhthu`;
    const { data } = await authAxios.get(`${API_URL}${url}`, payload);
    return data;
  },
};

export default statisticalApi;
