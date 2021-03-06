import "./style.scss";
import StaffTable from "../../components/Tables/StaffTable";
import { useDispatch } from "react-redux";
import { fetchStaff } from "../../components/Tables/StaffTable/staffSlice";
import LoadingSpinner from "../../components/LoadingSpiner";
import { useEffect, useState } from "react";

function StaffManagement() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchStaff())
      .unwrap()
      .then((originalPromiseResult) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="StaffManagement-container">
      {isLoading ? <LoadingSpinner /> : <StaffTable />}
    </div>
  );
}

export default StaffManagement;
