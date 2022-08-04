import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import productApi from "../../../api/productApi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import { ColorButton, ColorButtonRed, style } from "../Styles";
import ImageModal from "../ImageModal";
import { fetchAccessory } from "../../Tables/AccessoryTable/accessorySlice";
import ActionsTable from "../../Tables/ActionTable";

export default function AccessoryModal({ accessory, isOpen, isClose }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loai, setLoai] = useState("");
  const [count, setCount] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useLayoutEffect(() => {
    async function getById() {
      const result = await productApi.getAccessoryById(accessory.mapk);
      setData(result);
      setName(result.tenpk);
      setPrice(result.gia);
      setDescription(result.mota);
      setLoai(result.loaiPhuKien.maLoaiPhuKien);
      setCount(result.soluong);
    }
    async function getAllType() {
      const result = await productApi.getAllLoaiPK();
      setTypeList(result.loaiphukiens);
    }
    getById();
    getAllType();
    return () => {
      setData(null);
    };
  }, [accessory]);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      {data &&
        returnModal(
          dispatch,
          isOpen,
          isClose,
          loai,
          count,
          name,
          price,
          description,
          openModal,
          id,
          setId,
          setOpenModal,
          handleCloseModal,
          setName,
          setPrice,
          setDescription,
          setCount,
          setLoai,
          typeList,
          data
        )}
      {accessory === "add" &&
        returnModalAdd(
          dispatch,
          isOpen,
          isClose,
          loai,
          count,
          name,
          price,
          description,
          openModal,
          id,
          setId,
          setOpenModal,
          handleCloseModal,
          setName,
          setPrice,
          setDescription,
          setCount,
          setLoai,
          typeList
        )}
    </>
  );
}

function returnModalAdd(
  dispatch,
  isOpen,
  isClose,
  loai,
  count,
  name,
  price,
  description,
  openModal,
  id,
  setId,
  setOpenModal,
  handleCloseModal,
  setName,
  setPrice,
  setDescription,
  setCount,
  setLoai,
  typeList
) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      gia: parseInt(price),
      mota: description,
      tenpk: name,
      soluong: parseInt(count),
      maLoaiPk: loai,
    };
    const res = productApi.addPhuKien(payload);
    res
      .then(function (response) {
        toast.success("Đã thêm thông tin phụ kiện, hãy thêm hình!");
        dispatch(fetchAccessory());
        setId(response.data);
        setOpenModal(true);
      })
      .catch(function (error) {
        toast.error("Thêm thất bại");
      });
  };

  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={() => {
        setName("");
        setPrice("");
        setDescription("");
        setLoai("");
        setCount("");
        isClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <h1 className="modal-title">PHỤ KIỆN</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin phụ kiện</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên phụ kiện"
                    variant="filled"
                    placeholder="Nhập tên phụ kiện..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Loại phụ kiện
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={loai}
                      onChange={(e) => setLoai(e.target.value)}
                    >
                      {typeList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.maLoaiPhuKien}>
                            {item.tenLoaiPhuKien}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Giá"
                    type="number"
                    variant="filled"
                    placeholder="Nhập giá..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Số lượng"
                    variant="filled"
                    placeholder="Nhập số lượng..."
                    defaultValue=""
                    type="number"
                    value={count}
                    onChange={(e) => {
                      if (e.target.value <= 0) setCount("");
                      else setCount(e.target.value);
                    }}
                    fullWidth
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    required
                    aria-label="Mô tả"
                    placeholder="Nhập mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: ".5rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained" type="submit">
                    Thêm thông tin phụ kiện
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <ColorButtonRed
                    variant="contained"
                    onClick={() => {
                      setName("");
                      setPrice("");
                      setDescription("");
                      setLoai("");
                      setCount("");
                      isClose();
                    }}
                  >
                    Thoát
                  </ColorButtonRed>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
        <ImageModal
          id={id}
          isOpen={openModal}
          isClose={handleCloseModal}
          closeAdd={isClose}
        />
      </Box>
    </Modal>
  );
}

function returnModal(
  dispatch,
  isOpen,
  isClose,
  loai,
  count,
  name,
  price,
  description,
  openModal,
  id,
  setId,
  setOpenModal,
  handleCloseModal,
  setName,
  setPrice,
  setDescription,
  setCount,
  setLoai,
  typeList,
  data
) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mapk: data.mapk,
      gia: parseInt(price),
      mota: description,
      soluong: parseInt(count),
      tenpk: name,
      maLoaiPk: loai,
      motaSoLuong: "Nhập thêm",
    };
    const res = productApi.changeInfoAccessory(payload);
    res
      .then(function (response) {
        toast.success("Đã cập nhật phụ kiện!");
        dispatch(fetchAccessory());
      })
      .catch(function (error) {
        toast.error("Cập nhật thất bại");
      });
  };
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={() => {
        isClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <h1 className="modal-title">PHỤ KIỆN</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin phụ kiện</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên phụ kiện"
                    variant="filled"
                    placeholder="Nhập tên phụ kiện..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Loại phụ kiện
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={loai}
                      onChange={(e) => setLoai(e.target.value)}
                    >
                      {typeList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.maLoaiPhuKien}>
                            {item.tenLoaiPhuKien}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Giá"
                    type="number"
                    variant="filled"
                    placeholder="Nhập giá..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Số lượng"
                    variant="filled"
                    placeholder="Nhập số lượng..."
                    defaultValue=""
                    type="number"
                    value={count}
                    onChange={(e) => {
                      if (e.target.value <= 0) setCount("");
                      else setCount(e.target.value);
                    }}
                    fullWidth
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    required
                    aria-label="Mô tả"
                    placeholder="Nhập mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                </Grid>
                <Grid item xs={12}>
                  <ActionsTable actions={data.soluongphukiens} />
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: ".5rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained" type="submit">
                    Cập nhật thông tin phụ kiện
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <ColorButtonRed
                    variant="contained"
                    onClick={() => {
                      isClose();
                    }}
                  >
                    Thoát
                  </ColorButtonRed>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
        <ImageModal
          id={id}
          isOpen={openModal}
          isClose={handleCloseModal}
          closeAdd={isClose}
        />
      </Box>
    </Modal>
  );
}
