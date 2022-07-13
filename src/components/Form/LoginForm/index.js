import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import LinkUI from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import LoginFormLogo from "../../../assets/LoginLogo.svg";
import "./style.scss";

function LoginForm() {
  const LoginButton = styled(Button)({
    backgroundColor: "var(--button-color)",
    margin: "36px 0px",
    borderRadius: "0",
    fontWeight: "700",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "var(--button-green-color)",
    },
  });
  return (
    <div className="login-form__container">
      <form>
        <img src={LoginFormLogo} className="login-logo" />
        <div className="login-form__bg">
          <div className="login-username">
            <PersonIcon className="person-icon" />
            <span className="loginInput-label">Tên đăng nhập</span>
          </div>
          <TextField
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
          <div className="login-password">
            <LockIcon className="person-icon" />
            <span className="loginInput-label">Mật khẩu</span>
          </div>
          <TextField
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
          <br />
          <br />
          <LoginButton variant="contained" fullWidth type="submit">
            ĐĂNG NHẬP
          </LoginButton>
          <br />
          <LinkUI underline="none">Quên mật khẩu ?</LinkUI>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
