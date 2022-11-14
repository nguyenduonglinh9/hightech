import styles from "./Login.module.scss";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Wrong from "./assets/fonts/icon3d/Wrong.json";
import Congratulation from "./assets/fonts/icon3d/congratulation.json";
import classNames from "classnames/bind";
import emailjs from "@emailjs/browser";

function Login() {

  // if (JSON.parse(localStorage.getItem("data")).isLoggin == true)
  // {
  //   navigate("/product");
  // }
  
  const refLogin = useRef();
  const cx = classNames.bind(styles);
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [toggleModal, setToggleModal] = useState(false);


  const handleLogin = () => {
    fetch("https://fpt-hightech-api.herokuapp.com/access/login", {
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
          console.log(data)
          setToggleModal(true)
          setMessage(data.message);
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
        }
        else {
          setToggleModal(true);
          setMessage(data.message);
          localStorage.setItem(
            "DataLogin",
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
                      <input
                        type="text"
                        placeholder=" "
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      ></input>
                      <label>username</label>
                    </div>
                    <div
                      className={clsx(
                        styles.body_content_right_body_form_input
                      )}
                    >
                      <input
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                      <label>password</label>
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
            onClick={(e) => e.stopPropagation()}
            className={clsx(cx("modal"))}
          >
            <p>{message}</p>
            {message != "success" ? (
              <button
                onClick={() => setToggleModal(false)}
                className={clsx(cx("modal_button"))}
              >
                RETRY
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
