import Typography from "@mui/material/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchColor } from "../../../pages/StatisticalManagement/statisticalSlice";
import { colorsSelector } from "../../../redux/selectors";

function ColorTable() {
  const dispatch = useDispatch();
  const data = useSelector(colorsSelector);
  

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          {
            title: "Mã màu",
            field: "mamau",
            editable: "never",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Tên màu",
            field: "tenmau",
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
                  Danh sách màu
                </Typography>
              </div>
            </div>
          ),
        }}
        data={data.map((item) => {
          return {
            mamau: item.mamau,
            tenmau: item.tenmau,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                mausacs: [newData.tenmau],
              };
              const res = productApi.addMau(payload);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Thêm màu thành công !");
                  })
                  .catch(function (err) {
                    reject("Thêm màu thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                dispatch(fetchColor());
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

export default ColorTable;
