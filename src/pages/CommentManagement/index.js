import CommentTable from "../../components/Tables/CommentTable";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../components/Tables/CommentTable/commentSlice";
import LoadingSpinner from "../../components/LoadingSpiner";
import { useEffect, useState } from "react";

function CommentManagement() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchComments())
      .unwrap()
      .then((originalPromiseResult) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="StaffManagement-container">
      {isLoading ? <LoadingSpinner /> : <CommentTable />}
    </div>
  );
}

export default CommentManagement;
