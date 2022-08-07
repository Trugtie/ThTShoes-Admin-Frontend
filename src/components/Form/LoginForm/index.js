import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import LoginFormLogo from "../../../assets/LoginLogo.png";
import "./style.scss";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getMyInfo, login } from "../../Nav/userSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { connect } from "../../../websocket/socket";
import { toggleBlur } from "../../BlurLoading";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMes, setErrorMes] = useState(false);
  const LoginButton = styled(Button)({
    backgroundColor: "var(--button-color)",
    margin: "36px 0px",
    borderRadius: "0",
    fontWeight: "700",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "black",
    },
  });
  const schema = yup
    .object({
      username: yup
        .string()
        .required("Không được bỏ trống")
        .max(18, "Tối đa 18 ký tự"),
      password: yup
        .string()
        .required("Không được bỏ trống")
        .min(6, "Tối thiểu 6 ký tự")
        .max(18, "Tối đa 18 ký tự"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    toggleBlur();
    await dispatch(login(data));
    dispatch(getMyInfo())
      .unwrap()
      .then((originalPromiseResult) => {
        connect();
      })
      .catch(() => {
        toggleBlur();
        setErrorMes(true);
        setTimeout(() => setErrorMes(false), 3000);
      });
  };

  return (
    <div className="login-form__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={LoginFormLogo} className="login-logo" />
        <div className="login-form__bg">
          <div className="login-username">
            <PersonIcon className="person-icon" />
            <span className="loginInput-label">Tên đăng nhập</span>
          </div>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="username"
                label="Username"
                variant="filled"
                placeholder="Nhập tên tài khoản..."
                required
                fullWidth
                sx={{
                  backgroundColor: "#fff",
                }}
              />
            )}
          />
          {errors.username && (
            <Grid
              item
              xs={12}
              sx={{
                paddingTop: "5px !important",
                color: "red",
                textAlign: "left",
                fontSize: "1rem",
                textIndent: ".5rem",
              }}
            >
              <p>{errors.username?.message}</p>
            </Grid>
          )}
          <div className="login-password">
            <LockIcon className="person-icon" />
            <span className="loginInput-label">Mật khẩu</span>
          </div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                label="Password"
                variant="filled"
                type="password"
                placeholder="Nhập mật khẩu..."
                required
                fullWidth
                sx={{
                  backgroundColor: "#fff",
                }}
              />
            )}
          />
          {errors.password && (
            <Grid
              item
              xs={12}
              sx={{
                paddingTop: "5px !important",
                color: "red",
                textAlign: "left",
                fontSize: "1rem",
                textIndent: ".5rem",
              }}
            >
              <p>{errors.password?.message}</p>
            </Grid>
          )}

          <br />
          <br />
          <LoginButton variant="contained" fullWidth type="submit">
            ĐĂNG NHẬP
          </LoginButton>
          {errorMes && (
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Alert variant="filled" severity="error">
                Sai tài khoản hoặc mật khẩu
              </Alert>
            </Grid>
          )}
          <br />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
