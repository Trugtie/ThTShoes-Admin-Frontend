import Typography from "@mui/material/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import { fetchCategories } from "../../../pages/StatisticalManagement/statisticalSlice";
import { categoriesSelector } from "../../../redux/selectors";

function CategoriesTable() {
  const dispatch = useDispatch();
  const data = useSelector(categoriesSelector);

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          {
            title: "Mã danh mục",
            field: "madm",
            editable: "never",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Tên danh mục",
            field: "tendm",
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
                  Danh sách danh mục
                </Typography>
              </div>
            </div>
          ),
        }}
        data={data.map((item) => {
          return {
            madm: item.madm,
            tendm: item.tendanhmuc,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                tendanhmuc: newData.tendm,
              };
              const res = productApi.addCate(payload);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Thêm danh mục thành công !");
                  })
                  .catch(function (err) {
                    reject("Thêm danh mục thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                dispatch(fetchCategories());
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

export default CategoriesTable;
