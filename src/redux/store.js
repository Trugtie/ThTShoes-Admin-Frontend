import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../components/Nav/userSlice";
import orderSlice from "../components/Tables/OrderTable/orderSlice";
import staffSlice from "../components/Tables/StaffTable/staffSlice";
import shoesSlice from "../components/Tables/ShoeTable/shoesSlice";
import accessorySlice from "../components/Tables/AccessoryTable/accessorySlice";
import saleSlice from "../components/Tables/SaleTable/saleSlice";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    orders: orderSlice.reducer,
    staffs: staffSlice.reducer,
    shoes:shoesSlice.reducer,
    accessories: accessorySlice.reducer,
    sales: saleSlice.reducer,
  },
});

export default store;
