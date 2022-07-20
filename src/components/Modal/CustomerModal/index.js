import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { ColorButton, DeleteButton, style } from "../Styles";

export default function CustomerModal({ cus, isOpen, isClose }) {
  const [trangthai, setTrangthai] = React.useState("0");

  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="modal-title">KHÁCH HÀNG</h1>
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
                  label="Địa chỉ thường trú"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập địa chỉ thường trú..."
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
                    <MenuItem value={"1"}>Bị khoá</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            {cus ? (
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained">
                    Cập nhật khách hàng
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <DeleteButton variant="contained">
                    Xoá khách hàng
                  </DeleteButton>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <ColorButton variant="contained">Thêm khách hàng</ColorButton>
              </Grid>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
