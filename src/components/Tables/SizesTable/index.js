import Typography from "@mui/material/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchSize } from "../../../pages/StatisticalManagement/statisticalSlice";
import { sizesSelector } from "../../../redux/selectors";

function SizesTable() {
  const dispatch = useDispatch();
  const data = useSelector(sizesSelector);
  

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          {
            title: "Mã size",
            field: "masize",
            editable: "never",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Tên size",
            field: "tensize",
            type: "numeric",
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
                  Danh sách size
                </Typography>
              </div>
            </div>
          ),
        }}
        data={data.map((item) => {
          return {
            masize: item.masize,
            tensize: item.tensize,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                listSize: [newData.tensize],
              };
              const res = productApi.addSize(payload);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Thêm size thành công !");
                  })
                  .catch(function (err) {
                    reject("Thêm size thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                dispatch(fetchSize());
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

export default SizesTable;
