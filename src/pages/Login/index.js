import styles from "./Login.module.scss";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import emailjs from "@emailjs/browser";
import { FcCheckmark } from "react-icons/fc";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { clear } from "@testing-library/user-event/dist/clear";
import jwt_decode from "jwt-decode";
const imgCheck = require("../Login/assets/fonts/img/check.png");
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
  const refPassword = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

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
          fetch("http://quyt.ddns.net:3000/access/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": data.data.token,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (
                (res.code == 200 && res.data.role == "superadmin") ||
                res.data.role == "admin"
              ) {
                refModal.current.innerHTML = `
          <div style="animation:none">
            <img style="width:50px;height:50px" src="${imgCheck}"></img>
            <h2>Đăng Nhập Thành Công</h2>
          </div>
          `;
                setTimeout(() => {
                  navigate("/product");
                }, 2000);
                localStorage.setItem(
                  "DataLogin",
                  JSON.stringify({
                    token: data.data.token,
                    isLogin: true,
                  })
                );
                localStorage.setItem(
                  "isLogin",
                  JSON.stringify({
                    isLogin: true,
                  })
                );

                localStorage.setItem(
                  "currentProduct",
                  JSON.stringify({
                    name: "Tất Cả",
                    id: "634f9eea3f879eb6fc81bf01",
                  })
                );
                localStorage.setItem(
                  "currentBrand",
                  JSON.stringify({
                    name: "Tất Cả",
                    id: null,
                  })
                );
              } else if (
                (res.code == 200 && res.data.role !== "superadmin") ||
                res.data.role !== "admin"
              ) {
                refModal.current.removeChild(refModal.current.children[0]);
                const h2 = document.createElement("h2");
                h2.innerText = "Thông Tin Đăng Nhập Không Đúng !";
                const button = document.createElement("button");
                const img = document.createElement("img");
                img.setAttribute("src", imgCancel);
                img.style.width = "50px";
                button.innerText = "Thử Lại";
                button.addEventListener("click", () => {
                  refModal.current.removeChild(img);
                  refModal.current.removeChild(h2);
                  refModal.current.removeChild(button);
                  setToggleModal(false);
                });
                refModal.current.appendChild(img);
                refModal.current.appendChild(h2);
                refModal.current.appendChild(button);
              } else if (res.code !== 200) {
              }
            });
        } else {
          refModal.current.removeChild(refModal.current.children[0]);
          const h2 = document.createElement("h2");
          h2.innerText = "Thông Tin Đăng Nhập Không Đúng !";
          const button = document.createElement("button");
          const img = document.createElement("img");
          img.setAttribute("src", imgCancel);
          img.style.width = "80px";
          button.innerText = "Thử Lại";
          button.addEventListener("click", () => {
            refModal.current.removeChild(img);
            refModal.current.removeChild(h2);
            refModal.current.removeChild(button);
            setToggleModal(false);
          });
          refModal.current.appendChild(img);
          refModal.current.appendChild(h2);
          refModal.current.appendChild(button);
        }
      });
  };
  const handleForgotPass = () => {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const h2 = document.createElement("h2");
    div.style.animation = "none";
    div2.style.animation = "none";
    h2.innerText = "Mời nhập email !";
    const button = document.createElement("button");
    button.textContent = "Gửi Mã";
    const button2 = document.createElement("button");
    button2.textContent = "Hủy";
    const input = document.createElement("input");
    button2.addEventListener("click", () => {
      refModal.current.removeChild(div);
      setToggleModal(false);
    });
    button.addEventListener("click", () => {
      const div3 = document.createElement("div");
      div3.style.width = "70px";
      div3.style.height = "70px";
      div3.style.border = "7px solid transparent";
      div3.style.borderTop = "7px solid rgb(3,201,215)";
      div3.style.borderRadius = "50%";
      refModal.current.removeChild(div);
      refModal.current.appendChild(div3);
      fetch("http://quyt.ddns.net:3000/access/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: input.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code == 200) {
            const div4 = document.createElement("div");
            div4.style.animation = "none";
            const h2 = document.createElement("h2");
            h2.innerText = "Đã Gửi Mã Đến Email Của Bạn !";
            const div5 = document.createElement("div");
            div5.style.animation = "none";
            const button = document.createElement("button");
            button.innerText = "Thử Lại";
            button.addEventListener("click", () => {
              refModal.current.removeChild(div4);
              refModal.current.appendChild(div);
            });
            const button2 = document.createElement("button");
            button2.innerText = "Tiếp Theo";
            button2.addEventListener("click", () => {
              const divChangePass = document.createElement("div");
              divChangePass.style.animation = "none";
              const h2 = document.createElement("h2");
              h2.innerText = "Đổi Mật Khẩu";
              const divGroup = document.createElement("div");
              divGroup.style.animation = "none";
              const divGroup2 = document.createElement("div");
              divGroup2.style.animation = "none";
              const divGroup3 = document.createElement("div");
              divGroup3.style.animation = "none";
              const divGroup4 = document.createElement("div");
              divGroup4.style.animation = "none";

              const span = document.createElement("span");
              span.textContent = "Mã Người Dùng";
              span.style.fontSize = "14px";
              const span2 = document.createElement("span");
              span2.textContent = "Mật Khẩu Mới";
              span2.style.fontSize = "14px";
              const span3 = document.createElement("span");
              span3.textContent = "Mã Bảo Mật";
              span3.style.fontSize = "14px";
              const input = document.createElement("input");
              const input2 = document.createElement("input");
              const input3 = document.createElement("input");
              const button = document.createElement("button");
              button.innerText = "Hủy";
              button.addEventListener("click", () => {
                refModal.current.removeChild(divChangePass);
                setToggleModal(false);
              });
              const button2 = document.createElement("button");
              button2.innerText = "Lưu";
              button2.addEventListener("click", () => {
                const divLoading = document.createElement("div");
                divLoading.style.width = "70px";
                divLoading.style.height = "70px";
                divLoading.style.border = "7px solid transparent";
                divLoading.style.borderTop = "7px solid rgb(3,201,215)";
                divLoading.style.borderRadius = "50%";
                refModal.current.removeChild(divChangePass);
                refModal.current.appendChild(divLoading);
                fetch("http://quyt.ddns.net:3000/access/reset-password", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user: res.data.user,
                    newPassword: input2.value,
                    verifyCode: input3.value,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.code == 200) {
                      const divSuccess = document.createElement("div");
                      divSuccess.style.animation = "none";
                      const h2 = document.createElement("h2");
                      h2.innerText = "Đổi Mật Khẩu Thành Công !";
                      const button = document.createElement("button");
                      button.innerText = "Đăng Nhập";
                      button.addEventListener("click", () => {
                        refModal.current.removeChild(divSuccess);
                        setToggleModal(false);
                      });
                      divSuccess.appendChild(h2);
                      divSuccess.appendChild(button);

                      refModal.current.removeChild(divLoading);
                      refModal.current.appendChild(divSuccess);
                    }
                  });
              });

              // divGroup.appendChild(span);
              // divGroup.appendChild(input);

              divGroup2.appendChild(span2);
              divGroup2.appendChild(input2);

              divGroup3.appendChild(span3);
              divGroup3.appendChild(input3);

              divGroup4.appendChild(button);
              divGroup4.appendChild(button2);

              divChangePass.appendChild(h2);
              divChangePass.appendChild(divGroup);
              divChangePass.appendChild(divGroup2);
              divChangePass.appendChild(divGroup3);
              divChangePass.appendChild(divGroup4);

              refModal.current.removeChild(div4);
              refModal.current.appendChild(divChangePass);
            });
            div5.appendChild(button);
            div5.appendChild(button2);
            div4.appendChild(h2);
            div4.appendChild(div5);
            refModal.current.removeChild(div3);
            refModal.current.appendChild(div4);
          }
        });
    });
    div2.appendChild(button2);
    div2.appendChild(button);
    div.appendChild(h2);
    div.appendChild(input);
    div.appendChild(div2);

    refModal.current.appendChild(div);
    setToggleModal(true);
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
                      <button onClick={handleForgotPass} type="button">
                        FORGOT PASSWORD
                      </button>
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
          ></div>
        </div>

        {/* <div
          className={clsx(cx("containerModal"), {
            [styles.openModal]: toggleModal2,
          })}
        >
          <div
            ref={refModal}
            onClick={(e) => e.stopPropagation()}
            className={clsx(cx("modal"))}
          ></div>
        </div> */}
      </div>
    </>
  );
}
export default Login;
