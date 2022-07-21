import OrderTable from "../../components/Tables/OrderTable";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../components/Tables/OrderTable/orderSlice";
import LoadingSpinner from "../../components/LoadingSpiner";
import { useEffect, useState } from "react";

function OrderManageMent() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .then((originalPromiseResult) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="StaffManagement-container">
      {isLoading ? <LoadingSpinner /> : <OrderTable />}
    </div>
  );
}

export default OrderManageMent;
