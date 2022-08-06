import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";
import statisticalApi from "../../api/statisticalApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../api/constants";

export default createSlice({
  name: "statisticalList",
  initialState: {
    status: STATUS_IDLE,
    statisticalList:
      sessionStorage.getItem("statisticalList") !== null
        ? JSON.parse(sessionStorage.getItem("statisticalList"))
        : {
            sizes: [],
            colors: [],
            shoesType: [],
            accessoriesType: [],
            labels: [],
            categories: [],
            allSum: {},
          },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSize.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchSize.fulfilled, (state, action) => {
        state.statisticalList.sizes = action.payload.sizes;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem(
          "statisticalList",
          JSON.stringify(state.statisticalList)
        );
      })
      .addCase(fetchSize.rejected, (state, action) => {
        state.statisticalList.sizes = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(fetchColor.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchColor.fulfilled, (state, action) => {
        state.statisticalList.colors = action.payload.mausacs;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem(
          "statisticalList",
          JSON.stringify(state.statisticalList)
        );
      })
      .addCase(fetchColor.rejected, (state, action) => {
        state.statisticalList.colors = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(fetchShoesType.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchShoesType.fulfilled, (state, action) => {
        state.statisticalList.shoesType = action.payload.loaiGiays;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem(
          "statisticalList",
          JSON.stringify(state.statisticalList)
        );
      })
      .addCase(fetchShoesType.rejected, (state, action) => {
        state.statisticalList.shoesType = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(fetchAccessoriesType.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchAccessoriesType.fulfilled, (state, action) => {
        state.statisticalList.accessoriesType = action.payload.loaiphukiens;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem(
          "statisticalList",
          JSON.stringify(state.statisticalList)
        );
      })
      .addCase(fetchAccessoriesType.rejected, (state, action) => {
        state.statisticalList.accessoriesType = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.statisticalList.categories = action.payload.danhmucs;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem(
          "statisticalList",
          JSON.stringify(state.statisticalList)
        );
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.statisticalList.categories = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(fetchLabel.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchLabel.fulfilled, (state, action) => {
        state.statisticalList.labels = action.payload.hangs;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem(
          "statisticalList",
          JSON.stringify(state.statisticalList)
        );
      })
      .addCase(fetchLabel.rejected, (state, action) => {
        state.statisticalList.labels = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(fetchAllSum.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchAllSum.fulfilled, (state, action) => {
        state.statisticalList.allSum = action.payload;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem(
          "statisticalList",
          JSON.stringify(state.statisticalList)
        );
      })
      .addCase(fetchAllSum.rejected, (state, action) => {
        state.statisticalList.allSum = {};
        state.status = STATUS_REJECTED;
      });
  },
});

export const fetchSize = createAsyncThunk("statistical/fetchSize", async () =>
  productApi.getAllSize()
);

export const fetchColor = createAsyncThunk("statistical/fetchColor", async () =>
  productApi.getAllMau()
);

export const fetchShoesType = createAsyncThunk(
  "statistical/fetchShoesType",
  async () => productApi.getAllLoaiGiay()
);

export const fetchAccessoriesType = createAsyncThunk(
  "statistical/fetchAccessoriesType",
  async () => productApi.getAllLoaiPK()
);

export const fetchCategories = createAsyncThunk(
  "statistical/fetchCategories",
  async () => productApi.getAllDanhMuc()
);

export const fetchLabel = createAsyncThunk("statistical/fetchLabel", async () =>
  productApi.getAllHang()
);

export const fetchAllSum = createAsyncThunk(
  "statistical/fetchAllSum",
  async () => statisticalApi.getAllSum()
);
