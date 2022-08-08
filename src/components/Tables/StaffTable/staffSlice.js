import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import staffApi from "../../../api/staffApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../../api/constants";

export default createSlice({
  name: "staffList",
  initialState: {
    status: STATUS_IDLE,
    staffList:
      sessionStorage.getItem("staffList") !== null
        ? JSON.parse(sessionStorage.getItem("staffList"))
        : [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.staffList = action.payload.nhanviens;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem("staffList", JSON.stringify(state.staffList));
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.staffList = [];
        state.status = STATUS_REJECTED;
      })
      .addCase(addStaff.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.status = STATUS_FULFILLED;
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.status = STATUS_REJECTED;
      });
  },
});

export const fetchStaff = createAsyncThunk("staff/fetchStaff", async () =>
  staffApi.getAll()
);

export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async (payload, thunkAPI) => {
    try {
      const res = await staffApi.addStaff(payload);
      thunkAPI.dispatch(fetchStaff());
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
