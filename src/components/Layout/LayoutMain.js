import styles from "./LayoutMain.module.css";
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
} from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

function LayoutMain({ children }) {

  const cx = classNames.bind(styles);
  const useRefActive = useRef();
  let navigate = useNavigate();

  let username = JSON.parse(localStorage.getItem('data')).username


  const handleLogout = () => {
    localStorage.setItem("data", JSON.stringify({ isLoggin : false }));
    navigate('/');
  }

  
  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("asideNav"))}>
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
            <li>
              <div
                style={{ pointerEvents: "none" }}
                className={clsx(cx("bodyNav_group"))}
              >
                <FaUsers />
                <span>USER</span>
                <span></span>
              </div>
            </li>
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
        <div className={clsx(cx("user"))}>
          <FcBusinessman
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#5041bc",
              borderRadius: "50%",
            }}
          ></FcBusinessman>
          <p>XIN CHÀO {username}</p>
        </div>
        <div onClick={handleLogout} className={clsx(cx("logout"))}>
          <p>THOÁT</p>
        </div>
      </div>
      <div className={clsx(cx("content"))}>{children}</div>
    </div>
  );
}

export default LayoutMain;
