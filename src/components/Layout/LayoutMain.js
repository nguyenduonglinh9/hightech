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
import { CgBell } from "react-icons/cg";
import { FiChevronDown, FiEdit } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import jwt_decode from "jwt-decode";
import {
  FiShoppingBag,
  FiLayers,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

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
              <p className={clsx(cx("title"))}>Manager</p>
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
                    <FiShoppingBag />
                    <span style={{ pointerEvents: "none" }}>Products</span>
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
                    <FiLayers />
                    <span>Categorys</span>
                  </div>
                </li>
              </Link>
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
                    <FiUsers />
                    <span>Users</span>
                  </div>
                </li>
              </Link>
              <li>
                <div
                  style={{ pointerEvents: "none" }}
                  className={clsx(cx("bodyNav_group"))}
                >
                  <FaRocketchat />
                  <span>Chat</span>
                </div>
              </li>
              <Link style={{ textDecoration: "none", color: "white" }}>
                <p className={clsx(cx("title"))}>Orders</p>
                <li>
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FiShoppingCart />
                    <span>Orders</span>
                  </div>
                </li>
              </Link>

              <Link style={{ textDecoration: "none", color: "white" }}>
                <p className={clsx(cx("title"))}>Chart</p>
                <li>
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FaChartLine />
                    <span>Turnover</span>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          {/* <div onClick={handleLogout} className={clsx(cx("logout"))}>
            <p>THOÁT</p>
          </div> */}
        </div>
        <div
          className={clsx(cx("content"), {
            [styles.asideNavActive2]: menu,
          })}
        >
          <div onClick={handleToggleOff} className={clsx(cx("header"))}>
            <BsList
              style={{
                width: "23px",
                height: "23px",
                color: "rgb(3,201,215)",
                alignSelf: "center",
              }}
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
            <div className={clsx(cx("user"))}>
              <CgBell
                style={{
                  width: "23px",
                  height: "23px",
                  color: "rgb(3,201,215)",
                  margin: "0px 12px",
                }}
              />

              <div
                onClick={(e) => handleToggleOn(e)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
                  style={{
                    width: "30px",
                    height: "30px",
                    // backgroundColor: "#5041bc",
                    borderRadius: "50%",
                    margin: "0px",
                  }}
                ></img>
                <p
                  style={{
                    margin: "0px 12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Hi,<p>{Decode_token.fullname}</p>
                </p>
                <FiChevronDown
                  style={{ width: "14px", height: "14px", color: "#9ca3af" }}
                />
              </div>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className={clsx(cx("user-option"), {
                [styles.userOptionActive]: toggleUserOption,
              })}
            >
              <div className={clsx(cx("user-option-header"))}>
                <p>User Profile</p>
                <div
                  onClick={() => setToggleUserOption(false)}
                  className={clsx(cx("user-option-header-button-close"))}
                >
                  <IoIosCloseCircleOutline
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
              </div>
              <div className={clsx(cx("user-option-body"))}>
                <img
                  style={{
                    backgroundColor: "#5041bc",
                    borderRadius: "50%",
                  }}
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                ></img>
                <div style={{ marginRight: "48px" }}>
                  <p>{Decode_token.fullname}</p>
                  <p>{Decode_token.role}</p>
                  <p>{Decode_token.email}</p>
                </div>
              </div>
              <div className={clsx(cx("user-option-body2"))}>
                <div className={clsx(cx("user-option-header-button-profile"))}>
                  <FiEdit
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "rgb(3,201,215)",
                    }}
                  />
                </div>
                <div className={clsx(cx("user-option-header-button-profile2"))}>
                  <p>My Profile</p>
                  <p>Account Settings</p>
                </div>
              </div>
              <div className={clsx(cx("user-option-footer"))}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
          <div style={{ height: "100%" }} onClick={handleToggleOff}>
            {children}
          </div>
        </div>
      </div>
    </DataSearchContext.Provider>
  );
}

export default LayoutMain;
