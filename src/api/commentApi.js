import { API_URL, authAxios } from "./constants";

const commentApi = {
  getAll: async () => {
    const url = "/nhanvien/binhluan";
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  deleteComment: (payload) => {
    const url = `/nhanvien/binhluan/${payload}`;
    return authAxios.delete(`${API_URL}${url}`);
  },
};

export default commentApi;
