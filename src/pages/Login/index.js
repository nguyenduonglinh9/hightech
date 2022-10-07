import styles from "./Login.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import  Lottie  from 'lottie-react';
import Wrong from './assets/fonts/icon3d/Wrong.json';
import Congratulation from './assets/fonts/icon3d/congratulation.json';
import classNames from "classnames/bind";

const UserContext = createContext();

function Login() {
   let navigate = useNavigate();

  if ((JSON.parse(localStorage.getItem("data"))).isLoggin==true) {
    navigate('/product');
  }
    // window.addEventListener("beforeunload", () => {
    //   localStorage.setItem("isLoggin", false);
    // });

  const [isLoggin, setIsLoggin] = useState(false)
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState('');
  const [message, setMessage] = ('')

  const cx = classNames.bind(styles);

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
  const handleLogin = () => {
    if (username.length <= 0 || password.length <= 0) {
      setErr('vui lòng không để trống ô nhập');
      localStorage.setItem(
        "data",
        JSON.stringify({
          isLoggin: false,
        })
      );
    }
    else if (username != user[0].username) {
      setErr("Nhập sai tài khoản hoặc mật khẩu");
     localStorage.setItem(
       "data",
       JSON.stringify({
         isLoggin: false,
       })
     );
    } else if (password != user[0].password) {
      setErr("Nhập sai tài khoản hoặc mật khẩu");
      localStorage.setItem(
        "data",
        JSON.stringify({
          isLoggin: false,
        })
      );
    } else {
      setErr('Đúng rồi chúc mừng');
      localStorage.setItem('data', JSON.stringify({
        username,
        isLoggin : true
      }));
      setTimeout(() => {
        navigate('/product');
      },1000)
    }
  }
  
  return (
    <>
      <div className={clsx(styles.container)}>
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
            <div style={{ width: "100px", height: "100px" }}>
              <Lottie
                loop={true}
                animationData={
                  err === "Đúng rồi chúc mừng" ? Congratulation : Wrong
                }
              ></Lottie>
            </div>
            <p>{err}</p>
            {err !== "Đúng rồi chúc mừng" ? (
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
