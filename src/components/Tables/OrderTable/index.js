import MaterialTable, { MTableToolbar } from "material-table";
import OrderModal from "../../Modal/OrderModal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ordersSelector } from "../../../redux/selectors";

export default function OrderTable() {
  const list = useSelector(ordersSelector);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    setOrder(
      list.find((item) => {
        return item.madon === data.madon;
      })
    );
    setOpen(true);
  };

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "madon" },
          { title: "Ngày tạo", field: "ngaytao", defaultSort: "desc" },
          { title: "Người nhận", field: "nguoinhan" },
          { title: "SĐT", field: "sdt" },
          { title: "Địa chỉ", field: "diachi" },
          { title: "Tổng tiền", field: "tonggia" },
          {
            title: "Tình trạng",
            field: "tinhtrang",
            lookup: {
              DAGIAO: "Đã giao",
              CHODUYET: "Chờ duyệt",
              DADUYET: "Đã duyệt",
              TUCHOI: "Từ chối",
              HUY: "Đã hủy",
            },
          },
        ]}
        data={list.map((item) => {
          const dateCreate = new Date(item.ngaytao);
          return {
            madon: item.madon,
            ngaytao: `${dateCreate.getDate()}/${
              dateCreate.getMonth() + 1
            }/${dateCreate.getFullYear()} - ${dateCreate.getHours()}:${dateCreate.getMinutes()}:${dateCreate.getSeconds()}`,
            nguoinhan: item.nguoinhan,
            sdt:
              item.khachvanglai === null
                ? item.khachHang.sdt
                : item.khachvanglai.sdt,
            tonggia: item.tonggia.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }),
            diachi:
              item.khachvanglai === null
                ? item.khachHang.diachi
                : item.khachvanglai.diachi,
            tinhtrang: item.tinhtrang,
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
                  Danh sách đơn hàng
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
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 15, 20],
        }}
      />
      {order && (
        <OrderModal order={order} isOpen={open} isClose={handleClose} />
      )}
    </div>
  );
}
