import styles from "./account.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BsPlusCircle,
  BsXCircleFill,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import jwt_decode from "jwt-decode";

function Account() {
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  // const id = useLocation();
  let navigate = useNavigate();
  const Decode_token = jwt_decode(DataLogin.token);
  console.log(Decode_token);

  const refErrEmail = useRef();
  const refErrFullName = useRef();
  const refMessage = useRef();
  const refOld = useRef();
  const refNew = useRef();

  const refInputEmail = useRef();
  const refInputName = useRef();
  const refInputPhone = useRef();
  const refInputImage = useRef();


  const [toggleLoading, setToggleLoading] = useState(false);
  const [toggleChangepass, setToggleChangepass] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);

  const [myProflie, setMyProfile] = useState();

  const [toggleEyeOld, setToggleEyeOld] = useState(false);
  const [toggleEyeNew, setToggleEyeNew] = useState(false);

  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/access/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMyProfile(res.data);
      });
  }, []);
  console.log(myProflie);

  const handleChangePass = () => {
    if (oldPass == null || newPass == null) {
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.flexDirection = "column";
      div.style.alignItems = "center";
      div.style.animation = "none";
      const h2 = document.createElement("h2");
      h2.innerText = "Vui lòng nhập đầy đủ thông tin !";
      h2.style.textAlign = "center";
      const button = document.createElement("button");
      button.innerText = "Thử Lại";
      button.addEventListener("click", () => {
        refMessage.current.removeChild(div);
        setToggleMessage(false);
      });
      div.appendChild(h2);
      div.appendChild(button);
      refMessage.current.appendChild(div);
      setToggleMessage(true);
    } else {
      const div = document.createElement("div");
      div.style.width = "100px";
      div.style.height = "100px";
      div.style.border = "7px solid transparent";
      div.style.borderRadius = "50%";
      div.style.borderTop = "7px solid rgb(3,201,215)";
      refMessage.current.appendChild(div);
      setToggleMessage(true);

      fetch("http://quyt.ddns.net:3000/access/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          oldPassword: oldPass,
          newPassword: newPass,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            const div2 = document.createElement("div");
            div2.style.display = "flex";
            div2.style.flexDirection = "column";
            div2.style.alignItems = "center";
            div2.style.animation = "none";
            const h2 = document.createElement("h2");
            h2.innerText = "Đã đổi mật khẩu thành công !";
            h2.style.textAlign = "center";
            const h3 = document.createElement("h3");
            h3.innerText = "Bạn muốn đăng xuất không ?";
            const div3 = document.createElement("div");
            div3.style.animation = "none";
            const button = document.createElement("button");
            button.innerText = "Không";
            button.addEventListener("click", () => {
              refMessage.current.removeChild(div2);
              setToggleMessage(false);
            });
            const button2 = document.createElement("button");
            button2.innerText = "Đăng xuất";
            button2.addEventListener("click", () => {
              localStorage.setItem(
                "isLogin",
                JSON.stringify({ isLoggin: false })
              );
              navigate("/");
            });
            div3.appendChild(button);
            div3.appendChild(button2);
            refMessage.current.removeChild(div);
            div2.appendChild(h2);
            div2.appendChild(h3);
            div2.appendChild(div3);
            refMessage.current.appendChild(div2);
          } else {
            const div2 = document.createElement("div");
            div2.style.display = "flex";
            div2.style.flexDirection = "column";
            div2.style.alignItems = "center";
            div2.style.animation = "none";
            const h2 = document.createElement("h2");
            h2.innerText = res.message;
            h2.style.textAlign = "center";
            const button = document.createElement("button");
            button.innerText = "Thử Lại";
            button.addEventListener("click", () => {
              refMessage.current.removeChild(div2);
              setToggleMessage(false);
            });
            div2.appendChild(h2);
            div2.appendChild(button);
            refMessage.current.removeChild(div);
            refMessage.current.appendChild(div2);
          }
        });
    }
  };
  const handleShowPassOld = () => {
    refOld.current.setAttribute("type", "text");
    setToggleEyeOld(true);
  };
  const handleHidePassOld = () => {
    refOld.current.setAttribute("type", "password");
    setToggleEyeOld(false);
  };
  const handleShowPassNew = () => {
    refNew.current.setAttribute("type", "text");
    setToggleEyeNew(true);
  };
  const handleHidePassNew = () => {
    refNew.current.setAttribute("type", "password");
    setToggleEyeNew(false);
  };
  console.log(myProflie)

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div ref={refErrEmail} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Email</p>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <input
                ref={refInputEmail}
                required
                defaultValue={myProflie == null ? "" : myProflie.email}
                disabled
                placeholder="ex: abc@gmail.com"
              ></input>
              <p></p>
              {/* <div onClick={(e) => (refInputEmail.current.disabled = false)}>
                <BiEditAlt />
              </div> */}
            </div>
          </div>

          <div ref={refErrEmail} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Hình Ảnh</p>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <input
                ref={refInputImage}
                required
                // defaultValue={Decode_token.email}
                disabled
                type="file"
                placeholder="ex: abc@gmail.com"
              ></input>
              <p></p>
              {/* <BiEditAlt
                onClick={(e) => (refInputImage.current.disabled = false)}
              /> */}
            </div>
            <img src={myProflie == null ? "" : myProflie.avatar}></img>
          </div>

          <div ref={refErrFullName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Họ Và Tên</p>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <input
                ref={refInputName}
                placeholder="ex: Nguyen Van A"
                style={{ margin: "5px 0" }}
                disabled
                defaultValue={myProflie == null ? "" : myProflie.fullname}
              ></input>
              <p></p>
              {/* <BiEditAlt
                onClick={(e) => (refInputName.current.disabled = false)}
              /> */}
            </div>
          </div>

          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Số Điện Thoại</p>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <input
                ref={refInputPhone}
                defaultValue={myProflie == null ? "" : myProflie.phone}
                disabled
                placeholder="ex: 0932xxxxxx"
                type="number"
              ></input>
              <p></p>
              {/* <BiEditAlt
                onClick={(e) => (refInputPhone.current.disabled = false)}
              /> */}
            </div>
          </div>
        </div>
        <div className={clsx(cx("from-footer"))}>
          <div>
            <button onClick={() => navigate("/product")}>Trở Lại</button>
          </div>
          <div>
            <button onClick={() => setToggleChangepass(true)}>
              Đổi Mật Khẩu
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(cx("Modal-container"), {
          [styles.activechangepass]: toggleChangepass,
        })}
      >
        <div className={clsx(cx("Modal-container-header"))}>
          <h2>HIGH TECH</h2>
          <div className={clsx(cx("Modal-container-group"))}>
            <span>Mật khẩu cũ</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "300px",
                animation: "none",
              }}
            >
              <input
                ref={refOld}
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              ></input>
              <BsFillEyeFill
                onClick={handleShowPassOld}
                style={
                  toggleEyeOld == true
                    ? { display: "none" }
                    : { display: "inline-block", marginLeft: "3px" }
                }
              />
              <BsFillEyeSlashFill
                onClick={handleHidePassOld}
                style={
                  toggleEyeOld == true
                    ? { display: "inline-block", marginLeft: "3px" }
                    : { display: "none" }
                }
              />
            </div>
          </div>

          <div className={clsx(cx("Modal-container-group"))}>
            <span>Mật khẩu mới</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "300px",
                animation: "none",
              }}
            >
              <input
                ref={refNew}
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              ></input>
              <BsFillEyeFill
                onClick={handleShowPassNew}
                style={
                  toggleEyeNew == true
                    ? { display: "none" }
                    : { display: "inline-block", marginLeft: "3px" }
                }
              />
              <BsFillEyeSlashFill
                onClick={handleHidePassNew}
                style={
                  toggleEyeNew == true
                    ? { display: "inline-block", marginLeft: "3px" }
                    : { display: "none" }
                }
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              animation: "none",
            }}
          >
            <button onClick={() => setToggleChangepass(false)}>Hủy</button>
            <button onClick={handleChangePass}>Lưu</button>
          </div>
        </div>
      </div>
      <div
        className={clsx(cx("Modal-container"), {
          [styles.activechangepass]: toggleMessage,
        })}
      >
        <div
          ref={refMessage}
          className={clsx(cx("Modal-container-header"))}
        ></div>
      </div>
    </div>
  );
}

export default Account;
