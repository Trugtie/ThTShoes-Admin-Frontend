import MaterialTable, { MTableToolbar } from "material-table";
import "./style.scss";
import StaffModal from "../../Modal/StaffModal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { staffsSelector } from "../../../redux/selectors";

export default function StaffTable() {
  const list = useSelector(staffsSelector);
  console.log(list);
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    data
      ? setStaff(
          list.find((item) => {
            return item.manv === data.nvid;
          })
        )
      : setStaff("add");
    setOpen(true);
  };

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "nvid" },
          { title: "Họ tên", field: "tennv" },
          { title: "SĐT", field: "sdt" },
          { title: "Email", field: "email" },
          { title: "Địa chỉ", field: "diachi" },
          {
            title: "Quyền",
            field: "quyen",
            lookup: { NHANVIEN: "Nhân viên", ADMIN: "Admin" },
          },
          {
            title: "Trạng thái",
            field: "trangthai",
            lookup: { 1: "Hoạt động", 0: "Bị khóa" },
          },
        ]}
        data={list.map((item) => {
          return {
            nvid: item.manv,
            tennv: item.ho + " " + item.ten,
            sdt: item.sdt,
            email: item.taiKhoan.email,
            diachi: item.diachi,
            quyen: item.taiKhoan.quyen,
            trangthai: item.taiKhoan.tinhtrang,
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
                  Danh sách nhân viên
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
          pageSize: 10,
          pageSizeOptions: [10, 15, 20],
        }}
      />
      {staff && (
        <StaffModal staff={staff} isOpen={open} isClose={handleClose} />
      )}
    </div>
  );
}
