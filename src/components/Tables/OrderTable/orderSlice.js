import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "../../../api/orderApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../../api/constants";

export default createSlice({
  name: "orderList",
  initialState: {
    status: STATUS_IDLE,
    orderList:
      sessionStorage.getItem("orderList") !== null
        ? JSON.parse(sessionStorage.getItem("orderList"))
        : [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderList = action.payload.donHangs;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem("orderList", JSON.stringify(state.orderList));
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderList = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(duyetDonHang.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(duyetDonHang.fulfilled, (state, action) => {
        // state.orderList[index].tinhtrang = "DADUYET";
        state.status = STATUS_FULFILLED;
        // sessionStorage.setItem("orderList", JSON.stringify(state.orderList));
      })
      .addCase(duyetDonHang.rejected, (state, action) => {
        state.status = STATUS_REJECTED;
      });
  },
});

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () =>
  orderApi.getAll()
);

export const duyetDonHang = createAsyncThunk(
  "order/duyetDonHang",
  async (params,thunkAPI) => {
    await orderApi.duyetDon(params);
    thunkAPI.dispatch(fetchOrders());
  }
);
