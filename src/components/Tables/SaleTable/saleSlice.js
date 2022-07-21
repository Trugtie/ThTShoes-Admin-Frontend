import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saleApi from "../../../api/saleApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../../api/constants";

export default createSlice({
  name: "saleList",
  initialState: {
    status: STATUS_IDLE,
    saleList:
      sessionStorage.getItem("saleList") !== null
        ? JSON.parse(sessionStorage.getItem("saleList"))
        : [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSale.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchSale.fulfilled, (state, action) => {
        state.saleList = action.payload.khuyenMais;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem("saleList", JSON.stringify(state.saleList));
      })
      .addCase(fetchSale.rejected, (state, action) => {
        state.saleList = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(addSale.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.status = STATUS_FULFILLED;
      })
      .addCase(addSale.rejected, (state, action) => {
        state.status = STATUS_REJECTED;
      });
  },
});

export const fetchSale = createAsyncThunk("sale/fetchSale", async () =>
  saleApi.getAll()
);

export const addSale = createAsyncThunk(
  "sale/addSale",
  async (payload, thunkAPI) => {
    await saleApi.addSale(payload);
    thunkAPI.dispatch(fetchSale());
  }
);
