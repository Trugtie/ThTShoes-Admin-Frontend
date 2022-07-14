import { API_URL, authAxios } from "./constants";
import axios from "axios";

const orderApi = {
    getAll: async () => {
        const url = '/nhanvien/donhang';
        const {data} = await authAxios.get(`${API_URL}${url}`);
        return data;
    },
    duyetDon: (payload)=>{
        const url = '/nhanvien/donhang/tinhtrang';
        return authAxios.put(`${API_URL}${url}`, payload);
    }
  }
  
  export default orderApi;