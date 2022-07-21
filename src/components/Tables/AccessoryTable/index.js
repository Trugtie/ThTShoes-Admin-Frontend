import MaterialTable, { MTableToolbar } from "material-table";
import OrderModal from "../../Modal/OrderModal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { accessoriesSelector } from "../../../redux/selectors";

export default function AccessoryTable() {
  const list = useSelector(accessoriesSelector);
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
          {
            title: "ID",
            field: "id",
            cellStyle: {
              maxWidth: "10px",
            },
          },
          {
            title: "Hình",
            field: "hinh",
            render: (rowData) => (
              <img
                src={rowData.hinh}
                style={{ width: "100px", height: "100px" }}
              />
            ),
            cellStyle: {
              padding: ".5rem 0rem",
            },
          },
          { title: "Tên PK", field: "tenpk" },
          {
            title: "Mô tả",
            field: "mota",
            cellStyle: {
              maxWidth: "250px",
            },
          },
          { title: "Số lượng", field: "soluong" },
          { title: "Giá", field: "gia" },
          { title: "Loại PK", field: "loaipk" },
        ]}
        data={list.map((item) => {
          return {
            id: item.mapk,
            hinh: item.urlanh,
            tenpk: item.tenpk,
            mota: item.mota.slice(0, 100) + "...",
            soluong: item.soluong,
            gia: item.gia.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }),
            loaipk: item.loaiPhuKien.tenLoaiPhuKien,
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
                  Danh sách phụ kiện
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
          pageSize: 5,
          pageSizeOptions: [5, 10, 15],
        }}
      />
      {order && (
        <OrderModal order={order} isOpen={open} isClose={handleClose} />
      )}
    </div>
  );
}
