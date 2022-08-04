import { TextField, Divider, Grid, Paper, IconButton } from "@mui/material";
import { useState } from "react";
import moment from "moment";
import "./styles.scss";
import commentApi from "../../api/commentApi";
import { toggleBlur } from "../BlurLoading";
import toast from "react-hot-toast";

export default function Comment({ data, id }) {
  const dataCopy = [...data.binhluans];
  dataCopy.reverse();
  const [type, setType] = useState("");
  const [comments, setComments] = useState(dataCopy);
  const handleComents = (e) => {
    if (e.key === "Enter") {
      setType("");
      if (type.length > 0) {
        if (localStorage.getItem("admin_access_token") === null) {
          toast.error("Bạn chưa đăng nhập!");
        } else {
          toggleBlur();
          const payload = {
            mablTraloi: data.mabl,
            mota: type,
          };
          const result = commentApi.replyComment(payload);
          result
            .then(function (response) {
              const res = commentApi.getCommentById(data.mabl);
              res.then(function (response) {
                setComments(response.binhluans.reverse());
              });
              toast.success("Bình luận thành công !");
              toggleBlur();
            })
            .catch(function (error) {
              toast.error("Bình luận thất bại !");
              toggleBlur();
            });
        }
      }
    }
  };
  const handleCommentBtn = (e) => {
    setType("");
    if (type.length > 0) {
      if (localStorage.getItem("admin_access_token") === null) {
        toast.error("Bạn chưa đăng nhập!");
      } else {
        toggleBlur();
        const payload = {
          mablTraloi: data.mabl,
          mota: type,
        };
        const result = commentApi.replyComment(payload);
        result
          .then(function (response) {
            const res = commentApi.getCommentById(data.mabl);
            res.then(function (response) {
              setComments(response.binhluans.reverse());
            });
            toast.success("Bình luận thành công !");
            toggleBlur();
          })
          .catch(function (error) {
            toast.error("Bình luận thất bại !");
            toggleBlur();
          });
      }
    }
  };

  return (
    <div className="container comment-container">
      <div className="comment-input">
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          placeholder="Nhập trả lời..."
          fullWidth
          onKeyPress={handleComents}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "hsl(214deg 100% 59%)",
                  borderRadius: ".3rem",
                  transition: "all .3s",
                  fontSize: "1.2rem",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                onClick={handleCommentBtn}
              >
                Trả lời
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="paper-comment">
        <h1>Bình luận của khách hàng</h1>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 className="user-comment-name">
              {data.khachhang.ho + " " + data.khachhang.ten}
            </h4>
            <p className="user-comment-description">{data.mota}</p>
            <p className="comment-relative-time">
              {moment(data.thoigian).fromNow()}
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <h1>Trả lời của nhân viên</h1>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        {comments.map((item) => {
          return (
            <>
              <Grid container wrap="nowrap" spacing={2} key={item.mabl}>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 className="user-comment-name">
                    Nhân viên {item.nhanvien.ho + " " + item.nhanvien.ten}
                  </h4>
                  <p className="user-comment-description">{item.mota}</p>
                  <p className="comment-relative-time">
                    {moment(item.thoigian).fromNow()}
                  </p>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </>
          );
        })}
      </div>
    </div>
  );
}
