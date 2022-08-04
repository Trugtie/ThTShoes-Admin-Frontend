import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import commentApi from "../../../api/commentApi";
import { ColorButton, style, ColorButtonRed } from "../Styles";
import Comment from "../../Comment";
import BlurLoading from '../../BlurLoading';

export default function CommentModal({ comment, isOpen, isClose }) {
  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    async function getById() {
      const result = await commentApi.getCommentById(comment.mabl);
      setData(result);
    }
    getById();
    return () => {
      setData(null);
    };
  }, [comment]);

  return <>{data && returnModal(isOpen, isClose, data)}</>;
}
function returnModal(isOpen, isClose, data) {
  return (
    <Modal
      className="modal-container"
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <BlurLoading/>
        <h1 className="modal-title">BÌNH LUẬN</h1>
        <div className="modal-content">
          <div className="modal-form" style={{ marginTop: ".3rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Comment data={data} id={data.mabl}/>
              </Grid>
              <Grid item xs={12}>
                <ColorButtonRed variant="contained" onClick={isClose}>
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
