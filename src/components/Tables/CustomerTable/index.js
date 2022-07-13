import MaterialTable, { MTableToolbar } from "material-table";
import { useState } from "react";
import CustomerModal from "../../Modal/CustomerModal";
import Typography from "@mui/material/Typography";

export default function CustomerTable() {
  const [openAdd, setOpenAdd] = useState(false);
  const [cusEdit, setCustomer] = useState(null);
  const handleClose = () => {
    setOpenAdd(false);
  };
  const handleOpen = (cus) => {
    setCustomer(cus);
    setOpenAdd(true);
  };

  return (
    <div>
      <MaterialTable
        columns={[
          { title: "ID", field: "khid" },
          { title: "Họ tên", field: "hoten" },
          { title: "SĐT", field: "sodienthoai", type: "numeric" },
          { title: "Email", field: "email" },
          { title: "Địa chỉ", field: "diachi" },
          {
            title: "Trạng thái",
            field: "trangthai",
            lookup: { 0: "Available", 1: "Blocked" },
          },
        ]}
        data={[
          { khid: "kh1", hoten: "Baran", sodienthoai: 12345678910, email: "dasd@gmail.com",diachi:'asadasda',trangthai:'0' }
        ]}
        components={{
          Toolbar: (props) => (
            <div className="table-header">
              <MTableToolbar {...props} />
              <div>
                <Typography
                  variant="h4"
                  gutterBottom
                  component="div"
                  style={{ color: "#CF9269" }}
                  sx={{ fontWeight: "bold" }}
                >
                  Danh sách khách hàng
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
      <CustomerModal cus={cusEdit} isOpen={openAdd} isClose={handleClose} />
    </div>
  );
}
