import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../components/Nav/userSlice";
import orderSlice from "../components/Tables/OrderTable/orderSlice";

const store = configureStore({
  reducer: {
    user:userSlice.reducer,
    orders:orderSlice.reducer
  },
});

export default store;