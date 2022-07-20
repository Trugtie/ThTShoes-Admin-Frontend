import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../api/constants";

export default createSlice({
  name: "user",
  initialState: {
    status: STATUS_IDLE,
    current:
      localStorage.getItem("userAdmin") !== null
        ? JSON.parse(localStorage.getItem("userAdmin"))
        : {},
  },
  reducers: {
    logout: (state, action) => {
      state.status = STATUS_IDLE;
      state.current = {};
      localStorage.removeItem("userAdmin");
      localStorage.removeItem("admin_access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.current = {};
        state.status = STATUS_FULFILLED;
      })
      .addCase(login.rejected, (state, action) => {
        state.current = {};
        state.status = STATUS_REJECTED;
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.current = action.payload;
        localStorage.setItem("userAdmin", JSON.stringify(action.payload));
        state.status = STATUS_FULFILLED;
      })
      .addCase(getMyInfo.rejected, (state, action) => {
        state.current = {};
        state.status = STATUS_REJECTED;
      });
  },
});

export const login = createAsyncThunk("user/login", async (params) => {
  const { data } = await userApi.login(params);
  const token = data.slice(7);
  localStorage.setItem("admin_access_token", token);
});

export const getMyInfo = createAsyncThunk("user/getInfo", async () =>
  userApi.getMe()
);
