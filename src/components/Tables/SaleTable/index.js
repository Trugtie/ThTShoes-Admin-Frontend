import MaterialTable, { MTableToolbar } from "material-table";
import SaleModal from "../../Modal/SaleModal";
import Typography from "@mui/material/Typography";
import { fetchSale } from "./saleSlice";
import React, { useState } from "react";
import saleApi from "../../../api/saleApi";
import { useSelector, useDispatch } from "react-redux";
import { salesSelector } from "../../../redux/selectors";
import toast from "react-hot-toast";

export default function SaleTable() {
  const dispatch = useDispatch();
  const list = useSelector(salesSelector);
  const [open, setOpen] = useState(false);
  const [sale, setSale] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    data
      ? setSale(
          list.find((item) => {
            return item.makm === data.id;
          })
        )
      : setSale("add");
    setOpen(true);
  };

  const handleDeleteSale = (data) => {
    const result = saleApi.deleteSale(data.id);
    result
      .then(function (response) {
        toast.success(`Đã xóa ${data.id}`);
        dispatch(fetchSale());
      })
      .catch(function (error) {
        toast.error(error.response.data);
      });
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
          { title: "Tiêu đề", field: "tieude" },
          {
            title: "Mô tả",
            field: "mota",
            cellStyle: {
              maxWidth: "250px",
            },
          },
          { title: "Giá trị giảm", field: "giatrigiam" },
          { title: "Số lượng", field: "soluong" },
          { title: "Ngày bắt đầu", field: "ngaybd" },
          { title: "Ngày kết thúc", field: "ngaykt" },
        ]}
        data={list.map((item) => {
          const dateStart = new Date(item.ngaybd);
          const dateEnd = new Date(item.ngaykt);
          return {
            id: item.makm,
            hinh: item.urlanh,
            tieude: item.tieude,
            mota: item.mota.slice(0, 100) + "...",
            giatrigiam: item.giatrigiam + "%",
            soluong: item.soluong,
            ngaybd: `${dateStart.getDate()}/${
              dateStart.getMonth() + 1
            }/${dateStart.getFullYear()} - ${dateStart.getHours()}:${dateStart.getMinutes()}:${dateStart.getSeconds()}`,
            ngaykt: `${dateEnd.getDate()}/${
              dateEnd.getMonth() + 1
            }/${dateEnd.getFullYear()} - ${dateEnd.getHours()}:${dateEnd.getMinutes()}:${dateEnd.getSeconds()}`,
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
                  Danh sách khuyến mãi
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
          {
            icon: "delete",
            tooltip: "Xóa giày",
            onClick: (event, rowData) => handleDeleteSale(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [5, 10, 15],
        }}
      />
      {sale && <SaleModal sale={sale} isOpen={open} isClose={handleClose} />}
    </div>
  );
}
