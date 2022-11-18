import styles from "./add-user.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill, BsCaretDownFill } from "react-icons/bs";
import { Button } from "bootstrap";

function AddUser() {

  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);

  const refInputUpload = useRef();
  const refErrEmail = useRef();
  const refErrFullName = useRef();
  const refErrPass = useRef();
  const refErrRePass = useRef();

  const [avatar, setAvatar] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [passWord, setPassWord] = useState();
  const [passWord2, setPassWord2] = useState();
  const [phone, setPhone] = useState();

  const [errEmail, setErrEmail] = useState(false)
  const [errName, setErrName] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [errRePass, setReErrPass] = useState(false);

  const [toggleLoading, setToggleLoading] = useState(false);



  const handleAddUser = () => {
    setToggleLoading(true);
    var promise = new Promise(function (resolve, reject) {
      //xử lý hình ảnh
      const dataImage = new FormData();
      let URLIcon;
      dataImage.append("source", avatar);
      fetch(
        "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
        {
          method: "POST",
          body: dataImage,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          URLIcon = res["image"]["url"];
          resolve(URLIcon);
        })
        .catch((err) => console.log(err));
    });
    promise.then((URLIcon) => {
      fetch("https://fpt-hightech-api.herokuapp.com/admin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          email: email,
          fullname: fullName,
          phone: phone,
          password: passWord,
          role: 'admin',
          avatar:URLIcon
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
           setToggleLoading(false);
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
    setAvatar(null)
  };
  

  const handleValidate = (e) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(e.target.value);
    if (e.target.value === "") {
      refErrEmail.current.children[2].style.color = "red";
      refErrEmail.current.children[2].innerText = "* Trường này là bắt buộc";
      setErrEmail(false);
    }
    else if (!e.target.value.match(mailformat)) {
      refErrEmail.current.children[2].style.color = "red";
      refErrEmail.current.children[2].innerText = "Không đúng định dạng";
       setErrEmail(false);
    }
    else {
      refErrEmail.current.children[2].innerText = "";
       setErrEmail(true);
    }
  }

  const handleValidateFulname = (e) => {
    setFullName(e.target.value)
    if (e.target.value === "") {
      refErrFullName.current.children[2].style.color = "red";
      refErrFullName.current.children[2].innerText = "* Trường này là bắt buộc";
      setErrName(false)
    } else {
      refErrFullName.current.children[2].innerText = "";
      setErrName(true)
    }
  }

  const handleValidatePass = (e) => {
    setPassWord(e.target.value);
    if (e.target.value === "") {
      refErrPass.current.children[2].style.color = "red";
      refErrPass.current.children[2].innerText = "* Trường này là bắt buộc";
      setErrPass(false)
    } else if (e.target.value.length < 6) {
      refErrPass.current.children[2].style.color = "red";
      refErrPass.current.children[2].innerText = "Chứa ít nhất 6 kí tự";
      setErrPass(false);
    } else {
      refErrPass.current.children[2].innerText = "";
      setErrPass(true);
    }
  }

  const handleValidateRePass = (e) => {
     setPassWord2(e.target.value);
     if (e.target.value === "") {
       refErrRePass.current.children[2].style.color = "red";
       refErrRePass.current.children[2].innerText = "* Trường này là bắt buộc";
       setReErrPass(false)
     } else if (e.target.value !== refErrPass.current.children[1].value) {
       refErrRePass.current.children[2].style.color = "red";
       refErrRePass.current.children[2].innerText = "Chưa khớp với password";
       setReErrPass(false);
     } else {
       refErrRePass.current.children[2].innerText = "";
       setReErrPass(true);
     }
   };

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div ref={refErrEmail} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>EMAIL</p>
            <input
              required
              value={email}
              onChange={(e) => {
                handleValidate(e);
              }}
              placeholder="ex: abc@gmail.com"
            ></input>
            <p></p>
          </div>

          <div ref={refErrFullName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>FULLNAME</p>
            <div>
              <input
                placeholder="ex: Nguyen Van A"
                style={{ margin: "5px 0" }}
                value={fullName}
                onChange={(e) => {
                  handleValidateFulname(e);
                }}
              ></input>
            </div>
            <p></p>
          </div>

          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>AVATAR</p>
            <div style={{ display: "flex" }}>
              <div style={{ position: "relative" }}>
                <img
                  styles={{ width: "80px" }}
                  src={avatar == null ? "" : URL.createObjectURL(avatar)}
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
            <p style={{ fontWeight: "bold" }}>PHONE</p>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="ex: 0932xxxxxx"
              type="number"
            ></input>
          </div>

          <div ref={refErrPass} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>PASSWORD</p>
            <input
              value={passWord}
              onChange={(e) => {
                handleValidatePass(e);
              }}
            ></input>
            <p></p>
          </div>

          <div ref={refErrRePass} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>RE-TYPE PASSWORD</p>
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
            <button>CANCEL</button>
          </div>
          <div>
            <button
              className={clsx({
                [styles.activebutton]: true,
              })}
              disabled={
                errEmail == true &&
                errName == true &&
                errPass == true &&
                errRePass == true
                  ? false
                  : true
              }
              onClick={handleAddUser}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(cx("loading"), {
          [styles.abc] : toggleLoading
        })}
      >
        <div></div>
      </div>
    </div>
  );
}

export default AddUser;
