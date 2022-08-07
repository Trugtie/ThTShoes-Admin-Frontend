import Typography from "@mui/material/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchAccessoriesType } from "../../../pages/StatisticalManagement/statisticalSlice";
import { accessoriesTypeSelector } from "../../../redux/selectors";

function AccessoriesTable() {
  const dispatch = useDispatch();
  const data = useSelector(accessoriesTypeSelector);

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          {
            title: "Mã loại phụ kiện",
            field: "maloaipk",
            editable: "never",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Tên loại",
            field: "tenloai",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
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
                  sx={{ fontWeight: "bold", fontSize: "1.5rem !important" }}
                >
                  Danh sách loại phụ kiện
                </Typography>
              </div>
            </div>
          ),
        }}
        data={data.map((item) => {
          return {
            maloaipk: item.maLoaiPhuKien,
            tenloai: item.tenLoaiPhuKien,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                tenLoaiPhuKien: newData.tenloai,
              };
              const res = productApi.addAccessoryType(payload);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Thêm loại pk thành công !");
                  })
                  .catch(function (err) {
                    reject("Thêm loại pk thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                dispatch(fetchAccessoriesType());
              })
              .catch((error) => {
                toast.error(error);
              }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
}

export default AccessoriesTable;
