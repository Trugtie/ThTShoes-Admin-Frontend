import Typography from "@mui/material/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchLabel } from "../../../pages/StatisticalManagement/statisticalSlice";
import { labelsSelector } from "../../../redux/selectors";

function LabelTable() {
  const dispatch = useDispatch();
  const data = useSelector(labelsSelector);
 

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          {
            title: "Mã hãng",
            field: "mahang",
            editable: "never",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Tên hãng",
            field: "tenhang",
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
                  Danh sách hãng
                </Typography>
              </div>
            </div>
          ),
        }}
        data={data.map((item) => {
          return {
            mahang: item.mahang,
            tenhang: item.tenhang,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                tenhang: newData.tenhang,
              };
              const res = productApi.addLabel(payload);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Thêm hãng thành công !");
                  })
                  .catch(function (err) {
                    reject("Thêm hãng thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                dispatch(fetchLabel());
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

export default LabelTable;
