import "./style.scss";
import CustomerTable from "../../components/Tables/CustomerTable";
import { useDispatch } from "react-redux";
import { fetchCustomer } from "../../components/Tables/CustomerTable/customerSlice";
import LoadingSpinner from "../../components/LoadingSpiner";
import { useEffect, useState } from "react";

function CustomerManagement() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchCustomer())
      .unwrap()
      .then((originalPromiseResult) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="CustomerManagement-container">
      {isLoading ? <LoadingSpinner /> : <CustomerTable />}
    </div>
  );
}

export default CustomerManagement;
