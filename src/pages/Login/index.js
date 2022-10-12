import styles from "./Login.module.css";
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
  const numberCode = useRef();
  const cx = classNames.bind(styles);
  let navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");

  //Fetch data tài khoản admin cấp cao
  useEffect(() => {
    fetch("http://localhost:3001/userAdmin")
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setUser((prev) => [...prev, ...users]);
      });
  }, []);

  //validate from
  const test = user.filter((item) => item.username === username);
  const handleLogin = () => {
    //nếu bỏ trống ô nhập
    if (username.length <= 0 || password.length <= 0) {
      setErr("vui lòng không để trống ô nhập");
      localStorage.setItem(
        "data",
        JSON.stringify({
          isLoggin: false,
        })
      );
    }
    //nếu sai username
    else if (test.length === 0) {
      setErr("Nhập sai tài khoản hoặc mật khẩu ");
      localStorage.setItem(
        "data",
        JSON.stringify({
          isLoggin: false,
        })
      );
    }
    //nếu đúng username nhưng sai password
    else if (test.length > 0 && test[0].password != password) {
      setErr("Nhập sai tài khoản hoặc mật khẩu 2");
      localStorage.setItem(
        "data",
        JSON.stringify({
          isLoggin: false,
        })
      );
    }
    //nếu đúng username và password
    else if (test.length > 0 && test[0].password == password) {
      //tạo mã bảo mật random
      numberCode.current =
        Math.floor(Math.random() * (999999 - 100000)) + 100000;
      //thực hiện gửi mã bảo mật vào mail
      emailjs.send(
        "service_prky1qy",
        "template_zmoe0kh",
        {
          Username: username,
          numberrandom: numberCode.current,
          email: user[0].email,
        },
        "lya-8-DbFC46J0mXS"
      );
      setErr("Vui lòng nhập mã bảo mật");
    }
  };

  const handleLoginCode = () => {
    //nếu nhập đúng mã bảo mật
    if (code == numberCode.current) {
      setErr("Đăng Nhập Thành Công");
      //sau 3 giây chuyển màn hình /product
      setTimeout(() => {
        localStorage.setItem(
          "data",
          JSON.stringify({
            username,
            avatar: test[0].avatar,
            permission : test[0].permission,
            isLoggin: true,

          })
        );
        navigate("/product");
      }, 3000);
    }
    //nếu sai mã bảo mật
    else {
      setErr("Mã bảo mật sai vui lòng thử lại");
    }
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
          onClick={() => setErr("")}
          className={clsx(cx("containerModal"), {
            [styles.openModal]: err.length > 0 ? true : false,
          })}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(cx("modal"))}
          >
            <div style={{ width: "fit-content", height: "fit-content" }}>
              {err === "Vui lòng nhập mã bảo mật" ? (
                <form className={clsx(cx("modalMail"))}>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  ></input>
                  <button onClick={handleLoginCode}>PRESS</button>
                </form>
              ) : (
                <Lottie
                  loop={true}
                  animationData={
                    err === "Đăng Nhập Thành Công" ? Congratulation : Wrong
                  }
                ></Lottie>
              )}
            </div>
            <p>{err}</p>
            {err !== "Đúng rồi chúc mừng" &&
            err !== "Vui lòng nhập mã bảo mật" &&
            err !== "Đăng Nhập Thành Công" ? (
              <button
                onClick={() => setErr("")}
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
