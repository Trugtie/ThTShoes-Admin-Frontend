import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import staffApi from "../../../api/staffApi";
import { addStaff, fetchStaff } from "../../Tables/StaffTable/staffSlice";
import { ColorButton, style, ColorButtonRed } from "../Styles";
import BlurLoading, { toggleBlur } from "../../BlurLoading";
import "./style.scss";

export default function BasicModal({ staff, isOpen, isClose }) {
  const dispatch = useDispatch();
  const [trangthai, setTrangthai] = useState("0");
  const [data, setData] = useState(null);
  useLayoutEffect(() => {
    async function getById() {
      const result = await staffApi.getById(staff.manv);
      console.log(result);
      setData(result);
      setTrangthai(result.taiKhoan.tinhtrang);
    }
    getById();
    return () => {
      setData(null);
      setTrangthai("0");
    };
  }, [staff]);

  const schema = yup
    .object({
      taikhoan: yup.object({
        email: yup
          .string()
          .required("Không được bỏ trống")
          .email("Email không hợp lệ"),
        username: yup
          .string()
          .required("Không được bỏ trống")
          .max(18, "Tối đa 18 ký tự"),
        password: yup
          .string()
          .required("Không được bỏ trống")
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Tối thiểu 8 ký tự, ít nhất một ký tự hoa, một ký tự thường, một số và một ký tự đặc biệt"
          )
          .max(18, "Tối đa 18 ký tự"),
        confirmPassword: yup
          .string()
          .required("Không được bỏ trống")
          .min(6, "Tối thiểu 6 ký tự")
          .max(18, "Tối đa 18 ký tự")
          .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
      }),
      nhanvien: yup.object({
        diachi: yup.string().required("Không được bỏ trống"),
        ho: yup.string().required("Không được bỏ trống"),
        sdt: yup
          .string()
          .required("Không được bỏ trống")
          .length(10, "Số điện thoại không hợp lệ"),
        ten: yup.string().required("Không được bỏ trống"),
      }),
    })
    .required();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    toggleBlur();
    dispatch(addStaff(data))
      .unwrap()
      .then((originalPromiseResult) => {
        toggleBlur();
        toast.success("Đã thêm 1 nhân viên !");
        reset();
        isClose();
      })
      .catch((rejectedValueOrSerializedError) => {
        toggleBlur();
        toast.error(rejectedValueOrSerializedError);
      });
  };

  return (
    <>
      {data &&
        returnModal(isOpen, isClose, trangthai, setTrangthai, data, dispatch)}
      {staff === "add" &&
        returnModalAdd(
          isOpen,
          isClose,
          trangthai,
          setTrangthai,
          handleSubmit,
          onSubmit,
          control,
          errors
        )}
    </>
  );
}

function returnModalAdd(
  isOpen,
  isClose,
  trangthai,
  setTrangthai,
  handleSubmit,
  onSubmit,
  control,
  errors
) {
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <BlurLoading />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="modal-title">NHÂN VIÊN</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin cá nhân</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="nhanvien.ho"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="filled-basic"
                        label="Họ"
                        variant="filled"
                        placeholder="Nhập họ..."
                        defaultValue=""
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="nhanvien.ten"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="filled-basic"
                        label="Tên"
                        variant="filled"
                        placeholder="Nhập tên..."
                        defaultValue=""
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                {errors.nhanvien && (
                  <Grid
                    container
                    sx={{
                      paddingTop: "0px !important",
                      paddingLeft: "1.3rem !important",
                      color: "red",
                      textAlign: "left",
                      fontSize: "1rem",
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{
                        paddingTop: "0px !important",
                        color: "red",
                        textAlign: "left",
                        fontSize: "1rem",
                        textIndent: ".5rem",
                      }}
                    >
                      <p>{errors.nhanvien.ho?.message}</p>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        paddingTop: "0px !important",
                        color: "red",
                        textAlign: "left",
                        fontSize: "1rem",
                        textIndent: ".5rem",
                      }}
                    >
                      <p>{errors.nhanvien.ten?.message}</p>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Controller
                    name="nhanvien.sdt"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputProps={{ maxLength: 10 }}
                        id="filled-basic"
                        label="Số điện thoại"
                        variant="filled"
                        fullWidth
                        placeholder="Nhập SĐT"
                        defaultValue=""
                      />
                    )}
                  />
                </Grid>
                {errors.nhanvien && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingTop: "0px !important",
                      color: "red",
                      textAlign: "left",
                      fontSize: "1rem",
                      textIndent: ".5rem",
                    }}
                  >
                    <p>{errors.nhanvien.sdt?.message}</p>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Controller
                    name="nhanvien.diachi"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="filled-basic"
                        label="Địa chỉ"
                        variant="filled"
                        fullWidth
                        placeholder="Nhập địa chỉ..."
                        defaultValue=""
                      />
                    )}
                  />
                </Grid>
                {errors.nhanvien && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingTop: "0px !important",
                      color: "red",
                      textAlign: "left",
                      fontSize: "1rem",
                      textIndent: ".5rem",
                    }}
                  >
                    <p>{errors.nhanvien.diachi?.message}</p>
                  </Grid>
                )}
              </Grid>
            </div>
            <h2 className="modal-subtitle">Thông tin tài khoản</h2>
            <hr className="modal-divider" />
            <div className="modal-form" style={{ marginTop: "2rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="taikhoan.username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="filled-basic"
                        label="Tên tài khoản"
                        variant="filled"
                        fullWidth
                        placeholder="Nhập tên tài khoản..."
                        defaultValue=""
                      />
                    )}
                  />
                </Grid>
                {errors.taikhoan && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingTop: "0px !important",
                      color: "red",
                      textAlign: "left",
                      fontSize: "1rem",
                      textIndent: ".5rem",
                    }}
                  >
                    <p>{errors.taikhoan.username?.message}</p>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Controller
                    name="taikhoan.email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        fullWidth
                        placeholder="Nhập email..."
                        defaultValue=""
                      />
                    )}
                  />
                </Grid>
                {errors.taikhoan && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingTop: "0px !important",
                      color: "red",
                      textAlign: "left",
                      fontSize: "1rem",
                      textIndent: ".5rem",
                    }}
                  >
                    <p>{errors.taikhoan.email?.message}</p>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Controller
                    name="taikhoan.password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        fullWidth
                        id="filled-basic"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu..."
                        variant="filled"
                      />
                    )}
                  />
                </Grid>
                {errors.taikhoan && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingTop: "0px !important",
                      color: "red",
                      textAlign: "left",
                      fontSize: "1rem",
                      textIndent: ".5rem",
                    }}
                  >
                    <p>{errors.taikhoan.password?.message}</p>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Controller
                    name="taikhoan.confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        fullWidth
                        id="filled-basic"
                        label="Xác nhận mật khẩu"
                        placeholder="Nhập lại mật khẩu..."
                        variant="filled"
                      />
                    )}
                  />
                </Grid>
                {errors.taikhoan && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingTop: "0px !important",
                      color: "red",
                      textAlign: "left",
                      fontSize: "1rem",
                      textIndent: ".5rem",
                    }}
                  >
                    <p>{errors.taikhoan.confirmPassword?.message}</p>
                  </Grid>
                )}
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: ".5rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained" type="submit">
                    Thêm nhân viên
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <ColorButtonRed variant="contained" onClick={isClose}>
                    Thoát
                  </ColorButtonRed>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

function returnModal(isOpen, isClose, trangthai, setTrangthai, data, dispatch) {
  const handleLock = () => {
    toggleBlur();
    const result = staffApi.lockStaff(data.manv);
    result
      .then(function (response) {
        toggleBlur();
        toast.success(`Đã khóa ${data.manv}`);
        dispatch(fetchStaff());
        isClose();
      })
      .catch(function (error) {
        toggleBlur();
        toast.error(error.message);
      });
  };
  const handleUnLock = () => {
    toggleBlur();
    const result = staffApi.unlockStaff(data.manv);
    result
      .then(function (response) {
        toggleBlur();
        toast.success(`Đã mở khóa ${data.manv}`);
        dispatch(fetchStaff());
        isClose();
      })
      .catch(function (error) {
        toggleBlur();
        toast.error(error.message);
      });
  };
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <BlurLoading />
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
                  defaultValue={data.manv}
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
              <Grid item xs={6}>
                {trangthai === 1 ? (
                  <ColorButton variant="contained" onClick={handleLock}>
                    Khóa
                  </ColorButton>
                ) : (
                  <ColorButton variant="contained" onClick={handleUnLock}>
                    Mở khóa
                  </ColorButton>
                )}
              </Grid>
              <Grid item xs={6}>
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
