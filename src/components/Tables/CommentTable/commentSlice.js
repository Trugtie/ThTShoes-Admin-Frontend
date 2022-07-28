import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "../../../api/commentApi";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_FULFILLED,
} from "../../../api/constants";

export default createSlice({
  name: "commentList",
  initialState: {
    status: STATUS_IDLE,
    commentList:
      sessionStorage.getItem("commentList") !== null
        ? JSON.parse(sessionStorage.getItem("commentList"))
        : [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = STATUS_PENDING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentList = action.payload.binhluans;
        state.status = STATUS_FULFILLED;
        sessionStorage.setItem("commentList", JSON.stringify(state.commentList));
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentList = [];
        state.status = STATUS_REJECTED;
      });
  },
});

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async () => commentApi.getAll()
);
