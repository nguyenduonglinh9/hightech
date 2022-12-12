import styles from "./Login.module.scss";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import emailjs from "@emailjs/browser";
import { FcCheckmark } from "react-icons/fc";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
const imgCheck = require('../Login/assets/fonts/img/check.png');
const imgCancel = require("../Login/assets/fonts/img/cancel.png");



function Login() {

  // if (JSON.parse(localStorage.getItem("data")).isLoggin == true)
  // {
  //   navigate("/product");
  // }
  
  
  const cx = classNames.bind(styles);
  let navigate = useNavigate();

  const refModal = useRef();
  const refLogin = useRef();
  const refUsername = useRef();
  const refPassword = useRef()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  // tippy(refUsername.current, {
  //   content: "Không được bỏ trống",
  // });


  const handleLogin = () => {
    refModal.current.innerHTML = `
    <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

    </div>
    `;
    setToggleModal(true);
    fetch("http://quyt.ddns.net:3000/access/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.code == 200) {
          refModal.current.innerHTML = `
          <div style="animation:none">
            <img style="width:50px;height:50px" src="${imgCheck}"></img>
            <h2>Successful login</h2>
          </div>
          `;
          setTimeout(() => {
            navigate('/product');
          }, 2000)
          localStorage.setItem(
            "DataLogin",
            JSON.stringify({
              token: data.data.token,
              isLogin: true
            })
          );
          localStorage.setItem(
            "isLogin",
            JSON.stringify({
              isLogin: true,
            })
          );
        }
        else {
          refModal.current.innerHTML = `
          <div style="animation:none">
            <img style="width:50px;height:50px" src="${imgCancel}"></img>
            <h2>${data.message}</h2>
            <button style="padding:10px 20px;border:none;border-radius:10px";>Retry</button>
          </div>
          `;
          refModal.current.children[0].children[2].addEventListener('click', () => {
            setToggleModal(false)
          })

          localStorage.setItem(
            "isLogin",
            JSON.stringify({
              isLogin: false,
            })
          );
        }
      });
  };

  return (
    <>
      <div ref={refLogin} className={clsx(styles.container)}>
        <div className={clsx(styles.container_circe_1)}></div>
        <div className={clsx(styles.container_circe_2)}></div>
        <div className={clsx(styles.box)}>
          <div className={clsx(styles.content)}>
            <div className={clsx(styles.header_content)}>
              <h3 className={clsx(styles.header_content_title)}>HIGHTECH</h3>
              <h3>NO_TEXT</h3>
            </div>
            <div className={clsx(styles.body_content)}>
              <img src={require("./assets/fonts/img/img_3d_2.png")}></img>
              <img src={require("./assets/fonts/img/img_3d_3.png")}></img>
              <img src={require("./assets/fonts/img/img_3d_4.png")}></img>
              <img src={require("./assets/fonts/img/img_3d_5.png")}></img>
              <div className={clsx(styles.body_content_left)}>
                <img src={require("./assets/fonts/img/img_3d_1.png")}></img>
              </div>
              <div className={clsx(styles.body_content_right)}>
                <div className={clsx(styles.body_content_right_header)}>
                  <h2>WELLCOME TO HIGHTECH</h2>
                  <p>Login To Continue</p>
                </div>
                <div className={clsx(styles.body_content_right_body)}>
                  <form className={clsx(styles.body_content_right_body_form)}>
                    <div
                      className={clsx(
                        styles.body_content_right_body_form_input
                      )}
                    >
                      <Tippy content="Must not be vacant">
                        <input
                          ref={refUsername}
                          type="text"
                          placeholder=" "
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        ></input>
                      </Tippy>
                      <label>Username</label>
                    </div>
                    <div
                      className={clsx(
                        styles.body_content_right_body_form_input
                      )}
                    >
                      <Tippy content="At least 6 characters">
                        <input
                          ref={refPassword}
                          type="password"
                          placeholder=" "
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </Tippy>
                      <label>Password</label>
                    </div>
                    <div
                      className={clsx(
                        styles.body_content_right_body_form_group_button
                      )}
                    >
                      <button type="button" onClick={handleLogin}>
                        LOGIN
                      </button>
                      <button>FORGOT PASSWORD</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setToggleModal(false)}
          className={clsx(cx("containerModal"), {
            [styles.openModal]: toggleModal,
          })}
        >
          <div
            ref={refModal}
            onClick={(e) => e.stopPropagation()}
            className={clsx(cx("modal"))}
          >
            {/* <p>{message}</p>
            {message != "success" ? (
              <button
                onClick={() => setToggleModal(false)}
                className={clsx(cx("modal_button"))}
              >
                RETRY
              </button>
            ) : (
              <div></div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
