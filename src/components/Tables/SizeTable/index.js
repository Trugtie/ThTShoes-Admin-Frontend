import Typography from "@mui/material/Typography";
import MaterialTable, { MTableToolbar } from "material-table";
import { memo, useState } from "react";
import toast from "react-hot-toast";
import productApi from "../../../api/productApi";
import "./styles.scss";

function SizeTable({ dataList, colorList, sizeList, id, reset }) {
  const dataCopy = [...dataList];
  const colorObj = colorList.reduce(
    (obj, item) => ({ ...obj, [item.mamau]: item.tenmau }),
    {}
  );
  const sizeObj = sizeList.reduce(
    (obj, item) => ({ ...obj, [item.masize]: item.tensize }),
    {}
  );

  const [data, setData] = useState(dataCopy);

  return (
    <div className="table-mui-container">
      <MaterialTable
        columns={[
          { title: "ID", field: "id", editable: "never" },
          {
            title: "Màu",
            field: "mamau",
            lookup: colorObj,
            editable: "onAdd",
          },
          {
            title: "Size",
            field: "masize",
            lookup: sizeObj,
            editable: "onAdd",
          },
          {
            title: "Số lượng",
            field: "soluong",
            type: "numeric",
          },
          {
            title: "Notes",
            field: "notes",
            editable: "onUpdate",
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
            id: item.id,
            mamau: item.mausac.mamau,
            masize: item.size.masize,
            soluong: item.soluong,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              const payload = {
                magiay: id,
                masize: newData.masize,
                mamau: newData.mamau,
                soluong: parseInt(newData.soluong),
              };
              const res = productApi.addSizeMau(payload);
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
                const res = productApi.getAllSizeMau(id);
                res.then(function (res) {
                  setData(res.giaySizeMau);
                  //reset get giay by id
                  reset();
                });
              })
              .catch((error) => {
                toast.error(error);
              }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              
              const payload = {
                id: oldData.id,
                soluong: parseInt(newData.soluong),
                note: newData.notes,
              };
              const res = productApi.changeSoLuongSizeMau(payload);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Cập nhật size thành công !");
                  })
                  .catch(function (err) {
                    reject("Cập nhật size thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                const res = productApi.getAllSizeMau(id);
                res.then(function (res) {
                  setData(res.giaySizeMau);
                  //reset get giay by id
                  reset();
                });
              })
              .catch((error) => {
                toast.error(error);
              }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              const res = productApi.deleteSizeMau(oldData.id);
              setTimeout(() => {
                res
                  .then(function (res) {
                    resolve("Xóa size thành công !");
                  })
                  .catch(function (err) {
                    reject("Xóa size thất bại !");
                  });
              }, 1000);
            })
              .then((data) => {
                toast.success(data);
                const res = productApi.getAllSizeMau(id);
                res.then(function (res) {
                  setData(res.giaySizeMau);
                  //reset get giay by id
                  reset();
                });
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

export default memo(SizeTable);
