import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

export default function CustomerModal({ cus, isOpen, isClose }) {
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

  const [trangthai, setTrangthai] = React.useState("0");

  return (
    <Modal
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
