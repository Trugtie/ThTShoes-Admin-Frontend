import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import frLocale from "date-fns/locale/vi";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import statisticalApi from "../../api/statisticalApi";
import moment from "moment";

export default function OrderChart() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleSubmit = () => {
    if (startDate === null) {
      toast.error("Chưa chọn ngày bắt đầu");
    } else if (endDate === null) {
      toast.error("Chưa chọn ngày kết thúc");
    } else {
      const payload = {
        ngayBd: moment(startDate).format("YYYY-MM-DD"),
        ngayKt: moment(endDate).format("YYYY-MM-DD"),
      };
      console.log(payload);
      const res = statisticalApi.getOrderByDate(payload);
      res
        .then(function (res) {
          setData(res.list);
        })
        .catch(function (err) {
          toast.error("Thất bại!");
        });
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ margin: "1rem 0rem", padding: "0rem 2rem" }}
      >
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <h1 className="chart-title">Biểu đồ thống kê đơn hàng</h1>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <DatePicker
                  label="Ngày bắt đầu"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      disablePast
                      {...params}
                      id="filled-basic"
                      variant="filled"
                      fullWidth
                      required
                      defaultValue=""
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <DatePicker
                  label="Ngày kết thúc"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      disablePast
                      {...params}
                      id="filled-basic"
                      variant="filled"
                      fullWidth
                      required
                      defaultValue=""
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Button variant="contained" onClick={handleSubmit}>
                Lọc
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="thoigian"
            label={{
              value: "Ngày",
              position: "insideBottom",
            }}
          />
          <YAxis
            label={{
              value: "Tổng đơn hàng",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            label="Tổng đơn hàng"
            contentStyle={{
              fontSize: "1rem",
            }}
          />
          <Legend />
          <Bar dataKey="tong" fill="#a8daf9" maxBarSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
