import styles from "./Category.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { browserHistory } from "react-router";
const warning = require("../Category/assets/imgs/warning.png");
const imageicon = require("../Category/assets/imgs/image.png");

function Category() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();

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
  const refMessage = useRef();
  const refMessage2 = useRef();


  const test = useRef();

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [title, setTitle] = useState("");
  const [titleCategory, setTitleCategory] = useState("");
  const [imageIcon, setImageIcon] = useState();
  const [imageIconUpdate, setImageIconUpdate] = useState();
  const [nextType, setNextType] = useState();
  const [arrType, setArrType] = useState();

  const [toggleModalAdd, setToggleModalAdd] = useState(false);
  const [toggleModalAdd3, setToggleModalAdd3] = useState(false);
  const [toggleModalAdd4, setToggleModalAdd4] = useState(false);
  const [toggleModalAdd5, setToggleModalAdd5] = useState(false);
  const [toggleOnOff, setToggleOnOff] = useState(false);
  const [toggleModalMessage, setToggleModalMessage] = useState(false);
  const [toggleModalMessage2, setToggleModalMessage2] = useState(false);


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
        setArrType(
          data.data.map((item) => {
            return Number(item.type);
          })
        );
        setCategorys((prev) => [...prev, ...data.data]);
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

  const handleToggleModalAddCategory = () => {
    setToggleModalAdd3(true);
  };

  const handleUpdateFile = (e) => {
    setImageIcon(e.target.files[0]);
  };

  const handleUpdateFile2 = (e) => {
    setImageIconUpdate(e.target.files[0]);
  };

  const handleAddNewCategory = () => {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.border = "7px solid transparent";
    div.style.borderRadius = "50%";
    div.style.borderTop = "7px solid rgb(3, 201, 215)";
    refMessage.current.appendChild(div);
    setToggleModalMessage(true);

    var promise = new Promise(function (resolve, reject) {
      //xử lý hình ảnh
      const dataImage = new FormData();

      let URLIcon;

      dataImage.append("files", imageIcon);
      fetch("http://quyt.ddns.net:2607", {
        method: "POST",
        body: dataImage,
      })
        .then((res) => res.json())
        .then((res) => {
          URLIcon = res.data[0];
          resolve(URLIcon);
        })
        .catch((err) => console.log(err));
    });
    promise.then((URLIcon) => {
      
      fetch("http://quyt.ddns.net:3000/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          title: titleCategory,
          icon: URLIcon,
          active: toggleOnOff,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code == 200) {
            refMessage.current.removeChild(div);
            const h2 = document.createElement("h2");
            h2.innerText = "Tác Vụ Thành Công";
            refMessage.current.appendChild(h2);
            setToggleModalMessage(true);

            setTimeout(() => {
              setTitleCategory("");
              setToggleOnOff(false);
              setToggleModalAdd3(false);
              setToggleModalMessage(false);
              refMessage.current.removeChild(h2);
              window.location.reload();
            }, 1500);
          } else {
            refMessage.current.removeChild(div);
            const divError = document.createElement("div");
            divError.style.animation = "none";
            divError.style.display = "flex";
            divError.style.flexDirection = "column";
            divError.style.alignItems = "center";
            const h2 = document.createElement("h2");
            h2.innerText = res.message;
            const button = document.createElement("button");
            button.innerText = "Thử Lại";
            button.addEventListener("click", () => {
              refMessage.current.removeChild(divError);
              setToggleModalMessage(false);
            });
            divError.appendChild(h2);
            divError.appendChild(button);
            refMessage.current.appendChild(divError);
          }
        })
        .catch((err) => {
          refModal.current.innerHTML = `<h2>${err}</h2>`;
        });
    });
  };

  const handleUpdateCategory = (id, title, icon, active) => {
    setTitleCategory(title);
    refIDCate.current = id;
    setImageIconUpdate(icon);
    setToggleModalAdd4(true);
    setToggleOnOff(active);
  };

  const handleUpdateCate = () => {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.border = "7px solid transparent";
    div.style.borderRadius = "50%";
    div.style.borderTop = "7px solid rgb(3, 201, 215)";
    refMessage2.current.appendChild(div);
    setToggleModalMessage2(true);
    
    if (typeof imageIconUpdate == "object") {
      var promise = new Promise(function (resolve, reject) {
        //xử lý hình ảnh
        const dataImage = new FormData();
        let URLIcon;
        dataImage.append("files", imageIconUpdate);
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
            active: toggleOnOff,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.code == 200) {

              refMessage2.current.removeChild(div);
              const h2 = document.createElement("h2");
              h2.innerText = "Tác Vụ Thành Công";
              refMessage2.current.appendChild(h2);
              setToggleModalMessage2(true);

              setTimeout(() => {
                setToggleOnOff(false);
                setToggleModalAdd3(false);
                setToggleModalMessage2(false);
                // refMessage2.current.removeChild(h2);
                window.location.reload();
              }, 1500);
            } else {
              refMessage2.current.removeChild(div);
              const divError = document.createElement("div");
              divError.style.animation = "none";
              divError.style.display = "flex";
              divError.style.flexDirection = "column";
              divError.style.alignItems = "center";
              const h2 = document.createElement("h2");
              h2.innerText = res.message;
              const button = document.createElement("button");
              button.innerText = "Thử Lại";
              button.addEventListener("click", () => {
                refMessage2.current.removeChild(divError);
                setToggleModalMessage2(false);
              });
              divError.appendChild(h2);
              divError.appendChild(button);
              refMessage2.current.appendChild(divError);
            }
          })
          .catch((err) => {
            refModal2.current.innerHTML = `<h2>${err}</h2>`;
          });
      });
    } else {
      fetch(`http://quyt.ddns.net:3000/category/${refIDCate.current}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          title: titleCategory,
          icon: imageIconUpdate,
          active: toggleOnOff,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
           if (res.code == 200) {
             refMessage2.current.removeChild(div);
             const h2 = document.createElement("h2");
             h2.innerText = "Tác Vụ Thành Công";
             refMessage2.current.appendChild(h2);
             setToggleModalMessage2(true);

             setTimeout(() => {
               setToggleOnOff(false);
               setToggleModalAdd3(false);
               setToggleModalMessage2(false);
               refMessage2.current.removeChild(h2);
               window.location.reload();
             }, 1500);
           } else {
             refMessage2.current.removeChild(div);
             const divError = document.createElement("div");
             divError.style.animation = "none";
             divError.style.display = "flex";
             divError.style.flexDirection = "column";
             divError.style.alignItems = "center";
             const h2 = document.createElement("h2");
             h2.innerText = res.message;
             const button = document.createElement("button");
             button.innerText = "Thử Lại";
             button.addEventListener("click", () => {
               refMessage2.current.removeChild(divError);
               setToggleModalMessage2(false);
             });
             divError.appendChild(h2);
             divError.appendChild(button);
             refMessage2.current.appendChild(divError);
           }
        })
        .catch((err) => {
          refModal2.current.innerHTML = `<h2>${err}</h2>`;
        });
    }
  };

  const handleDeleteCategory2 = () => {
    refModal3.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
    fetch(`http://quyt.ddns.net:3000/category/${refIDCate.current}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        refModal3.current.innerHTML = `<h2>Successful</h2>`;

        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch((err) => (refModal3.current.innerHTML = `<h2>${err}</h2>`));
  };

  const handleCancel = () => {
    setTitleCategory("");
    setToggleModalAdd4(false);
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
            <h3 style={{ margin: "0px" }}>Danh Sách Danh Mục</h3>
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
                <p>Hình Ảnh</p>
              </th>
              <th>
                <p>Tên</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((category, index) => {
              return (
                <tr
                  ref={test}
                  onClick={() =>
                    handleUpdateCategory(
                      category._id,
                      category.title,
                      category.icon,
                      category.active
                    )
                  }
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>
                    <img src={category.icon}></img>
                  </td>
                  <td>{category.title}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div
        onClick={() => setToggleModalAdd3(false)}
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
            <p>Thêm Mới Danh Mục</p>
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
              <input type="file" onChange={(e) => handleUpdateFile(e)}></input>
              <img
                style={{ width: "100px" }}
                src={
                  imageIcon == null ? undefined : URL.createObjectURL(imageIcon)
                }
              ></img>
            </div>
            <div className={clsx(cx("modal-body-group"))}>
              <p style={{ fontWeight: "bold" }}>Trạng Thái Sản Phẩm</p>
              <div
                style={{ animation: "none" }}
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
            <button onClick={() => setToggleModalAdd3(false)}>Hủy</button>
            <button onClick={handleAddNewCategory}>Lưu</button>
          </div>
        </div>
        <div
          ref={refMessage}
          className={clsx(cx("modal-message"), {
            [styles.turnonMessage]: toggleModalMessage,
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
            <p>Cập Nhật Danh Mục</p>
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
            <div className={clsx(cx("modal-body-group"))}>
              <p style={{ fontWeight: "bold" }}>Trạng Thái Sản Phẩm</p>
              <div
                style={{ animation: "none" }}
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
            {/* <button onClick={handleDeleteCategory}>Xóa</button> */}
            <button onClick={handleUpdateCate}>Lưu</button>
          </div>
        </div>
        <div
          ref={refMessage2}
          className={clsx(cx("modal-message"), {
            [styles.turnonMessage]: toggleModalMessage2,
          })}
        ></div>
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
            <h3>Bạn muốn xóa danh mục này ?</h3>
          </div>
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-footer"))}
          >
            <button onClick={handleDeleteCategory2}>Xóa</button>
            <button onClick={() => setToggleModalAdd5(false)}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
