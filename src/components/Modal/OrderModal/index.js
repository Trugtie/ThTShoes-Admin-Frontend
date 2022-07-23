import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import orderApi from "../../../api/orderApi";
import { duyetDonHang } from "../../Tables/OrderTable/orderSlice";
import { toggleBlur } from "../../BlurLoading";
import {
  ColorButton,
  ColorButtonRed,
  style,
  StyledTableCell,
  StyledTableRow,
} from "../Styles";

export default function OrderModal({ order, isOpen, isClose }) {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    async function getById() {
      const result = await orderApi.getById(order.madon);
      setData(result);
    }
    getById();
  }, [order]);

  return <>{data && returnModal(data, isOpen, isClose, dispatch)}</>;
}

function returnModal(data, isOpen, isClose, dispatch) {
  const dateCreate = new Date(data.ngaytao);
  const date = `${dateCreate.getDate()}/${dateCreate.getMonth()}/${dateCreate.getFullYear()} - ${dateCreate.getHours()}:${dateCreate.getMinutes()}:${dateCreate.getSeconds()}`;
  const status =
    data.tinhtrang === "DAGIAO"
      ? "Đã giao"
      : data.tinhtrang === "CHODUYET"
      ? "Chờ duyệt"
      : data.tinhtrang === "DADUYET"
      ? "Đã duyệt"
      : "Từ chối";
  return (
    <Modal
      className="modal-container"
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
                  defaultValue={data.madon}
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
                  defaultValue={data.nguoinhan}
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
                    data.khachvanglai === null
                      ? data.khachHang.sdt
                      : data.khachvanglai.sdt
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
                    data.makhuyenmai === null ? "Không có" : data.makhuyenmai
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
                    data.khachvanglai === null
                      ? data.khachHang.diachi
                      : data.khachvanglai.diachi
                  }
                />
              </Grid>
            </Grid>
          </div>
          <h2 className="modal-subtitle">Chi tiết đơn hàng</h2>
          <hr className="modal-divider" />
          <div
            className="modal-form modal-form--detail"
            style={{ marginTop: "2rem" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer sx={{ minWidth: 500, maxHeight: 350 }}>
                  <Table stickyHeader aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Mã sản phẩm</StyledTableCell>
                        <StyledTableCell align="center">
                          Tên sản phẩm
                        </StyledTableCell>
                        <StyledTableCell align="center">Size</StyledTableCell>
                        <StyledTableCell align="center">
                          Màu sắc
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
                      {data.giayDonhangs.map((row) => {
                        return (
                          <StyledTableRow
                            key={
                              row.giay.magiay +
                              row.size.tensize +
                              row.mausac.mamau
                            }
                          >
                            <StyledTableCell component="th" scope="row">
                              {row.giay.magiay}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.giay.tengiay}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.size.tensize}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.mausac.tenmau}
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
                      {data.phukienDonhangs.map((row) => {
                        return (
                          <StyledTableRow key={row.maphukien}>
                            <StyledTableCell component="th" scope="row">
                              {row.maphukien}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.tenphukien}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Không có
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Không có
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
                        <StyledTableCell align="center" colSpan={3}>
                          Tổng số lượng sản phẩm:
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={3}>
                          {data.soluong} sản phẩm
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={3}>
                          Tổng giá tiền đơn hàng:
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={3}>
                          {data.tonggia.toLocaleString("vi-VN", {
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
              {data.tinhtrang === "CHODUYET" ? (
                <>
                  <Grid item xs={6}>
                    <ColorButton
                      onClick={() => {
                        toggleBlur();
                        const payload = { madonhang: data.madon };
                        dispatch(duyetDonHang(payload))
                          .then((originalPromiseResult) => {
                            toggleBlur();
                            toast.success("Duyệt đơn thành công");
                            isClose();
                          })
                          .catch((rejectedValueOrSerializedError) => {
                            toggleBlur();
                            toast.error("Duyệt đơn thất bại");
                            isClose();
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
                        toggleBlur();
                        const payload = {
                          madonhang: data.madon,
                          tinhTrang: "TUCHOI",
                        };
                        dispatch(duyetDonHang(payload))
                          .then((originalPromiseResult) => {
                            toggleBlur();
                            toast.success("Đã từ chối đơn hàng");
                            isClose();
                          })
                          .catch((rejectedValueOrSerializedError) => {
                            toggleBlur();
                            toast.error("Từ chối đơn hàng thất bại");
                            isClose();
                          });
                      }}
                    >
                      Hủy đơn hàng
                    </ColorButtonRed>
                  </Grid>
                </>
              ) : data.tinhtrang === "DADUYET" ? (
                <>
                  <Grid item xs={12}>
                    <ColorButton
                      variant="contained"
                      onClick={() => {
                        toggleBlur();
                        const payload = { madonhang: data.madon };
                        dispatch(duyetDonHang(payload))
                          .then((originalPromiseResult) => {
                            toggleBlur();
                            toast.success("Hoàn thành đơn hàng");
                            isClose();
                          })
                          .catch((rejectedValueOrSerializedError) => {
                            toast.error("Chưa hoàn thành đơn hàng");
                            isClose();
                          });
                      }}
                    >
                      Hoàn thành
                    </ColorButton>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <ColorButtonRed variant="contained" onClick={isClose}>
                    Thoát
                  </ColorButtonRed>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
