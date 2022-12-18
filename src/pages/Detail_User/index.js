import styles from "./detail-user.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill } from "react-icons/bs";

function DetailUser() {
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  const id = useLocation();
  let navigate = useNavigate();

  const refInputUpload = useRef();
  const refErrEmail = useRef();
  const refErrFullName = useRef();
  const refErrPass = useRef();
  const refErrRePass = useRef();
  const refLoading = useRef();

  const [avatar, setAvatar] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [passWord, setPassWord] = useState();
  const [passWord2, setPassWord2] = useState();
  const [phone, setPhone] = useState();

  const [errEmail, setErrEmail] = useState(true);
  const [errName, setErrName] = useState(true);
  const [errPass, setErrPass] = useState(true);
  const [errRePass, setReErrPass] = useState(true);

  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    fetch(`http://quyt.ddns.net:3000/admin/${id.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEmail(data.data.email);
        setFullName(data.data.fullname);
        setAvatar(data.data.avatar);
        setPhone(data.data.phone);
      });
  }, [id]);

  const handleAddUser = () => {
    setToggleLoading(true);
    var promise = new Promise(function (resolve, reject) {
      //xử lý hình ảnh
      if (typeof avatar == "object") {
        const dataImage = new FormData();
        let URLIcon;
        dataImage.append("files", avatar);
        fetch("http://quyt.ddns.net:2607", {
          method: "POST",
          body: dataImage,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            URLIcon = res.data[0];
            resolve(URLIcon);
          })
          .catch((err) => console.log(err));
      } else {
        resolve(avatar);
      }
    });
    promise.then((URLIcon) => {
      let data = function () {
        if (passWord == null || passWord == "") {
          return {
            email: email,
            fullname: fullName,
            phone: phone,
            role: "admin",
            avatar: URLIcon,
          };
        } else {
          return {
            email: email,
            fullname: fullName,
            phone: phone,
            password: passWord,
            role: "admin",
            avatar: URLIcon,
          };
        }
      };
      console.log(data());
      fetch(`http://quyt.ddns.net:3000/admin/${id.state.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify(data()),
      })
        .then((res) => res.json())
        .then((res) => {
          refLoading.current.innerHTML = `<h2>Successfully</h2>`;
          setTimeout(() => {
            navigate("/users");
          }, 1500);
        });
    });
  };

  const openUploadImage = () => {
    refInputUpload.current.click();
  };
  const handleOnImageChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleDeleteImage = () => {
    setAvatar(null);
  };

  const handleValidate = (e) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(e.target.value);
    if (e.target.value === "") {
      refErrEmail.current.children[2].style.color = "red";
      refErrEmail.current.children[2].innerText = "* Trường này là bắt buộc";
      setErrEmail(false);
    } else if (!e.target.value.match(mailformat)) {
      refErrEmail.current.children[2].style.color = "red";
      refErrEmail.current.children[2].innerText = "Không đúng định dạng";
      setErrEmail(false);
    } else {
      refErrEmail.current.children[2].innerText = "";
      setErrEmail(true);
    }
  };

  const handleValidateFulname = (e) => {
    setFullName(e.target.value);
    if (e.target.value === "") {
      refErrFullName.current.children[2].style.color = "red";
      refErrFullName.current.children[2].innerText = "* Trường này là bắt buộc";
      setErrName(false);
    } else {
      refErrFullName.current.children[2].innerText = "";
      setErrName(true);
    }
  };

  const handleValidatePass = (e) => {
    setPassWord(e.target.value);
    if (e.target.value === "") {
      refErrPass.current.children[2].style.color = "red";
      refErrPass.current.children[2].innerText = "* Trường này là bắt buộc";
      setErrPass(false);
    } else if (e.target.value.length < 6) {
      refErrPass.current.children[2].style.color = "red";
      refErrPass.current.children[2].innerText = "Chứa ít nhất 6 kí tự";
      setErrPass(false);
    } else {
      refErrPass.current.children[2].innerText = "";
      setErrPass(true);
    }
  };

  const handleValidateRePass = (e) => {
    setPassWord2(e.target.value);
    if (e.target.value === "") {
      refErrRePass.current.children[2].style.color = "red";
      refErrRePass.current.children[2].innerText = "* Trường này là bắt buộc";
      setReErrPass(false);
    } else if (e.target.value !== refErrPass.current.children[1].value) {
      refErrRePass.current.children[2].style.color = "red";
      refErrRePass.current.children[2].innerText = "Chưa khớp với password";
      setReErrPass(false);
    } else {
      refErrRePass.current.children[2].innerText = "";
      setReErrPass(true);
    }
  };

  const handleDeleteUser = () => {
    const div = document.createElement("div");
    div.style.animation = "none";
    const h2 = document.createElement("h2");
    h2.innerText = "Bạn muốn xóa tài khoản này ?";
    const div2 = document.createElement("div");
    div2.style.display = "flex";
    div2.style.justifyContent = "center";
    div2.style.animation = "none";
    const button = document.createElement("button");
    const button2 = document.createElement("button");
    button.innerText = "Hủy";
    button2.innerText = "Xóa";
    button.style.margin = "0 5px";
    button2.style.margin = "0 5px";
    div2.appendChild(button);
    div2.appendChild(button2);
    div.appendChild(h2);
    div.appendChild(div2);
    button.addEventListener("click", () => {
      refLoading.current.removeChild(div);
      setToggleLoading(false);
    });
    button2.addEventListener("click", () => {
      const div3 = document.createElement("div");
      div3.style.width = "100px";
      div3.style.height = "100px";
      div3.style.border = "7px solid transparent";
      div3.style.borderTop = "7px solid rgb(3, 201, 215)";
      div3.style.borderRadius = "50%";
      refLoading.current.removeChild(div);
      refLoading.current.appendChild(div3);
      fetch(`http://quyt.ddns.net:3000/admin/${id.state.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            const div4 = document.createElement("div");
            div4.style.display = "flex";
            div4.style.justifyContent = "center";
            div4.style.animation = "none";
            const h2 = document.createElement("h2");
            h2.innerText = "Tác Vụ Thành Công !";
            div4.appendChild(h2);
            refLoading.current.removeChild(div3);
            refLoading.current.appendChild(div4);
          } else {
            const div4 = document.createElement("div");
            div4.style.display = "flex";
            div4.style.flexDirection = "column";
            div4.style.justifyContent = "center";
            div4.style.alignItems = "center";
            div4.style.animation = "none";
            const h2 = document.createElement("h2");
            h2.innerText = res.message;
            const button = document.createElement("button");
            button.innerText = "Thử Lại";
            button.addEventListener("click", () => {
              refLoading.current.removeChild(div4);
              setToggleLoading(false);
            });
            div4.appendChild(h2);
            div4.appendChild(button);
            refLoading.current.removeChild(div3);
            refLoading.current.appendChild(div4);
          }
        });
    });
    refLoading.current.appendChild(div);
    setToggleLoading(true);
  };

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div ref={refErrEmail} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Email</p>
            <input
              required
              defaultValue={email}
              onChange={(e) => {
                handleValidate(e);
              }}
              placeholder="ex: abc@gmail.com"
            ></input>
            <p></p>
          </div>

          <div ref={refErrFullName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Họ Và Tên</p>
            <div>
              <input
                placeholder="ex: Nguyen Van A"
                style={{ margin: "5px 0" }}
                defaultValue={fullName}
                onChange={(e) => {
                  handleValidateFulname(e);
                }}
              ></input>
            </div>
            <p></p>
          </div>

          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Hình Ảnh</p>
            <div style={{ display: "flex" }}>
              <div style={{ position: "relative" }}>
                <img
                  styles={{ width: "80px" }}
                  // src={
                  //   typeof avatar == "object"
                  //     ? URL.createObjectURL(avatar)
                  //     : avatar
                  // }
                  src={
                    avatar == null
                      ? null
                      : typeof avatar == "object"
                      ? URL.createObjectURL(avatar)
                      : avatar
                  }
                ></img>
                <BsXCircleFill
                  onClick={handleDeleteImage}
                  className={clsx(cx("icon-delete"))}
                />
              </div>
              <div className={clsx(cx("from-body-group-addimage"))}>
                <BsPlusCircle onClick={openUploadImage} />
              </div>
            </div>
            <input
              ref={refInputUpload}
              style={{ display: "none" }}
              type="file"
              onChange={(e) => handleOnImageChange(e)}
            ></input>
          </div>

          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Số Điện Thoại</p>
            <input
              defaultValue={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="ex: 0932xxxxxx"
              type="number"
            ></input>
          </div>

          <div ref={refErrPass} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Mật Khẩu</p>
            <input
              value={passWord}
              onChange={(e) => {
                handleValidatePass(e);
              }}
            ></input>
            <p></p>
          </div>

          <div ref={refErrRePass} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Nhập Lại Mật Khẩu</p>
            <input
              value={passWord2}
              onChange={(e) => {
                handleValidateRePass(e);
              }}
            ></input>
            <p></p>
          </div>
        </div>
        <div className={clsx(cx("from-footer"))}>
          <div>
            <button onClick={() => navigate("/users")}>Hủy</button>
          </div>
          <div>
            <button onClick={handleDeleteUser}>Xóa</button>
          </div>
          <div>
            <button
              className={clsx({
                [styles.activebutton]: true,
              })}
              disabled={errEmail == true && errName == true ? false : true}
              onClick={handleAddUser}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(cx("loading"), {
          [styles.abc]: toggleLoading,
        })}
      >
        <div ref={refLoading} className={clsx(cx("message"))}></div>
      </div>
    </div>
  );
}

export default DetailUser;
