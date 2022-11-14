import styles from "./LayoutMain.module.scss";
import clsx from "clsx";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import {
  FaSalesforce,
  FaRocketchat,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import {
  BsTvFill,
  BsFillMenuButtonWideFill,
  BsCartFill,
  BsReceiptCutoff,
  BsList,
  BsBell,
} from "react-icons/bs";
import { useRef, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { FaSearch } from "react-icons/fa";
import jwt_decode from "jwt-decode";

export const DataSearchContext = createContext();

function LayoutMain({ children }) {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const Decode_token = jwt_decode(DataLogin.token);
  const useRefActive = useRef();
  let navigate = useNavigate();
  AOS.init();

  const [toggleUserOption, setToggleUserOption] = useState(false);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);

  const handleToggleOn = (e) => {
    setToggleUserOption(true);
    e.stopPropagation();
  };
  const handleToggleOff = () => {
    setToggleUserOption(false);
  };

  const handleMenuClick = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.setItem("data", JSON.stringify({ isLoggin: false }));
    navigate("/");
  };

  return (
    <DataSearchContext.Provider value={search}>
      <div className={clsx(cx("container"))}>
        <div
          className={clsx(cx("asideNav"), {
            [styles.asideNavActive]: menu,
          })}
        >
          <div className={clsx(cx("headerLogo"))}>
            <div className={clsx(cx("headerLogo_circle1"))}></div>
            <div className={clsx(cx("headerLogo_circle2"))}></div>
            <h2>HIGHTECH</h2>
          </div>
          <div className={clsx(cx("bodyNav"))}>
            <ul>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/product"
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/product"
                        ? true
                        : false,
                  })}
                >
                  <div ref={useRefActive} className={clsx(cx("bodyNav_group"))}>
                    <BsTvFill />
                    <span style={{ pointerEvents: "none" }}>SẢN PHẨM</span>
                    <span style={{ pointerEvents: "none" }}></span>
                  </div>
                </li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/category"
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/category"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <BsFillMenuButtonWideFill />
                    <span>DANH MỤC</span>
                    <span></span>
                  </div>
                </li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/warehouse"
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/warehouse"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <BsCartFill />
                    <span>KHO HÀNG</span>
                    <span></span>
                  </div>
                </li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/promotion"
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/promotion"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FaSalesforce />
                    <span>KHUYẾN MÃI</span>
                    <span></span>
                  </div>
                </li>
              </Link>
              <li>
                <div
                  style={{ pointerEvents: "none" }}
                  className={clsx(cx("bodyNav_group"))}
                >
                  <FaRocketchat />
                  <span>CHAT</span>
                  <span></span>
                </div>
              </li>
              <li>
                <div
                  style={{ pointerEvents: "none" }}
                  className={clsx(cx("bodyNav_group"))}
                >
                  <BsReceiptCutoff />
                  <span>ĐƠN HÀNG</span>
                  <span></span>
                </div>
              </li>
              <Link
                to="/users"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/users"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FaUsers />
                    <span>USER</span>
                    <span></span>
                  </div>
                </li>
              </Link>
              <li>
                <div
                  style={{ pointerEvents: "none" }}
                  className={clsx(cx("bodyNav_group"))}
                >
                  <FaChartLine />
                  <span>DOANH THU</span>
                  <span></span>
                </div>
              </li>
            </ul>
          </div>
          <div onClick={handleLogout} className={clsx(cx("logout"))}>
            <p>THOÁT</p>
          </div>
        </div>
        <div
          className={clsx(cx("content"), {
            [styles.asideNavActive2]: menu,
          })}
        >
          <div onClick={handleToggleOff} className={clsx(cx("header"))}>
            <BsList
              style={{ width: "30px", height: "30px", color: "rgb(3,201,215)" }}
              onClick={handleMenuClick}
            />
            <form className={clsx(cx("header-from-search"))}>
              <div className={clsx(cx("header-from-search-group"))}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, price, description,..."
                  className={clsx(cx("header-from-input"))}
                ></input>
                <div className={clsx(cx("header-from-button"))}>
                  <FaSearch />
                </div>
              </div>
            </form>
            <div
              onClick={(e) => handleToggleOn(e)}
              className={clsx(cx("user"))}
            >
              <BsBell style={{ width: "20px", height: "20px" }} />
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#5041bc",
                  borderRadius: "50%",
                }}
              ></img>
            </div>
            <div
              className={clsx(cx("user-option"), {
                [styles.userOptionActive]: toggleUserOption,
              })}
            >
              <img
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#5041bc",
                  borderRadius: "50%",
                }}
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              ></img>
              <p>Hello {Decode_token.fullname}</p>
            </div>
          </div>
          <div onClick={handleToggleOff}>{children}</div>
        </div>
      </div>
    </DataSearchContext.Provider>
  );
}

export default LayoutMain;
