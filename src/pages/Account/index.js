import styles from "./account.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill } from "react-icons/bs";
import jwt_decode from "jwt-decode";

function Account() {
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  // const id = useLocation();
  let navigate = useNavigate();
  const Decode_token = jwt_decode(DataLogin.token);
  console.log(Decode_token)

  const refInputUpload = useRef();
  const refErrEmail = useRef();
  const refErrFullName = useRef();
  const refErrPass = useRef();
  const refErrRePass = useRef();
  const refLoading = useRef()

  const [toggleLoading, setToggleLoading] = useState(false);
  const [toggleChangepass, setToggleChangepass] = useState(false);



  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div ref={refErrEmail} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Username</p>
            <input
              required
              defaultValue={Decode_token.email}
              disabled
              placeholder="ex: abc@gmail.com"
            ></input>
            <p></p>
          </div>

          <div ref={refErrFullName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Fullname</p>
            <div>
              <input
                placeholder="ex: Nguyen Van A"
                style={{ margin: "5px 0" }}
                disabled
                defaultValue={Decode_token.fullname}
              ></input>
            </div>
            <p></p>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Phone</p>
            <input
              defaultValue={Decode_token.phone}
              disabled
              placeholder="ex: 0932xxxxxx"
              type="number"
            ></input>
          </div>
        </div>
        <div className={clsx(cx("from-footer"))}>
          <div>
            <button>Cancel</button>
          </div>
          <div>
            <button onClick={()=>setToggleChangepass(true)}>Change Password</button>
          </div>
        </div>
      </div>
      <div
        className={clsx(cx("Modal-container"), {
          [styles.activechangepass]: toggleChangepass,
        })}
      >
        <div className={clsx(cx("Modal-container-header"))}>
          <h2>Mời nhập mật khẩu mới</h2>
          <input></input>
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <button onClick={()=>setToggleChangepass(false)}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
