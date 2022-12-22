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
  BsGift,
  BsNewspaper,
} from "react-icons/bs";
import { useRef, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { FaSearch } from "react-icons/fa";
import { CgBell } from "react-icons/cg";
import { FiChevronDown, FiEdit } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import jwt_decode from "jwt-decode";
import { BiLibrary } from "react-icons/bi";
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
  let dollarUSLocale = Intl.NumberFormat("en-US");
  
  AOS.init();

   const mqtt = require("mqtt");
   const url = "ws://test.mosquitto.org:8080";
   const options = {
     debug: true,
     // Clean session
     clean: true,
     connectTimeout: 30000,
     // Auth
     clientId: "Hightech cms",
     username: "test",
     password: "123456",
   };
   const client = mqtt.connect(url, options);
   console.log("Hello");
   client.on("connect", function () {
     client.subscribe("highttech-topic", function (err) {
       if (!err) {
         console.log("thanh cong");
       }
     });
   });

   client.on("message", function (topic, message) {
     // message is Buffer
     console.log(message.toString());
     client.end();
   });

  const [toggleUserOption, setToggleUserOption] = useState(false);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetch(`http://quyt.ddns.net:3000/product/?all=true&title=/${search}/i`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (search !== "") {
          setSearchResult((prev) => [...res.data]);
        } else {
          setSearchResult([]);
        }
      });
  }, [search]);
  console.log(searchResult);

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
    localStorage.setItem("isLogin", JSON.stringify({ isLoggin: false }));
    navigate("/");
  };
  const HandleDetail = (id) => {
    navigate("/detail-product", { state: { id: id } });
    setSearchResult([]);
    setSearch("");
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
              <p className={clsx(cx("title"))}>Quản Lý</p>
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
                    <span style={{ pointerEvents: "none" }}>Sản Phẩm</span>
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
                    <span>Danh Mục</span>
                  </div>
                </li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/brand"
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/brand"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <BiLibrary />
                    <span>Thương Hiệu</span>
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
                    <span>Quản Trị Viên</span>
                  </div>
                </li>
              </Link>
              <Link
                to="/coupon"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/coupon"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <BsGift />
                    <span>Phiếu mua hàng</span>
                  </div>
                </li>
              </Link>
              <Link
                to="/banner"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/banner"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <BsNewspaper />
                    <span>Banner</span>
                  </div>
                </li>
              </Link>
              <Link
                to="/orders"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p className={clsx(cx("title"))}>Đơn Hàng</p>
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/orders"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FiShoppingCart />
                    <span>Đơn Hàng</span>
                  </div>
                </li>
              </Link>
              <p className={clsx(cx("title"))}>Tổng Kết</p>
              {/* <Link
                to="/products-sold"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href ===
                      "http://localhost:3000/products-sold"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FaChartLine />
                    <span>Sản Phẩm Đã Bán</span>
                  </div>
                </li>
              </Link> */}
              <Link
                to="/revuene"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  className={clsx({
                    [styles.active]:
                      window.location.href === "http://localhost:3000/revuene"
                        ? true
                        : false,
                  })}
                >
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FaChartLine />
                    <span>Doanh Thu</span>
                  </div>
                </li>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }}>
                <li>
                  <div
                    style={{ pointerEvents: "none" }}
                    className={clsx(cx("bodyNav_group"))}
                  >
                    <FaChartLine />
                    <span>Người Dùng</span>
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
                  <FaSearch style={{ color: "rgb(3,201,215)" }} />
                </div>

                <div className={clsx(cx("header-result"))}>
                  {searchResult.map((item, index) => {
                    return (
                      <div
                        onClick={() => HandleDetail(item._id)}
                        className={clsx(cx("header-result-item"))}
                      >
                        <img src={item.images[0]}></img>
                        <div>
                          <p>{item.title}</p>
                          <p>{dollarUSLocale.format(item.costPrice)}</p>
                        </div>
                      </div>
                    );
                  })}
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
                  Xin chào,<p>{Decode_token.fullname}</p>
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
                <p>Hồ Sơ Người Dùng</p>
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
                <div
                  onClick={() => {
                    navigate("/account");
                    setToggleUserOption(false);
                  }}
                  className={clsx(cx("user-option-header-button-profile2"))}
                >
                  <p>Hồ Sơ Của Tôi</p>
                  <p>Cài Đặt</p>
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
