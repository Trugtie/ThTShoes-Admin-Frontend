import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ColorButton, ColorButtonRed, style } from "../Styles";
import toast from "react-hot-toast";
import productApi from "../../../api/productApi";
import { fetchShoes } from "../../Tables/ShoeTable/shoesSlice";
import { useDispatch } from "react-redux";

export default function ImageModal({ id, isOpen, isClose, closeAdd }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [urlSelectedImages, setUrlSelectedImages] = useState([]);

  //image list
  const onSelectedFiles = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesUrl = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(selectedFilesArray);
    setUrlSelectedImages(imagesUrl);
  };

  //image avatar
  const handleSelectFile = (e) => {
    const imageSelected = e.target.files[0];
    const imageURL = URL.createObjectURL(imageSelected);
    setImage(imageURL);
    setImageFile(imageSelected);
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();

    console.log(selectedImages);
    if (image.length > 0 && selectedImages.length > 0) {
      let formData = new FormData();
      formData.append("masp", id);
      formData.append("avatar", imageFile);
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("listImage", selectedImages[i]);
      }
      const res = productApi.addImage(formData);
      res
        .then(function (response) {
          dispatch(fetchShoes());
          toast.success(`Đã thêm hình cho ${id} ! `);
          isClose();
          closeAdd();
        })
        .catch(function (error) {
          toast.error("Thêm thất bại !");
        });
    } else toast.error("Bạn chưa thêm hình !");
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
        <h1 className="modal-title">Hình</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Hình đại diện</h2>
          <hr className="modal-divider" />
          <form onSubmit={handleSubmitImage}>
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
                    Mã sản phẩm:
                    <input
                      type="text"
                      className="image-id-code"
                      value={id}
                      readOnly
                    />
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
                    type="button"
                    className="reset-btn"
                    onClick={() => {
                      setImage("");
                    }}
                  >
                    Reset
                  </button>
                </Grid>
              </Grid>
            </div>
            <h2 className="modal-subtitle">Hình minh họa</h2>
            <hr className="modal-divider" />
            <div className="modal-form modal-form--detail">
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <label className="add-image-label">
                    + Thêm hình
                    <br />
                    <input
                      type="file"
                      className="input-select-image"
                      name="images"
                      title=" "
                      id="mutiple"
                      multiple
                      onChange={onSelectedFiles}
                      accept="image/png,image/jpeg,image/webp"
                      style={{
                        color: "transparent",
                        width: "7rem",
                      }}
                    />
                    {selectedImages.length > 0
                      ? `${selectedImages.length} ảnh đã được chọn`
                      : `Không có ảnh nào được chọn`}
                  </label>
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={() => {
                      setSelectedImages([]);
                      setUrlSelectedImages([]);
                      document.getElementById("mutiple").value = "";
                    }}
                  >
                    Reset
                  </button>
                </Grid>
                <Grid item xs={12}>
                  {urlSelectedImages.length > 0 ? (
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        maxHeight: "450px",
                        overflowY: "auto",
                        border: "1px dashed black",
                        marginTop: ".3rem",
                        paddingRight: "1rem",
                        paddingBottom: "1rem",
                      }}
                    >
                      {urlSelectedImages.map((item, index) => {
                        return (
                          <Grid item xs={4} sx={{ position: "relative" }}>
                            <img
                              src={item}
                              style={{ width: "100%", height: "200px" }}
                            />
                            <button
                              type="button"
                              className="image-del"
                              onClick={() => {
                                setUrlSelectedImages(
                                  urlSelectedImages.filter((e) => e !== item)
                                );
                                const newSeletedArray = selectedImages;
                                newSeletedArray.splice(index, 1);
                                setSelectedImages(newSeletedArray);
                              }}
                            >
                              x
                            </button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        height: "250px",
                        border: "1px dashed black",
                        marginTop: ".3rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "2rem",
                        color: "#747474",
                      }}
                    >
                      <img
                        src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
                        style={{ width: "150px", height: "150px" }}
                      />
                      Danh sách hình ảnh
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <ColorButton variant="contained" type="submit">
                    Thêm hình
                  </ColorButton>
                </Grid>
                <Grid item xs={6}>
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
          </form>
        </div>
      </Box>
    </Modal>
  );
}
