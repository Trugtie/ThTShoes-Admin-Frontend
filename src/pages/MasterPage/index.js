import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.scss";
import Nav from "../../components/Nav";
import Slider from "../../components/Slider";
import $ from "jquery";
import StaffManagement from "../StaffManagement";
import CustomerManagement from "../CustomerManagement";
import OrderManageMent from "../OrderManagement";
import { Toaster } from "react-hot-toast";
import ProductManageMent from "../ProductManagement";
import SaleManagement from "../SaleManagement";
import BlurLoading from "../../components/BlurLoading";

function MasterPage() {
  const handleMenu = () => {
    $(".Nav-layout").toggleClass("hide");
    $(".Container-layout").toggleClass("long");
    $(".nav-container").toggleClass("slide-left");
    $(".nav-toggle").toggleClass("slice-btn");
  };

  let location = useLocation();
  const [title, setTitle] = useState("Quản lý khách hàng");

  useEffect(() => {
    switch (location.pathname) {
      case "/staffmanagement":
        setTitle("Quản lý nhân viên");
        break;
      case "/customermanagement":
        setTitle("Quản lý khách hàng");
        break;
      case "/productmanagement":
        setTitle("Quản lý sản phẩm");
        break;
      case "/ordermanagement":
        setTitle("Quản lý đơn hàng");
        break;
      case "/salemanagement":
        setTitle("Quản lý khuyến mãi");
        break;
      default:
    }
  }, [location]);

  return (
    <div className="MasterPage-container">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            color: "#fff",
            width: "250px",
            height: "auto",
            fontSize: "1.1rem",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: "rgb(56, 142, 60)",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "rgb(211, 47, 47)",
            },
          },
        }}
      />
      <BlurLoading />
      <div className="Nav-layout">
        <Nav />
      </div>
      <div className="Container-layout">
        <div className="Slider-layout">
          <Slider handle={handleMenu} title={title} />
        </div>
        <div className="Content-layout">
          <Routes>
            <Route path="/" element={<CustomerManagement />} />
            <Route path="/staffmanagement" element={<StaffManagement />} />
            <Route
              path="/customermanagement"
              element={<CustomerManagement />}
            />
            <Route path="/ordermanagement" element={<OrderManageMent />} />
            <Route path="/productmanagement" element={<ProductManageMent />} />
            <Route path="/salemanagement" element={<SaleManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MasterPage;
