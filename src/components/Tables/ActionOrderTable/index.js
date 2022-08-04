import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@mui/material/Typography";

export default function ActionsOrderTable({ actions }) {
  console.log(actions);
  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "id" },
          { title: "Mã nhân viên", field: "manv" },
          {
            title: "Hành động",
            field: "hanhDong",
            lookup: { DUYET: "Duyệt", GIAO: "Giao", HUY: "Hủy" },
          },
        ]}
        data={actions}
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
                  Thông tin duyệt đơn
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
