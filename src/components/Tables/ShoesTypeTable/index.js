import Typography from "@mui/material/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchShoesType } from "../../../pages/StatisticalManagement/statisticalSlice";
import { shoesTypeSelector } from "../../../redux/selectors";

function ShoesTypeTable() {
  const dispatch = useDispatch();
  const data = useSelector(shoesTypeSelector);
 

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          {
            title: "Mã loại giày",
            field: "maloaigiay",
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
                  Danh sách loại giày
                </Typography>
              </div>
            </div>
          ),
        }}
        data={data.map((item) => {
          return {
            maloaigiay: item.maloaigiay,
            tenloai: item.tenloai,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                tenloai: newData.tenloai,
              };
              const res = productApi.addShoesType(payload);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Thêm loại giày thành công !");
                  })
                  .catch(function (err) {
                    reject("Thêm loại giày thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                dispatch(fetchShoesType());
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

export default ShoesTypeTable;
