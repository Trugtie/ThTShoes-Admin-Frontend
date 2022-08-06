import toast from "react-hot-toast";
import { API_URL } from "../api/constants";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;

export function connect() {
  var socket = new SockJS(`${API_URL}/thtshoesws`);
  stompClient = over(socket);
  // stompClient.connect({}, function (frame) {
  //   console.log("Connected: " + frame);
  //   stompClient.subscribe("/thongbao/donhang", function (res) {
  //     showToast(JSON.parse(res.body));
  //   });
  // });
}

export function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}

function showToast(message) {
  toast.success(message);
}
