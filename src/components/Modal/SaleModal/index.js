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
import { fetchSale } from "../../Tables/SaleTable/saleSlice";
import { ColorButton, style, ColorButtonRed } from "../Styles";
import BlurLoading, { toggleBlur } from "../../BlurLoading";

export default function SaleModal({ sale, isOpen, isClose }) {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState();
  const [id, setId] = useState("");
  const [add, setAdd] = useState(true);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  useLayoutEffect(() => {
    async function getById() {
      const result = await saleApi.getById(sale.makm);
      setData(result);
      setStartDate(result.ngaybd);
      setEndDate(result.ngaykt);
      setTitle(result.tieude);
      setCount(result.soluong);
      setDescription(result.mota);
      setCost(result.giatrigiam);
    }
    getById();
    return () => {
      setData(null);
      setStartDate(null);
      setEndDate(null);
      setImage("");
      setAdd(true);
      reset();
      setId("");
      setImageFile();
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
    toggleBlur();
    data.ngaybd = startDate.toISOString().substring(0, 10);
    data.ngaykt = endDate.toISOString().substring(0, 10);
    const res = saleApi.addSale(data);
    res
      .then(function (response) {
        toggleBlur();
        dispatch(fetchSale());
        toast.success("Đã thêm thông tin khuyến mãi, hãy thêm hình !");
        setId(response.data);
        setAdd(false);
      })
      .catch(function (error) {
        toggleBlur();
        toast.error("Thêm thất bại !");
      });
  };

  //Upload image
  const handleSelectFile = (e) => {
    const imageSelected = e.target.files[0];
    console.log(imageSelected);
    const imageURL = URL.createObjectURL(imageSelected);
    setImage(imageURL);
    setImageFile(imageSelected);
  };

  const {
    register: imageRegister,
    formState: { errors: imageErrors },
    handleSubmit: handleSubmitImage,
  } = useForm();

  const onSubmitImage = (data) => {
    if (image.length > 0) {
      toggleBlur();
      let formData = new FormData();
      formData.append("imageKm", imageFile);

      const payload = {
        makm: id,
        data: formData,
      };
      const res = saleApi.addImage(payload);
      res
        .then(function (response) {
          toggleBlur();
          dispatch(fetchSale());
          toast.success(`Đã thêm thêm hình cho ${id} ! `);
          setData(null);
          setStartDate(null);
          setEndDate(null);
          setImage("");
          setAdd(true);
          reset();
          setId("");
          setImageFile();
          isClose();
        })
        .catch(function (error) {
          toggleBlur();
          toast.error("Thêm thất bại !");
        });
    } else toast.error("Bạn chưa thêm hình !");
  };

  return (
    <>
      {data &&
        returnModal(
          cost,
          setCost,
          data,
          title,
          count,
          description,
          setTitle,
          setCount,
          setDescription,
          isOpen,
          isClose,
          dispatch,
          startDate,
          setStartDate,
          endDate,
          setEndDate
        )}
      {sale === "add" &&
        returnModalAdd(
          isOpen,
          isClose,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          handleSelectFile,
          handleSubmit,
          onSubmit,
          control,
          errors,
          image,
          setImage,
          id,
          add,
          setData,
          setId,
          setAdd,
          reset,
          handleSubmitImage,
          onSubmitImage,
          imageRegister,
          setImageFile
        )}
    </>
  );
}

function returnModal(
  cost,
  setCost,
  data,
  title,
  count,
  description,
  setTitle,
  setCount,
  setDescription,
  isOpen,
  isClose,
  dispatch,
  startDate,
  setStartDate,
  endDate,
  setEndDate
) {
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const payload = {
      makm: data.makm,
      giatrigiam: parseInt(cost),
      mota: description,
      ngaybd: startDate,
      ngaykt: endDate,
      soluong: parseInt(count),
      tieude: title,
    };
    const res = saleApi.changeInfoSale(payload);
    res
      .then(function (response) {
        toast.success("Đã cập nhật thông tin khuyến mãi !");
        dispatch(fetchSale());
      })
      .catch(function (err) {
        toast.error("Cập nhật thất bại !");
      });
  };
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <BlurLoading />
        <form onSubmit={handleSubmitUpdate}>
          <h1 className="modal-title">KHUYẾN MÃI</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin khuyến mãi</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Tiêu đề"
                    variant="filled"
                    placeholder="Nhập tiêu đề..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                  />
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
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
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
                      minDate={new Date().setDate(
                        new Date(startDate).getDate() + 1
                      )}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          id="filled-basic"
                          variant="filled"
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Số lượng"
                    variant="filled"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Giá trị giảm (%)"
                    variant="filled"
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      aria-label="Mô tả"
                      placeholder="Nhâp mô tả"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                <Grid item xs={8}>
                  <ColorButton variant="contained" type="submit">
                    Cập nhật khuyến mãi
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <ColorButtonRed
                    variant="contained"
                    type="button"
                    onClick={isClose}
                  >
                    Thoát
                  </ColorButtonRed>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
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
  handleSelectFile,
  handleSubmit,
  onSubmit,
  control,
  errors,
  image,
  setImage,
  id,
  add,
  setData,
  setId,
  setAdd,
  reset,
  handleSubmitImage,
  onSubmitImage,
  imageRegister,
  setImageFile
) {
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={() => {
        setData(null);
        setStartDate(null);
        setEndDate(null);
        setImage("");
        setId("");
        setAdd(true);
        setImageFile();
        reset();
        isClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <BlurLoading />
        <h1 className="modal-title">KHUYẾN MÃI</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin khuyến mãi</h2>
          <hr className="modal-divider" />
          <form key={1} onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-form">
              <Grid container spacing={2}>
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
                        minRows={5}
                        maxRows={5}
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
                <Grid item xs={12}>
                  {add && (
                    <ColorButton variant="contained" type="submit">
                      Thêm thông tin khuyến mãi
                    </ColorButton>
                  )}
                </Grid>
              </Grid>
            </div>
          </form>
          <h2 className="modal-subtitle">Hình ảnh khuyến mãi</h2>
          <hr className="modal-divider" />
          <form key={2} onSubmit={handleSubmitImage(onSubmitImage)}>
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {image ? (
                    <img
                      src={image}
                      style={{ width: "300px", height: "200px" }}
                    />
                  ) : (
                    <img
                      src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
                      style={{ width: "300px", height: "200px" }}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  <h1 className="image-id">
                    Mã khuyến mãi:
                    <input type="text" className="image-id-code" value={id} />
                  </h1>
                  <label className="add-image-label">
                    + Thêm hình
                    <br />
                    <input
                      type="file"
                      className="input-select-image"
                      name="images"
                      onChange={handleSelectFile}
                      accept="image/png,image/jpeg,image/webp"
                    />
                  </label>
                  <button
                    className="reset-btn"
                    onClick={() => {
                      setImage("");
                    }}
                  >
                    Reset
                  </button>
                </Grid>
                <Grid item xs={12}>
                  {id && (
                    <ColorButton variant="contained" type="submit">
                      Thêm hình
                    </ColorButton>
                  )}
                </Grid>
              </Grid>
            </div>
          </form>
          <Grid item xs={12}>
            <ColorButtonRed
              variant="contained"
              onClick={() => {
                setData(null);
                setStartDate(null);
                setEndDate(null);
                setImage("");
                setAdd(true);
                reset();
                setId("");
                setImageFile();
                isClose();
              }}
            >
              Thoát
            </ColorButtonRed>
          </Grid>
        </div>
      </Box>
    </Modal>
  );
}
