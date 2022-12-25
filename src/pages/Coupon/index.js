import styles from "./Coupon.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg, BsCaretDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const warning = require("../Category/assets/imgs/warning.png");

function Coupon() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();
  let currentDate = new Date();
  let dollarUSLocale = Intl.NumberFormat("en-US");
  const isLogin2 = JSON.parse(localStorage.getItem("isLogin"));
  if (isLogin2["isLoggin"] === false) {
    navigate("/");
  }

  const refCate = useRef();
  const refIDCate = useRef();
  const refBrandID = useRef();
  const refModal = useRef();
  const refModal2 = useRef();
  const refModal3 = useRef();
  const refStatus = useRef();
  const refMessage = useRef();

  const currentIdCate = useRef();
  const currentTitleCate = useRef();
  const currentIdBrand = useRef();

  console.log(currentIdCate.current, currentTitleCate.current);

  const test = useRef();

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [giagiam, setGiagiam] = useState(0);
  const [expiredAt, setExpiredAt] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [titleCategory, setTitleCategory] = useState("");

  const [imageIconUpdate, setImageIconUpdate] = useState();

  const [nextType, setNextType] = useState();

  const [toggleModalAdd3, setToggleModalAdd3] = useState(false);
  const [toggleModalAdd4, setToggleModalAdd4] = useState(false);
  const [toggleModalAdd5, setToggleModalAdd5] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleOnOff, setToggleOnOff] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);

  const [currentIDCoupon, setCurrentIDCoupon] = useState()

  console.log(expiredAt);
  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNextType(data.data[data.data.length - 1].type);
        setCategorys((prev) => [...prev, ...data.data]);
        currentIdCate.current = data.data[0]._id;
        currentTitleCate.current = data.data[0].title;
      });
  }, []);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/brand/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBrands((prev) => [...prev, ...data.data]);
      });
  }, []);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/coupon/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCoupons((prev) => [...prev, ...data.data]);
      });
  }, []);

  const handleToggleModalAddCategory = () => {
    setToggleModalAdd3(true);
  };

  const handleUpdateBrand = () => {
    refModal.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
    fetch(`http://quyt.ddns.net:3000/coupon/${currentIDCoupon}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        title: title,
        code: code,
        value: giagiam,
        quantity: quantity,
        expiredAt: expiredAt,
        active: toggleOnOff,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        console.log(res)
        refModal.current.innerHTML = `<h2>Successful</h2>`;
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      });
  };
  const handleDeleteBrand = () => {
    setToggleModalAdd5(true);
  };

  const handleDeleteBrand2 = () => {
    refModal3.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
    fetch(`http://quyt.ddns.net:3000/brand/${currentIdBrand.current}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => {
        res.json();
        // setToggleModalAdd3(false);
        // window.location.reload(false);
      })
      .then((res) => {
        refModal3.current.innerHTML = `<h2>Successful</h2>`;

        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      });
  };

  const handleUpdateFile2 = (e) => {
    setImageIconUpdate(e.target.files[0]);
  };

  const handleAddNewCategory = () => {
    setToggleMessage(true);
    refMessage.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
    fetch("http://quyt.ddns.net:3000/coupon/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        title: title,
        code: code,
        value: giagiam,
        quantity: quantity,
        expiredAt: expiredAt,
        active: toggleOnOff,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code != 200) {
          // refModal.current.innerHTML = `
          // <div style="animation:none;display:flex;flex-direction:column;align-items:center;">
          //   <h2>${res.message}</h2>
          //   <button>Thử lại</button>
          // </div>`;
          refMessage.current.innerHTML = "<p></p>";
          const div = document.createElement("div");
          const h2 = document.createElement("h2");
          const button = document.createElement("button");
          div.style.animation = "none";
          div.style.display = "flex";
          div.style.flexDirection = "column";
          div.style.alignItems = "center";
          h2.innerText = res.message;
          button.innerText = "Thử Lại";
          button.addEventListener("click", () => {
            setToggleMessage(false);
            refMessage.current.removeChild(div);
          });
          div.appendChild(h2);
          div.appendChild(button);

          refMessage.current.appendChild(div);
        } else {
          const h2 = document.createElement("h2");
          h2.innerText = res.message;
          refMessage.current.appendChild(h2);
          setTimeout(() => {
          window.location.reload(false);
        }, 1500);
        }

        console.log(res);

        // 
      })
      .catch((err) => {
        refModal.current.innerHTML = `<h2>${err}</h2>`;
      });
  };
  console.log(currentIDCoupon)

  const handleUpdateCoupon = (id) => {
    const coupon = coupons.find(item => item._id == id);
    setCurrentIDCoupon(id)
    setTitle(coupon.title);
    setCode(coupon.code);
    setGiagiam(coupon.value);
    setQuantity(coupon.quantity);
    setToggleOnOff(coupon.active);
    const date = new Date(coupon.expiredAt);
    console.log(date.toISOString().substring(0,10));
    setExpiredAt(date.toISOString())
    setToggleModalAdd3(true);
    setToggleButton(false);
  };

  const handleUpdateCate = () => {
    setToggleMessage(true);
    refMessage.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
    var promise = new Promise(function (resolve, reject) {
      //xử lý hình ảnh
      const dataImage = new FormData();
      let URLIcon;
      dataImage.append("source", imageIconUpdate);
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
      fetch(`http://quyt.ddns.net:3000/category/${refIDCate.current}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          title: titleCategory,
          icon: URLIcon,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          refModal2.current.innerHTML = `<h2>Successful</h2>`;

          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        })
        .catch((err) => {
          refModal2.current.innerHTML = `<h2>${err}</h2>`;
        });
    });
  };

  const handleDeleteCategory = () => {
    setToggleModalAdd5(true);
  };

  const handleCancel = () => {
    setTitleCategory("");
    currentIdCate.current = categorys[0]._id;
    currentTitleCate.current = categorys[0].title;
    setToggleModalAdd3(false);
    setToggleButton(true);
  };
  const handleChangeCurrentCate = (title, id) => {
    currentTitleCate.current = title;
    currentIdCate.current = id;
    setToggleDropDown(false);
  };

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("listcategory"))}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ margin: "0px" }}>Danh Sách Phiếu Mua Hàng</h3>
          </div>
          <div
            onClick={handleToggleModalAddCategory}
            className={clsx(cx("button-add-new"))}
          >
            <p>Thêm</p>
          </div>
        </div>

        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>Số thứ tự</p>
              </th>
              <th>
                <p>Mã Code</p>
              </th>
              <th>
                <p>Giá giảm</p>
              </th>
              <th>
                <p>Ngày hết hạn</p>
              </th>
              <th>
                <p>Hạn sử dụng</p>
              </th>
              <th>
                <p>Trạng thái</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => {
              return (
                <tr
                  ref={test}
                  onClick={() =>
                    handleUpdateCoupon(
                      coupon._id
                      // coupon.title,
                      // coupon.category
                    )
                  }
                  key={index}
                >
                  {/* <td>
                    <img src={category.icon}></img>
                  </td> */}
                  <td>{index + 1}</td>
                  <td>{coupon.code}</td>
                  <td>{dollarUSLocale.format(coupon.value)}</td>
                  <td>
                    {coupon.expiredAt
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      // style={
                      //   refStatus.current.textContent == "Hết hạn"
                      //     ? { backgroundColor: "lightcoral" }
                      //     : { backgroundColor: "lightgreen" }
                      // }
                      className={clsx(cx("status"))}
                    >
                      {coupon.expiredAt < currentDate.toISOString() ? (
                        <p
                          style={{ backgroundColor: "lightcoral" }}
                          ref={refStatus}
                        >
                          Hết hạn
                        </p>
                      ) : (
                        <p
                          style={{ backgroundColor: "lightgreen" }}
                          ref={refStatus}
                        >
                          Còn hạn
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    {coupon.active == true ? (
                      <p
                        style={{ backgroundColor: "lightgreen" }}
                        ref={refStatus}
                      >
                        Đang bật
                      </p>
                    ) : (
                      <p
                        style={{ backgroundColor: "lightcoral" }}
                        ref={refStatus}
                      >
                        Đang tắt
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div
        onClick={handleCancel}
        className={clsx(cx("modal-add-brand"), {
          [styles.activemodaladd]: toggleModalAdd3,
        })}
      >
        <div
          ref={refModal}
          onClick={(e) => e.stopPropagation()}
          className={clsx(cx("modal"))}
        >
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-header"))}
          >
            <h3>HIGH TECH</h3>
          </div>
          <div style={{ animation: "none" }} className={clsx(cx("modal-body"))}>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Tên</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Mã code</p>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></input>
            </div>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Giá giảm</p>
              <input
                type="number"
                value={giagiam}
                onChange={(e) => setGiagiam(e.target.value)}
              ></input>
            </div>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Ngày hết hạn</p>
              <input
                type="date"
                value={expiredAt.substring(0,10)}
                // onChange={(e) => setExpiredAt(e.target.value)}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setExpiredAt(date.toISOString())
                }}
              ></input>
            </div>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Số lượng</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
            </div>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Bật/Tắt</p>
              {/* <input
                type="date"
                // value={titleCategory}
                // onChange={(e) => setTitleCategory(e.target.value)}
              ></input> */}
              <div
                onClick={() => setToggleOnOff(!toggleOnOff)}
                className={clsx(cx("onoffbutton"), {
                  [styles.onToggle2]: toggleOnOff,
                })}
              >
                <div
                  className={clsx({
                    [styles.onToggle]: toggleOnOff,
                  })}
                ></div>
                <p
                  className={clsx({
                    [styles.onToggle3]: toggleOnOff,
                  })}
                >
                  Tắt
                </p>
                <p
                  className={clsx({
                    [styles.onToggle3]: !toggleOnOff,
                  })}
                >
                  Bật
                </p>
              </div>
            </div>
          </div>
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-footer"))}
          >
            <button onClick={handleCancel}>Hủy</button>
            <button
              className={clsx({
                [styles.hidebutton]: toggleButton,
              })}
              onClick={handleDeleteBrand}
            >
              Xóa
            </button>
            <button
              className={clsx({
                [styles.hidebutton]: !toggleButton,
              })}
              onClick={handleAddNewCategory}
            >
              Lưu
            </button>
            <button
              className={clsx({
                [styles.hidebutton]: toggleButton,
              })}
              onClick={handleUpdateBrand}
            >
              Lưu
            </button>
          </div>
        </div>
        <div
          ref={refMessage}
          className={clsx(cx("modal"), {
            [styles.offMess]: !toggleMessage,
          })}
        ></div>
      </div>

      <div
        onClick={handleCancel}
        className={clsx(cx("modal-add-brand"), {
          [styles.activemodaladd]: toggleModalAdd4,
        })}
      >
        <div
          ref={refModal2}
          style={{ animation: "none" }}
          onClick={(e) => e.stopPropagation()}
          className={clsx(cx("modal"))}
        >
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-header"))}
          >
            <h3>HIGH TECH</h3>
            <p>Cập Nhật Thương Hiệu</p>
          </div>
          <div style={{ animation: "none" }} className={clsx(cx("modal-body"))}>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Tên</p>
              <input
                value={titleCategory}
                onChange={(e) => setTitleCategory(e.target.value)}
              ></input>
            </div>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Hình Ảnh</p>
              <input type="file" onChange={(e) => handleUpdateFile2(e)}></input>
              <img
                style={{ width: "100px" }}
                src={
                  typeof imageIconUpdate == "object"
                    ? URL.createObjectURL(imageIconUpdate)
                    : imageIconUpdate
                }
              ></img>
            </div>
          </div>
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-footer"))}
          >
            <button onClick={handleCancel}>Hủy</button>
            <button onClick={handleDeleteCategory}>Xóa</button>
            <button onClick={handleUpdateCate}>Lưu</button>
          </div>
        </div>
      </div>

      <div
        onClick={() => setToggleModalAdd5(false)}
        className={clsx(cx("modal-add-brand"), {
          [styles.activemodaladd]: toggleModalAdd5,
        })}
      >
        <div
          ref={refModal3}
          style={{ animation: "none" }}
          onClick={(e) => e.stopPropagation()}
          className={clsx(cx("modal"))}
        >
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-header"))}
          >
            <img
              style={{ width: "100px", height: "100px" }}
              src={warning}
            ></img>
            <h3>Bạn muốn xóa thương hiệu này ?</h3>
          </div>
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-footer"))}
          >
            <button onClick={handleDeleteBrand2}>Xóa</button>
            <button onClick={() => setToggleModalAdd5(false)}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coupon;
