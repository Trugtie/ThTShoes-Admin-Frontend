import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { commentsSelector } from "../../../redux/selectors";
import toast from "react-hot-toast";
import commentApi from "../../../api/commentApi";
import { fetchComments } from "./commentSlice";
import { useState } from "react";
import CommentModal from "../../Modal/CommentModal";

export default function CommentTable() {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const dispatch = useDispatch();
  const list = useSelector(commentsSelector);

  const handleDeleteComment = (data) => {
    const result = commentApi.deleteComment(data.blid);
    result
      .then(function (response) {
        toast.success(`Đã xóa ${data.blid}`);
        dispatch(fetchComments());
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
  };

  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    setComment(
      list.find((item) => {
        return item.mabl === data.blid;
      })
    );
    setOpen(true);
  };

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "blid" },
          { title: "Khách hàng", field: "hoten" },
          { title: "Bình luận", field: "mota" },
          { title: "Thời gian", field: "thoigian" },
          { title: "Tên sản phẩm", field: "tensp" },
        ]}
        data={list.map((item) => {
          const itemName =
            item.giay !== null ? item.giay.tengiay : item.phukien.tenpk;
          console.log(itemName);
          const dateCreate = new Date(item.thoigian);

          return {
            blid: item.mabl,
            hoten: item.khachhang.ho + " " + item.khachhang.ten,
            mota: item.mota,
            thoigian: `${dateCreate.getDate()}/${
              dateCreate.getMonth() + 1
            }/${dateCreate.getFullYear()} - ${dateCreate.getHours()}:${dateCreate.getMinutes()}:${dateCreate.getSeconds()}`,
            tensp: itemName,
          };
        })}
        components={{
          Toolbar: (props) => (
            <div className="table-header">
              <MTableToolbar {...props} />
              <div className="table-title">
                <Typography
                  variant="h4"
                  component="div"
                  style={{ color: "black" }}
                  sx={{ fontWeight: "bold" }}
                >
                  Danh sách bình luận
                </Typography>
              </div>
            </div>
          ),
        }}
        actions={[
          {
            icon: "info",
            tooltip: "Chi tiết",
            onClick: (event, rowData) => handleOpen(rowData),
            iconProps: { style: { color: "var(--button-green-color)" } },
          },
          {
            icon: "delete",
            tooltip: "Xóa bình luận",
            onClick: (event, rowData) => handleDeleteComment(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 15, 20],
        }}
      />
      {comment && (
        <CommentModal comment={comment} isOpen={open} isClose={handleClose} />
      )}
    </div>
  );
}
