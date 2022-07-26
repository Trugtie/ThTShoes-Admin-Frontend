import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import customerApi from "../../../api/customerApi";
import { ColorButton, style, ColorButtonRed } from "../Styles";

export default function BasicModal({ customer, isOpen, isClose }) {
  const dispatch = useDispatch();
  const [trangthai, setTrangthai] = useState("0");
  const [data, setData] = useState(null);
  useLayoutEffect(() => {
    async function getById() {
      const result = await customerApi.getById(customer.makh);
      setData(result);
    }
    getById();
    return () => {
      setData(null);
      setTrangthai("0");
    };
  }, [customer]);

  return (
    <>{data && returnModal(isOpen, isClose, trangthai, setTrangthai, data)}</>
  );
}
function returnModal(isOpen, isClose, trangthai, setTrangthai, data) {
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="modal-title">NHÂN VIÊN</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin cá nhân</h2>
          <hr className="modal-divider" />
          <div className="modal-form">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Mã nhân viên"
                  variant="filled"
                  defaultValue={data.makh}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Họ"
                  variant="filled"
                  placeholder="Nhập họ..."
                  defaultValue={data.ho}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Tên"
                  variant="filled"
                  placeholder="Nhập tên..."
                  defaultValue={data.ten}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Số điện thoại"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập SĐT"
                  type="number"
                  defaultValue={data.sdt}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Địa chỉ"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập địa chỉ..."
                  defaultValue={data.diachi}
                />
              </Grid>
            </Grid>
          </div>
          <h2 className="modal-subtitle">Thông tin tài khoản</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Tên tài khoản"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập tên tài khoản..."
                  defaultValue={data.taiKhoan.username}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Quyền"
                  variant="filled"
                  fullWidth
                  defaultValue={data.taiKhoan.quyen}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  InputProps={{ readOnly: true }}
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập email..."
                  defaultValue={data.taiKhoan.email}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Trạng thái
                  </InputLabel>
                  <Select
                    disabled
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={data.taiKhoan.tinhtrang}
                    onChange={(e) => setTrangthai(e.target.value)}
                  >
                    <MenuItem value={"1"}>Hoạt động</MenuItem>
                    <MenuItem value={"0"}>Bị khóa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "3rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ColorButtonRed variant="contained" onClick={isClose}>
                  Thoát
                </ColorButtonRed>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
