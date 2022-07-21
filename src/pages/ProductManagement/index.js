import ShoeTable from "../../components/Tables/ShoeTable";
import AccessoryTable from "../../components/Tables/AccessoryTable";
import { useDispatch } from "react-redux";
import { fetchShoes } from "../../components/Tables/ShoeTable/shoesSlice";
import { fetchAccessory } from "../../components/Tables/AccessoryTable/accessorySlice";
import LoadingSpinner from "../../components/LoadingSpiner";
import { useEffect, useState } from "react";

function ProductManageMent() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAccessory());
    dispatch(fetchShoes())
      .unwrap()
      .then((originalPromiseResult) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="StaffManagement-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ShoeTable />
          <div style={{ margin: "3rem 0rem" }}></div>
          <AccessoryTable />
        </>
      )}
    </div>
  );
}

export default ProductManageMent;
