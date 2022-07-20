import MaterialTable, { MTableToolbar } from "material-table";
import "./style.scss";
import StaffModal from "../../Modal/StaffModal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

export default function StaffTable() {
  const [open, setOpen] = useState(false);
  const [staffEdit, setStaff] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (staff) => {
    setStaff(staff);
    setOpen(true);
  };

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "nvid" },
          { title: "Họ tên", field: "tennv" },
          { title: "SĐT", field: "sdt", type: "numeric" },
          { title: "Email", field: "email" },
          { title: "Địa chỉ", field: "diachi" },
          { title: "Quyền", field: "quyen" },
          {
            title: "Trạng thái",
            field: "trangthai",
            lookup: { 0: "Available", 1: "Blocked" },
          },
        ]}
        data={[
          {
            khid: "kh1",
            hoten: "Baran",
            sodienthoai: 12345678910,
            email: "dasd@gmail.com",
            diachi: "asadasda",
            trangthai: "0",
          },
        ]}
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
      <StaffModal staff={staffEdit} isOpen={open} isClose={handleClose} />
    </div>
  );
}
