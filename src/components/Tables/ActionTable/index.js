import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@mui/material/Typography";

export default function ActionsTable({ actions }) {
  console.log("actions", actions);
  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "id" },
          { title: "Màu", field: "tenmau" },
          { title: "Size", field: "tensize" },
          { title: "Mô tả", field: "mota" },
          { title: "Ngày thêm", field: "ngaythem" },
          { title: "Số lượng", field: "soluong" },
        ]}
        data={actions.map((item) => {
          const description = item.mota ? item.mota : "Không có mô tả";
          const dateCreate = new Date(item.ngaythem);
          return {
            id: item.id,
            tenmau: item.mau.tenmau ? item.mau.tenmau : "Không có",
            tensize: item.size.tensize ? item.size.tensize : "Không có",
            mota: description,
            ngaythem: `${dateCreate.getDate()}/${
              dateCreate.getMonth() + 1
            }/${dateCreate.getFullYear()} - ${dateCreate.getHours()}:${dateCreate.getMinutes()}:${dateCreate.getSeconds()}`,
            soluong: item.soluong,
          };
        })}
        components={{
          Toolbar: (props) => (
            <div className="table-header">
              <MTableToolbar {...props} />
              <div className="table-title">
                <Typography
                  variant="h5"
                  component="div"
                  style={{ color: "black" }}
                  sx={{ fontWeight: "bold" }}
                >
                  Thông tin nhập hàng
                </Typography>
              </div>
            </div>
          ),
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [5, 10, 15],
        }}
      />
    </div>
  );
}
