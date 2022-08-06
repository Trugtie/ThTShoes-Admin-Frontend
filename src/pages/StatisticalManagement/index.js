import { useDispatch } from "react-redux";
import {
  fetchAccessoriesType,
  fetchCategories,
  fetchColor,
  fetchLabel,
  fetchShoesType,
  fetchSize,
  fetchAllSum,
} from "../StatisticalManagement/statisticalSlice";
import LoadingSpinner from "../../components/LoadingSpiner";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SizesTable from "../../components/Tables/SizesTable";
import ColorTable from "../../components/Tables/ColorTable";
import CategoriesTable from "../../components/Tables/CategoriesTable";
import LabelTable from "../../components/Tables/LabelTable";
import ShoesTypeTable from "../../components/Tables/ShoesTypeTable";
import AccessoriesTable from "../../components/Tables/AccessoriesTable";
import "./style.scss";
import BoxStatistical from "../../components/BoxStatistical";
import { useSelector } from "react-redux";
import { allSumSelector } from "../../redux/selectors";
import OrderChart from "../../components/ChartOrder";

function StatisticalManagement() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const sumData = useSelector(allSumSelector);

  useEffect(() => {
    dispatch(fetchAccessoriesType());
    dispatch(fetchCategories());
    dispatch(fetchColor());
    dispatch(fetchLabel());
    dispatch(fetchShoesType());
    dispatch(fetchSize());
    dispatch(fetchAllSum())
      .unwrap()
      .then((originalPromiseResult) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);
  return (
    <div className="StaffManagement-container Statistical-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 className="statistical-title">Thống kê</h1>
            <hr className="statistical-divider" />
          </Grid>
          <Grid item xs={4}>
            <BoxStatistical
              title="TỔNG KHÁCH HÀNG:"
              content={sumData.tongSoKhachHang}
              bg="linear-gradient(to right, #ff512f, #dd2476)"
            />
          </Grid>
          <Grid item xs={4}>
            <BoxStatistical
              title="TỔNG DOANH THU:"
              content={parseInt(sumData.tongDoanhThu).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              bg="linear-gradient(to right, #36d1dc, #5b86e5)"
            />
          </Grid>
          <Grid item xs={4}>
            <BoxStatistical
              title="ĐƠN HÀNG CHƯA DUYỆT:"
              content={sumData.tongDonHangChuaDuyet}
              bg="linear-gradient(to right, #000428, #004e92)"
            />
          </Grid>
          <Grid item xs={4}>
            <BoxStatistical
              title="ĐƠN HÀNG ĐÃ GIAO:"
              content={sumData.tongDonHangDaGiao}
              bg="linear-gradient(to right, #ff5f6d, #ffc371)"
            />
          </Grid>
          <Grid item xs={4}>
            <BoxStatistical
              title="ĐƠN HÀNG BỊ HỦY:"
              content={sumData.tongDonTuChoi}
              bg="linear-gradient(to right, #ff9966, #ff5e62)"
            />
          </Grid>
          <Grid item xs={12}>
            <OrderChart />
          </Grid>
          <Grid item xs={12}>
            <h1 className="statistical-title">Quản lý danh mục</h1>
            <hr className="statistical-divider" />
          </Grid>
          <Grid item xs={4}>
            <SizesTable />
          </Grid>
          <Grid item xs={4}>
            <ColorTable />
          </Grid>
          <Grid item xs={4}>
            <CategoriesTable />
          </Grid>
          <Grid item xs={4}>
            <LabelTable />
          </Grid>
          <Grid item xs={4}>
            <ShoesTypeTable />
          </Grid>
          <Grid item xs={4}>
            <AccessoriesTable />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default StatisticalManagement;
