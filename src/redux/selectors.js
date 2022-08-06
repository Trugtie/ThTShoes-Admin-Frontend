export const ordersSelector = (state) => state.orders.orderList;
export const userSelector = (state) => state.user.current;
export const staffsSelector = (state) => state.staffs.staffList;
export const customersSelector = (state) => state.customers.customerList;
export const shoesSelector = (state) => state.shoes.shoesList;
export const accessoriesSelector = (state) => state.accessories.accessoryList;
export const salesSelector = (state) => state.sales.saleList;
export const commentsSelector = (state) => state.comments.commentList;
export const sizesSelector = (state) =>
  state.statisticals.statisticalList.sizes;
export const colorsSelector = (state) =>
  state.statisticals.statisticalList.colors;
export const shoesTypeSelector = (state) =>
  state.statisticals.statisticalList.shoesType;
export const accessoriesTypeSelector = (state) =>
  state.statisticals.statisticalList.accessoriesType;
export const labelsSelector = (state) =>
  state.statisticals.statisticalList.labels;
export const categoriesSelector = (state) =>
  state.statisticals.statisticalList.categories;
export const allSumSelector = (state) =>
  state.statisticals.statisticalList.allSum;
