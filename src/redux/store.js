import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../components/Nav/userSlice";
import orderSlice from "../components/Tables/OrderTable/orderSlice";
import staffSlice from "../components/Tables/StaffTable/staffSlice";
import shoesSlice from "../components/Tables/ShoeTable/shoesSlice";
import accessorySlice from "../components/Tables/AccessoryTable/accessorySlice";
import saleSlice from "../components/Tables/SaleTable/saleSlice";
import customerSlice from "../components/Tables/CustomerTable/customerSlice";
import commentSlice from "../components/Tables/CommentTable/commentSlice";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    orders: orderSlice.reducer,
    staffs: staffSlice.reducer,
    customers: customerSlice.reducer,
    shoes: shoesSlice.reducer,
    accessories: accessorySlice.reducer,
    sales: saleSlice.reducer,
    comments: commentSlice.reducer,
  },
});

export default store;
