import MaterialTable, { MTableToolbar } from "material-table";
import AccessoryModal from "../../Modal/AccessoryModal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accessoriesSelector } from "../../../redux/selectors";
import { fetchAccessory } from "./accessorySlice";
import productApi from "../../../api/productApi";
import toast from "react-hot-toast";
import ThumbGallery from "../../ThumbGallery";

export default function AccessoryTable() {
  const dispatch = useDispatch();
  const list = useSelector(accessoriesSelector);
  const [open, setOpen] = useState(false);
  const [accessory, setAccessory] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    data
      ? setAccessory(
          list.find((item) => {
            return item.mapk === data.id;
          })
        )
      : setAccessory("add");
    setOpen(true);
  };
  const handleDeletePK = (data) => {
    const result = productApi.deletePhuKien(data.id);
    result
      .then(function (response) {
        toast.success(`Đã xóa ${data.id}`);
        dispatch(fetchAccessory());
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
            listImg: item.hinhs,
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
          {
            icon: "add_circle",
            tooltip: "Thêm",
            iconProps: { color: "info", fontSize: "large" },
            isFreeAction: true,
            onClick: (event) => handleOpen(null),
          },
          {
            icon: "delete",
            tooltip: "Xóa phụ kiện",
            onClick: (event, rowData) => handleDeletePK(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [5, 10, 15],
        }}
        detailPanel={(rowData) => {
          return <ThumbGallery images={rowData.listImg} />;
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
      {accessory && (
        <AccessoryModal
          accessory={accessory}
          isOpen={open}
          isClose={handleClose}
        />
      )}
    </div>
  );
}
