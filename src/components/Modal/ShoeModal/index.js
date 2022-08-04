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
import { fetchShoes } from "../../Tables/ShoeTable/shoesSlice";
import SizeTable from "../../Tables/SizeTable";
import ActionsTable from "../../Tables/ActionTable";

export default function ShoeModal({ shoe, isOpen, isClose }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [model, setModel] = useState("");
  const [weight, setWeight] = useState("");
  const [loai, setLoai] = useState("");
  const [hang, setHang] = useState("");
  const [size, setSize] = useState("");
  const [sizeName, setSizeName] = useState({});
  const [color, setColor] = useState("");
  const [colorName, setColorName] = useState({});
  const [count, setCount] = useState("");
  const [danhMuc, setDanhMuc] = useState("");
  const [sizeList, setSizeList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [cateList, setCateList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  async function getById() {
    const result = await productApi.getShoeById(shoe.magiay);
    setData(result);
    setName(result.tengiay);
    setPrice(result.gia);
    setDescription(result.mota);
    setMaterial(result.chatlieu);
    setModel(result.kieudang);
    setWeight(result.trongluong);
    setLoai(result.loaigiay.maloaigiay);
    setHang(result.hang.mahang);
    setDanhMuc(result.danhmuc.madm);
  }

  useLayoutEffect(() => {
    async function getAllType() {
      const result = await productApi.getAllLoaiGiay();
      setTypeList(result.loaiGiays);
    }
    async function getAllCate() {
      const result = await productApi.getAllDanhMuc();
      setCateList(result.danhmucs);
    }
    async function getAllSize() {
      const result = await productApi.getAllSize();
      setSizeList(result.sizes);
    }
    async function getAllColor() {
      const result = await productApi.getAllMau();
      setColorList(result.mausacs);
    }
    async function getAllLabel() {
      const result = await productApi.getAllHang();
      setLabelList(result.hangs);
    }
    getById();
    getAllType();
    getAllCate();
    getAllSize();
    getAllColor();
    getAllLabel();
    return () => {
      setData(null);
    };
  }, [shoe]);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      {data &&
        returnModal(
          getById,
          dispatch,
          isOpen,
          isClose,
          loai,
          hang,
          danhMuc,
          size,
          color,
          sizeName,
          colorName,
          count,
          name,
          price,
          description,
          material,
          model,
          weight,
          openModal,
          id,
          setId,
          setOpenModal,
          handleCloseModal,
          setName,
          setPrice,
          setDescription,
          setMaterial,
          setModel,
          setWeight,
          setCount,
          setSize,
          setColor,
          setSizeName,
          setColorName,
          setLoai,
          setHang,
          setDanhMuc,
          sizeList,
          typeList,
          cateList,
          colorList,
          labelList,
          selectedList,
          setSelectedList,
          data
        )}
      {shoe === "add" &&
        returnModalAdd(
          dispatch,
          isOpen,
          isClose,
          loai,
          hang,
          danhMuc,
          size,
          color,
          sizeName,
          colorName,
          count,
          name,
          price,
          description,
          material,
          model,
          weight,
          openModal,
          id,
          setId,
          setOpenModal,
          handleCloseModal,
          setName,
          setPrice,
          setDescription,
          setMaterial,
          setModel,
          setWeight,
          setCount,
          setSize,
          setColor,
          setSizeName,
          setColorName,
          setLoai,
          setHang,
          setDanhMuc,
          sizeList,
          typeList,
          cateList,
          colorList,
          labelList,
          selectedList,
          setSelectedList
        )}
    </>
  );
}

function returnModalAdd(
  dispatch,
  isOpen,
  isClose,
  loai,
  hang,
  danhMuc,
  size,
  color,
  sizeName,
  colorName,
  count,
  name,
  price,
  description,
  material,
  model,
  weight,
  openModal,
  id,
  setId,
  setOpenModal,
  handleCloseModal,
  setName,
  setPrice,
  setDescription,
  setMaterial,
  setModel,
  setWeight,
  setCount,
  setSize,
  setColor,
  setSizeName,
  setColorName,
  setLoai,
  setHang,
  setDanhMuc,
  sizeList,
  typeList,
  cateList,
  colorList,
  labelList,
  selectedList,
  setSelectedList
) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedList.length === 0) {
      toast.error("Chưa thêm size!");
    } else {
      const payload = {
        chatlieu: material,
        gia: parseInt(price),
        kieudang: model,
        mota: description,
        tengiay: name,
        trongluong: parseInt(weight),
        maLoaiGiay: loai,
        maHang: hang,
        maDanhMuc: danhMuc,
        sizeMaus: selectedList,
      };
      const res = productApi.addShoe(payload);
      res
        .then(function (response) {
          toast.success("Đã thêm thông tin giày, hãy thêm hình!");
          dispatch(fetchShoes());
          setId(response.data);
          setOpenModal(true);
        })
        .catch(function (error) {
          toast.error("Thêm thất bại");
        });
    }
  };
  const handleAddSize = () => {
    if (size.length > 0 && color.length > 0 && count.length > 0) {
      const item = {
        masize: size,
        tensize: sizeName.tensize,
        mamau: color,
        tenmau: colorName.tenmau,
        soluong: parseInt(count),
      };
      if (
        selectedList.findIndex((item) => {
          return item.masize === size && item.mamau === color;
        }) === -1
      )
        setSelectedList([...selectedList, item]);
      setSize("");
      setColor("");
      setCount("");
    }
  };
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={() => {
        setName("");
        setPrice("");
        setDescription("");
        setMaterial("");
        setModel("");
        setWeight("");
        setLoai("");
        setHang("");
        setDanhMuc("");
        setSize("");
        setColor("");
        setCount("");
        setSizeName({});
        setColorName({});
        setSelectedList([]);
        isClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <h1 className="modal-title">GIÀY</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin giày</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên giày"
                    variant="filled"
                    placeholder="Nhập tên giày..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
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
                <Grid item xs={12}>
                  <TextareaAutosize
                    required
                    aria-label="Mô tả"
                    placeholder="Nhập mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={2}
                    maxRows={2}
                    style={{
                      width: "100%",
                      background: "#ece8e5",
                      border: "none",
                      padding: "1rem",
                      fontSize: "1rem",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Chất liệu"
                    variant="filled"
                    placeholder="Nhập chất liệu..."
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Kiểu dáng"
                    variant="filled"
                    placeholder="Nhập kiểu dáng..."
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    required
                    id="filled-basic"
                    label="Trọng lượng"
                    variant="filled"
                    placeholder="Nhập trọng lượng..."
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Loại giày
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
                          <MenuItem key={index} value={item.maloaigiay}>
                            {item.tenloai}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Hãng
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={hang}
                      onChange={(e) => setHang(e.target.value)}
                    >
                      {labelList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.mahang}>
                            {item.tenhang}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Danh mục
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={danhMuc}
                      onChange={(e) => setDanhMuc(e.target.value)}
                    >
                      {cateList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.madm}>
                            {item.tendanhmuc}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <h2 className="modal-subtitle">Thông tin size</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Size
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                        setSizeName(
                          sizeList.find(
                            (item) => item.masize === e.target.value
                          )
                        );
                      }}
                    >
                      {sizeList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.masize}>
                            {item.tensize}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Màu sắc
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={color}
                      onChange={(e) => {
                        setColor(e.target.value);
                        setColorName(
                          colorList.find(
                            (item) => item.mamau === e.target.value
                          )
                        );
                      }}
                    >
                      {colorList.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.mamau}>
                            {item.tenmau}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
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
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={handleAddSize}
                  >
                    THÊM
                  </button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: "1rem",
                    height: "180px",
                    background: "rgb(236, 232, 229)",
                    overflowY: "auto",
                    paddingRight: "16px",
                  }}
                >
                  <h1 className="size-header">Danh sách size:</h1>
                  <ul className="size-list">
                    {selectedList.map((item, index) => {
                      return (
                        <li className="size-item" key={index}>
                          <span>
                            Size: {item.tensize} | Màu: {item.tenmau} | Số
                            lượng: {item.soluong}
                          </span>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              setSelectedList(
                                selectedList.filter((item, key) => {
                                  return key !== index;
                                })
                              );
                            }}
                          >
                            <DeleteIcon sx={{ color: "white" }} />
                          </IconButton>
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: ".5rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained" type="submit">
                    Thêm thông tin giày
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <ColorButtonRed
                    variant="contained"
                    onClick={() => {
                      setName("");
                      setPrice("");
                      setDescription("");
                      setMaterial("");
                      setModel("");
                      setWeight("");
                      setLoai("");
                      setHang("");
                      setDanhMuc("");
                      setSize("");
                      setColor("");
                      setCount("");
                      setSizeName({});
                      setColorName({});
                      setSelectedList([]);
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
  getById,
  dispatch,
  isOpen,
  isClose,
  loai,
  hang,
  danhMuc,
  size,
  color,
  sizeName,
  colorName,
  count,
  name,
  price,
  description,
  material,
  model,
  weight,
  openModal,
  id,
  setId,
  setOpenModal,
  handleCloseModal,
  setName,
  setPrice,
  setDescription,
  setMaterial,
  setModel,
  setWeight,
  setCount,
  setSize,
  setColor,
  setSizeName,
  setColorName,
  setLoai,
  setHang,
  setDanhMuc,
  sizeList,
  typeList,
  cateList,
  colorList,
  labelList,
  selectedList,
  setSelectedList,
  data
) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      magiay: data.magiay,
      chatlieu: material,
      gia: parseInt(price),
      kieudang: model,
      mota: description,
      tengiay: name,
      trongluong: parseInt(weight),
    };
    const res = productApi.changeInfoShoes(payload);
    res
      .then(function (response) {
        toast.success("Đã cập nhật thông tin giày");
        dispatch(fetchShoes());
      })
      .catch(function (error) {
        toast.error("Cập nhật thất bại");
      });
  };

  const handleChangeType = (e) => {
    const payload = {
      id: data.magiay,
      data: {
        loaigiay: {
          maloaigiay: e.target.value,
        },
        hang: {
          mahang: hang,
        },
        danhmuc: {
          madm: danhMuc,
        },
      },
    };
    const res = productApi.changeTypeLabelCate(payload);
    res
      .then(function (response) {
        toast.success("Đã cập nhật loại giày");
        setLoai(e.target.value);
      })
      .catch(function (err) {
        toast.error("Cập nhật loại giày thất bại");
      });
  };
  const handleChangeLabel = (e) => {
    const payload = {
      id: data.magiay,
      data: {
        loaigiay: {
          maloaigiay: loai,
        },
        hang: {
          mahang: e.target.value,
        },
        danhmuc: {
          madm: danhMuc,
        },
      },
    };
    const res = productApi.changeTypeLabelCate(payload);
    res
      .then(function (response) {
        toast.success("Đã cập nhật hãng");
        setHang(e.target.value);
      })
      .catch(function (err) {
        toast.error("Cập nhật hãng thất bại");
      });
  };
  const handleChangeCate = (e) => {
    const payload = {
      id: data.magiay,
      data: {
        loaigiay: {
          maloaigiay: loai,
        },
        hang: {
          mahang: hang,
        },
        danhmuc: {
          madm: e.target.value,
        },
      },
    };
    const res = productApi.changeTypeLabelCate(payload);
    res
      .then(function (response) {
        toast.success("Đã cập nhật danh mục");
        setDanhMuc(e.target.value);
      })
      .catch(function (err) {
        toast.error("Cập nhật danh mục thất bại");
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
        <h1 className="modal-title">GIÀY</h1>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <h2 className="modal-subtitle">Thông tin giày</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên giày"
                    variant="filled"
                    placeholder="Nhập tên giày..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
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
                <Grid item xs={12}>
                  <TextareaAutosize
                    required
                    aria-label="Mô tả"
                    placeholder="Nhập mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={2}
                    maxRows={2}
                    style={{
                      width: "100%",
                      background: "#ece8e5",
                      border: "none",
                      padding: "1rem",
                      fontSize: "1rem",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Chất liệu"
                    variant="filled"
                    placeholder="Nhập chất liệu..."
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Kiểu dáng"
                    variant="filled"
                    placeholder="Nhập kiểu dáng..."
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    required
                    id="filled-basic"
                    label="Trọng lượng"
                    variant="filled"
                    placeholder="Nhập trọng lượng..."
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <ColorButton variant="contained" type="submit">
                    Cập nhật thông tin giày
                  </ColorButton>
                </Grid>
              </Grid>
            </div>
          </form>
          <h2 className="modal-subtitle" style={{ marginTop: ".5rem" }}>
            Sửa loại, hãng, danh mục
          </h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: ".5rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Loại giày
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={loai}
                    onChange={handleChangeType}
                  >
                    {typeList.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.maloaigiay}>
                          {item.tenloai}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Hãng
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={hang}
                    onChange={handleChangeLabel}
                  >
                    {labelList.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.mahang}>
                          {item.tenhang}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Danh mục
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={danhMuc}
                    onChange={handleChangeCate}
                  >
                    {cateList.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.madm}>
                          {item.tendanhmuc}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <h2 className="modal-subtitle">Thông tin size</h2>
          <hr className="modal-divider" />
          <div className="modal-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SizeTable
                  dataList={data.giaySizeMau}
                  colorList={colorList}
                  sizeList={sizeList}
                  id={data.magiay}
                  reset={getById}
                />
              </Grid>
              <Grid item xs={12}>
                <ActionsTable actions={data.soluonggiay} />
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: ".5rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
      </Box>
    </Modal>
  );
}
