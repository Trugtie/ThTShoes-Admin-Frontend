import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import frLocale from "date-fns/locale/vi";
import { useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import saleApi from "../../../api/saleApi";
import { addSale } from "../../Tables/SaleTable/saleSlice";
import { ColorButton, style } from "../Styles";

export default function SaleModal({ sale, isOpen, isClose }) {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState(null);

  useLayoutEffect(() => {
    async function getById() {
      const result = await saleApi.getById(sale.makm);
      setData(result);
      setStartDate(result.ngaybd);
      setEndDate(result.ngaykt);
      setImage(result.urlanh);
    }
    getById();
    return () => {
      setData(null);
      setStartDate(null);
      setEndDate(null);
      setImage(null);
    };
  }, [sale]);

  const schema = yup
    .object({
      tieude: yup.string().required("Không được bỏ trống"),
      mota: yup.string().required("Không được bỏ trống"),
      soluong: yup.string().required("Không được bỏ trống"),
      giatrigiam: yup.string().required("Không được bỏ trống"),
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
    data.ngaybd = startDate.toISOString().substring(0, 10);
    data.ngaykt = endDate.toISOString().substring(0, 10);
    data.urlanh = image;
    dispatch(addSale(data))
      .unwrap()
      .then((originalPromiseResult) => {
        toast.success("Đã thêm 1 khuyến mãi !");
        isClose();
      })
      .catch((rejectedValueOrSerializedError) => {
        toast.error("Thêm thất bại !");
        reset();
      });
  };

  return (
    <>
      {data &&
        returnModal(
          data,
          isOpen,
          isClose,
          dispatch,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          image,
          setImage
        )}
      {sale === "add" &&
        returnModalAdd(
          isOpen,
          isClose,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          image,
          setImage,
          handleSubmit,
          onSubmit,
          control,
          errors
        )}
    </>
  );
}

function returnModal(
  data,
  isOpen,
  isClose,
  dispatch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  image,
  setImage
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
        <h1 className="modal-title">KHUYẾN MÃI</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin khuyến mãi</h2>
          <hr className="modal-divider" />
          <div className="modal-form">
            <Grid container spacing={2}>
              <Grid container item xs={6}>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Mã khuyến mãi"
                    variant="filled"
                    defaultValue={data.makm}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Tiêu đề"
                    variant="filled"
                    placeholder="Nhập tiêu đề..."
                    defaultValue={data.tieude}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Hình (Url)"
                    variant="filled"
                    placeholder="Nhập hình..."
                    defaultValue={image}
                    onChange={(e) => setImage(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <img src={image} style={{ width: "100%" }}></img>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker
                    label="Ngày bắt đầu"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      setEndDate(
                        new Date().setDate(new Date(newValue).getDate() + 1)
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="filled-basic"
                        variant="filled"
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker
                    label="Ngày kết thúc"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="filled-basic"
                        variant="filled"
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Số lượng"
                    variant="filled"
                    type="number"
                    defaultValue={data.soluong}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <TextareaAutosize
                    aria-label="Mô tả"
                    placeholder="Nhâp mô tả"
                    defaultValue={data.mota}
                    minRows={10}
                    maxRows={10}
                    style={{
                      width: "100%",
                      background: "#ece8e5",
                      border: "none",
                      padding: "1rem",
                      fontSize: "1rem",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "3rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ColorButton variant="contained">
                  Cập nhật khuyến mãi
                </ColorButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

function returnModalAdd(
  isOpen,
  isClose,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  image,
  setImage,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={style}>
          <h1 className="modal-title">KHUYẾN MÃI</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin khuyến mãi</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid container item xs={6}>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Mã khuyến mãi"
                      variant="filled"
                      defaultValue=""
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="tieude"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="filled-basic"
                          label="Tiêu đề"
                          variant="filled"
                          placeholder="Nhập tiêu đề..."
                          fullWidth
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="filled-basic"
                      label="Hình (Url)"
                      variant="filled"
                      placeholder="Nhập hình..."
                      defaultValue=""
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <img
                    src={
                      image
                        ? image
                        : "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
                    }
                    style={{ width: "100%" }}
                  ></img>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                  >
                    <DatePicker
                      disablePast
                      label="Ngày bắt đầu"
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="filled-basic"
                          variant="filled"
                          fullWidth
                          required
                          defaultValue=""
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                  >
                    <DatePicker
                      label="Ngày kết thúc"
                      value={endDate}
                      disablePast
                      minDate={new Date().setDate(
                        new Date(startDate).getDate() + 1
                      )}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          disablePast
                          {...params}
                          id="filled-basic"
                          variant="filled"
                          fullWidth
                          required
                          defaultValue=""
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="soluong"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="filled-basic"
                        label="Số lượng"
                        variant="filled"
                        type="number"
                        defaultValue=""
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="giatrigiam"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="filled-basic"
                        label="Giá trị giảm (%)"
                        variant="filled"
                        type="number"
                        defaultValue=""
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="mota"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextareaAutosize
                        {...field}
                        required
                        aria-label="Mô tả"
                        placeholder="Nhâp mô tả"
                        minRows={10}
                        maxRows={10}
                        style={{
                          width: "100%",
                          background: "#ece8e5",
                          border: "none",
                          padding: "1rem",
                          fontSize: "1rem",
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: "3rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ColorButton variant="contained" type="submit">
                    Thêm khuyến mãi
                  </ColorButton>
                </Grid>
              </Grid>
            </div>
          </div>
        </Box>
      </form>
    </Modal>
  );
}
