import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import CustomizedAccordion from "../CustomizedAccordion";
import ClockCircle from "../ClockCircle";
import StaffModal from "../Modal/StaffModal";
import ExitIcon from "../../assets/exit.svg";
import Logo from "../../assets/logo.svg";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "./userSlice";
import { userSelector } from "../../redux/selectors";
import StarIcon from "../../assets/star.svg";
import { disconnect } from "../../websocket/socket";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  useEffect(() => {
    ClockCircle();
  }, []);

  const [open, setOpen] = useState(false);
  const [staffEdit, setStaff] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (staff) => {
    setStaff(staff);
    setOpen(true);
  };
  const handleExit = () => {
    dispatch(userSlice.actions.logout());
    disconnect();
  };

  return (
    <header>
      <div className="nav-container">
        <nav className="nav-flex">
          <div className="nav-header">
            <img className="nav-logo" src={Logo} alt="Logo" />
            <div id="clock"></div>
            <div className="user-info">
              <h3 className="user-role">
                {user.taiKhoan.quyen === "ADMIN" ? "Admin" : "Nhân viên"}
              </h3>
              <div className="user-divider">
                <img className="user-star" src={StarIcon} />
              </div>
              <Link
                color="inherit"
                component="button"
                underline="hover"
                variant="body2"
              >
                Welcome {user.ten}
              </Link>
            </div>
          </div>
          <div className="nav-content">
            <CustomizedAccordion />
          </div>
          <div className="nav-footer">
            <button className="exitBtn" onClick={handleExit}>
              <img src={ExitIcon} />
            </button>
          </div>
        </nav>
      </div>
      <StaffModal staff={staffEdit} isOpen={open} isClose={handleClose} />
    </header>
  );
}

export default Nav;
