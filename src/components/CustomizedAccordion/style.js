import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";

export const Accordion = styled((props) => (
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
  
  export const AccordionSummary = styled((props) => (
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
  