import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import "./style.scss";
import StaffIcon from "../../assets/staff.svg";
import CustomerIcon from "../../assets/customer.svg";
import SaleIcon from "../../assets/saleIcon.svg";
import ProductIcon from "../../assets/productIcon.svg";
import OrderIcon from "../../assets/orderIcon.svg";
import CommentIcon from "../../assets/commentIcon.svg";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMoreIcon
        sx={{ fontSize: "1.4rem", color: "white", width: "25px" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "var(--button-color)",
  flexDirection: "row",
  "& .MuiAccordionSummary-content": {
    margin: 0,
    height: "35px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  color: "white",
  fontSize: "14px",
  fontWeight: "700",
  padding: "0",
  minHeight: "35px",
}));

export default function CustomizedAccordion({ permission }) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <React.Fragment>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <Link to="/customermanagement" className="link">
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
              sx={{
                "&:hover": {
                  bgcolor: "black",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              <div className="icon-bg">
                <img src={CustomerIcon} />
              </div>
              <div className="acor-heading">QUẢN LÝ KHÁCH HÀNG</div>
            </AccordionSummary>
          </Link>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <Link to="/staffmanagement" className="link">
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{
                "&:hover": {
                  bgcolor: "black",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              <div className="icon-bg">
                <img src={StaffIcon} />
              </div>
              <div className="acor-heading">QUẢN LÝ NHÂN VIÊN</div>
            </AccordionSummary>
          </Link>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <Link to="/productmanagement" className="link">
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
              sx={{
                "&:hover": {
                  bgcolor: "black",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              <div className="icon-bg">
                <img src={ProductIcon} />
              </div>
              <div className="acor-heading">QUẢN LÝ SẢN PHẨM</div>
            </AccordionSummary>
          </Link>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <Link to="/ordermanagement" className="link">
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
              sx={{
                "&:hover": {
                  bgcolor: "black",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              <div className="icon-bg">
                <img src={OrderIcon} />
              </div>
              <div className="acor-heading">QUẢN LÝ ĐƠN HÀNG</div>
            </AccordionSummary>
          </Link>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <Link to="/salemanagement" className="link">
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
              sx={{
                "&:hover": {
                  bgcolor: "black",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              <div className="icon-bg">
                <img src={SaleIcon} />
              </div>
              <div className="acor-heading">QUẢN LÝ KHUYẾN MÃI</div>
            </AccordionSummary>
          </Link>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <Link to="/feedbackmanagement" className="link">
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
              sx={{
                "&:hover": {
                  bgcolor: "black",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              <div className="icon-bg">
                <img src={CommentIcon} />
              </div>
              <div className="acor-heading">QUẢN LÝ BÌNH LUẬN</div>
            </AccordionSummary>
          </Link>
        </Accordion>
      </React.Fragment>
    </div>
  );
}
