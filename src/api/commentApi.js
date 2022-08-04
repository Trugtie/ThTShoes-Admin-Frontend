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
  getCommentById: async (payload) => {
    const url = `/nhanvien/binhluan/${payload}`;
    const { data } = await authAxios.get(`${API_URL}${url}`);
    return data;
  },
  replyComment: (payload) => {
    const url = `/nhanvien/binhluan`;
    return authAxios.post(`${API_URL}${url}`,payload);
  }
};

export default commentApi;
