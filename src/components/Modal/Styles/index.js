import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: ".8rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.2rem",
    height: "1rem",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    transition: "all .3s",
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
}));

export const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bolder",
  width: "100%",
  backgroundColor: "var(--button-color)",
  "&:hover": {
    backgroundColor: "black",
  },
}));
export const ColorButtonRed = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bolder",
  width: "100%",
  backgroundColor: "#9b0000",
  "&:hover": {
    backgroundColor: "black",
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bolder",
  width: "100%",
  backgroundColor: "rgb(181, 32, 23)",
  "&:hover": {
    backgroundColor: "red",
  },
}));


export const style = {
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
