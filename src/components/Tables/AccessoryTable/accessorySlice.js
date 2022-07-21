import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../../api/productApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../../api/constants";

export default createSlice({
  name: "accessoryList",
  initialState: {
    status: STATUS_IDLE,
    accessoryList:
      sessionStorage.getItem("accessoryList") !== null
        ? JSON.parse(sessionStorage.getItem("accessoryList"))
        : [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessory.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchAccessory.fulfilled, (state, action) => {
        state.accessoryList = action.payload.phuKiens;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem("accessoryList", JSON.stringify(state.accessoryList));
      })
      .addCase(fetchAccessory.rejected, (state, action) => {
        state.accessoryList = [];
        state.status = STATUS_REJECTED;
      });
  },
});

export const fetchAccessory = createAsyncThunk("accessory/fetchAccessory", async () =>
  productApi.getAllAccessory()
);
