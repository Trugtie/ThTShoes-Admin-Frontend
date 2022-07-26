import MaterialTable, { MTableToolbar } from "material-table";
import ShoeModal from "../../Modal/ShoeModal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { shoesSelector } from "../../../redux/selectors";

export default function ShoeTable() {
  const list = useSelector(shoesSelector);
  const [open, setOpen] = useState(false);
  const [shoe, setShoe] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    data
      ? setShoe(
          list.find((item) => {
            return item.magiay === data.id;
          })
        )
      : setShoe("add");
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
          { title: "Tên giày", field: "tengiay" },
          {
            title: "Mô tả",
            field: "mota",
            cellStyle: {
              maxWidth: "250px",
            },
          },
          { title: "Giá", field: "gia" },
          { title: "Ngày thêm", field: "ngaythem" },
        ]}
        data={list.map((item) => {
          const dateCreate = new Date(item.ngaythem);
          return {
            id: item.magiay,
            hinh: item.urlanh,
            tengiay: item.tengiay,
            mota: item.mota.slice(0, 100) + "...",
            gia: item.gia.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }),
            ngaythem: `${dateCreate.getDate()}/${
              dateCreate.getMonth() + 1
            }/${dateCreate.getFullYear()} - ${dateCreate.getHours()}:${dateCreate.getMinutes()}:${dateCreate.getSeconds()}`,
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
                  Danh sách giày
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
            icon: "add_circle",
            tooltip: "Thêm",
            iconProps: { color: "info", fontSize: "large" },
            isFreeAction: true,
            onClick: (event) => handleOpen(null),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [5, 10, 15],
        }}
      />
      {shoe && <ShoeModal shoe={shoe} isOpen={open} isClose={handleClose} />}
    </div>
  );
}
