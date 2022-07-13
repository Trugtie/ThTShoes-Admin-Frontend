import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./style.scss";

export default function BasicModal({ staff, isOpen, isClose }) {
  const [trangthai, setTrangthai] = useState("0");

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    backgroundColor: "var(--button-color)",
    "&:hover": {
      backgroundColor: "#80583b",
    },
  }));

  const DeleteButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    backgroundColor: "rgb(181, 32, 23)",
    "&:hover": {
      backgroundColor: "red",
    },
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 1181,
    height: "100%",
    maxHeight: 895,
    bgcolor: "#FBF6F3",
    color: "black",
    borderRadius: "20px 20px 10px 10px;",
    boxShadow: 24,
  };

  return (
    <Modal
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
                  id="filled-basic"
                  label="Họ"
                  variant="filled"
                  placeholder="Nhập họ..."
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Tên đệm"
                  variant="filled"
                  placeholder="Nhập tên đệm..."
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Tên"
                  variant="filled"
                  placeholder="Nhập tên..."
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Số điện thoại"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập SĐT"
                  type="number"
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  label="Địa chỉ"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập địa chỉ..."
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập email..."
                  defaultValue=""
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
                  disabled
                  id="filled-basic"
                  label="Tên tài khoản"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập tên tài khoản..."
                  defaultValue=""
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Quyền"
                  variant="filled"
                  fullWidth
                  defaultValue=""
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
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={trangthai}
                    onChange={(e) => setTrangthai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Hoạt động</MenuItem>
                    <MenuItem value={"1"}>Bị khóa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Mật khẩu"
                  variant="filled"
                  type="password"
                  fullWidth
                  placeholder="Nhập mật khẩu..."
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Xác nhận mật khẩu"
                  variant="filled"
                  type="password"
                  fullWidth
                  placeholder="Nhập lại mật khẩu..."
                />
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "3rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ColorButton variant="contained">Thêm nhân viên</ColorButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
