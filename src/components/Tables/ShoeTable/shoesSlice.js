import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../../api/productApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../../api/constants";

export default createSlice({
  name: "shoesList",
  initialState: {
    status: STATUS_IDLE,
    shoesList:
      sessionStorage.getItem("shoesList") !== null
        ? JSON.parse(sessionStorage.getItem("shoesList"))
        : [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoes.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchShoes.fulfilled, (state, action) => {
        state.shoesList = action.payload.giays;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem("shoesList", JSON.stringify(state.shoesList));
      })
      .addCase(fetchShoes.rejected, (state, action) => {
        state.shoesList = [];
        state.status = STATUS_REJECTED;
      });
  },
});

export const fetchShoes = createAsyncThunk("shoes/fetchShoes", async () =>
  productApi.getAllShoes()
);
