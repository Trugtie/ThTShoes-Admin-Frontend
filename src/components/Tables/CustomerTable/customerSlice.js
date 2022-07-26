import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerApi from "../../../api/customerApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../../api/constants";

export default createSlice({
  name: "customerList",
  initialState: {
    status: STATUS_IDLE,
    customerList:
      sessionStorage.getItem("customerList") !== null
        ? JSON.parse(sessionStorage.getItem("customerList"))
        : [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.customerList = action.payload.khachHangs;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem("customerList", JSON.stringify(state.customerList));
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.customerList = [];
        state.status = STATUS_REJECTED;
      })
  },
});

export const fetchCustomer = createAsyncThunk("customer/fetchCustomer", async () =>
  customerApi.getAll()
);
