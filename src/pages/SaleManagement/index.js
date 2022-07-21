import SaleTable from "../../components/Tables/SaleTable";
import { useDispatch } from "react-redux";
import { fetchSale } from "../../components/Tables/SaleTable/saleSlice";
import LoadingSpinner from "../../components/LoadingSpiner";
import { useEffect, useState } from "react";

function SaleManagement() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSale())
      .unwrap()
      .then((originalPromiseResult) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="StaffManagement-container">
      {isLoading ? <LoadingSpinner /> : <SaleTable />}
    </div>
  );
}

export default SaleManagement;
