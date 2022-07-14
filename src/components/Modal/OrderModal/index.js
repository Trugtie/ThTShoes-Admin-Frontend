import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { duyetDonHang } from "../../Tables/OrderTable/orderSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function OrderModal({ order, isOpen, isClose }) {
  const dispatch = useDispatch();
  const dateCreate = new Date(order.ngaytao);
  const date = `${dateCreate.getDate()}/${dateCreate.getMonth()}/${dateCreate.getFullYear()} - ${dateCreate.getHours()}:${dateCreate.getMinutes()}:${dateCreate.getSeconds()}`;
  const status =
    order.tinhtrang === "DAGIAO"
      ? "Đã giao"
      : order.tinhtrang === "CHODUYET"
      ? "Chờ duyệt"
      : order.tinhtrang === "DADUYET"
      ? "Đã duyệt"
      : "Từ chối";

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    backgroundColor: "var(--button-color)",
    "&:hover": {
      backgroundColor: "black",
    },
  }));
  const ColorButtonRed = styled(Button)(({ theme }) => ({
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    backgroundColor: "#9b0000",
    "&:hover": {
      backgroundColor: "black",
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

  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="modal-title">ĐƠN HÀNG</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin đơn hàng</h2>
          <hr className="modal-divider" />
          <div className="modal-form">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Mã đơn"
                  variant="filled"
                  defaultValue={order.madon}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Người nhận"
                  variant="filled"
                  defaultValue={order.nguoinhan}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Ngày đặt"
                  variant="filled"
                  defaultValue={date}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Số điện thoại"
                  variant="filled"
                  fullWidth
                  defaultValue={
                    order.khachvanglai === null
                      ? order.khachHang.sdt
                      : order.khachvanglai.sdt
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Mã khuyến mãi"
                  variant="filled"
                  defaultValue={
                    order.makhuyenmai === null ? "Không có" : order.makhuyenmai
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Tình trạng"
                  variant="filled"
                  defaultValue={status}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  label="Địa chỉ"
                  variant="filled"
                  fullWidth
                  defaultValue={
                    order.khachvanglai === null
                      ? order.khachHang.diachi
                      : order.khachvanglai.diachi
                  }
                />
              </Grid>
            </Grid>
          </div>
          <h2 className="modal-subtitle">Chi tiết đơn hàng</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 500, maxHeight: 350 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Mã sản phẩm</StyledTableCell>
                        <StyledTableCell align="center">
                          Tên sản phẩm
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Số lượng
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Tổng giá
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.giayDonhangs.map((row) => {
                        return (
                          <StyledTableRow key={row.magiay}>
                            <StyledTableCell component="th" scope="row">
                              {row.magiay}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.tengiay}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.soluong} sản phẩm
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.tonggia.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                      {order.phukienDonhangs.map((row) => {
                        return (
                          <StyledTableRow key={row.maphukien}>
                            <StyledTableCell component="th" scope="row">
                              {row.maphukien}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.tenphukien}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.soluong} sản phẩm
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.tonggia.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={2}>
                          Tổng số lượng sản phẩm:
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>
                          {order.soluong} sản phẩm
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={2}>
                          Tổng giá tiền đơn hàng:
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>
                          {order.tonggia.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "3rem" }}>
            <Grid container spacing={2}>
              {order.tinhtrang === "CHODUYET" ? (
                <>
                  <Grid item xs={6}>
                    <ColorButton
                      onClick={() => {
                        const payload = { madonhang: order.madon };
                        dispatch(duyetDonHang(payload))
                          .then((originalPromiseResult) => {
                            toast.success("Duyệt đơn thành công");
                            isClose();
                          })
                          .catch((rejectedValueOrSerializedError) => {
                            toast.error("Duyệt đơn thất bại");
                          });
                      }}
                      variant="contained"
                    >
                      Duyệt đơn
                    </ColorButton>
                  </Grid>
                  <Grid item xs={6}>
                    <ColorButtonRed
                      variant="contained"
                      onClick={() => {
                        const payload = {
                          madonhang: order.madon,
                          tinhTrang: "TUCHOI",
                        };
                        dispatch(duyetDonHang(payload))
                          .then((originalPromiseResult) => {
                            toast.success("Đã từ chối đơn hàng");
                            isClose();
                          })
                          .catch((rejectedValueOrSerializedError) => {
                            toast.error("Từ chối đơn hàng thất bại");
                          });
                      }}
                    >
                      Hủy bỏ
                    </ColorButtonRed>
                  </Grid>
                </>
              ) : order.tinhtrang === "DADUYET" ? (
                <>
                  <Grid item xs={12}>
                    <ColorButton
                      variant="contained"
                      onClick={() => {
                        const payload = { madonhang: order.madon };
                        dispatch(duyetDonHang(payload))
                          .then((originalPromiseResult) => {
                            toast.success("Hoàn thành đơn hàng");
                            isClose();
                          })
                          .catch((rejectedValueOrSerializedError) => {
                            toast.error("Chưa hoàn thành đơn hàng");
                          });
                      }}
                    >
                      Hoàn thành
                    </ColorButton>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
