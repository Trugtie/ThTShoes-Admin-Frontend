import "./style.scss";
import loginBG from "../../assets/login.jpg";
import LoginForm from "../../components/Form/LoginForm";

const styleBG = {
  background: `url(${loginBG})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

function Login() {
  return (
    <div className="login-bg" style={styleBG}>
      <div className="login-overlay">
        <div className="login-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
