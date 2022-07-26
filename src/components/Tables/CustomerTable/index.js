import MaterialTable, { MTableToolbar } from "material-table";
import { useState } from "react";
import CustomerModal from "../../Modal/CustomerModal";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { customersSelector } from "../../../redux/selectors";

export default function CustomerTable() {
  const list = useSelector(customersSelector);
  console.log(list);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    data
      ? setCustomer(
          list.find((item) => {
            return item.makh === data.khid;
          })
        )
      : setCustomer("add");
    setOpen(true);
  };

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "khid" },
          { title: "Họ tên", field: "tenkh" },
          { title: "SĐT", field: "sdt" },
          { title: "Email", field: "email" },
          { title: "Địa chỉ", field: "diachi" },
          {
            title: "Quyền",
            field: "quyen",
            lookup: { KHACHHANG: "Khách hàng" },
          },
          {
            title: "Trạng thái",
            field: "trangthai",
            lookup: { 1: "Hoạt động", 0: "Bị khóa" },
          },
        ]}
        data={list.map((item) => {
          return {
            khid: item.makh,
            tenkh: item.ho + " " + item.ten,
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
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 15, 20],
        }}
      />
      {customer && (
        <CustomerModal
          customer={customer}
          isOpen={open}
          isClose={handleClose}
        />
      )}
    </div>
  );
}
