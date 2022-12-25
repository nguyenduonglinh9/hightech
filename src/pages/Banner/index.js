import styles from "./Banner.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const warning = require("../Category/assets/imgs/warning.png");
const success = require("./assets/imgs/success.png");

function Banner() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();
  const isLogin2 = JSON.parse(localStorage.getItem("isLogin"));
  if (isLogin2["isLoggin"] === false) {
    navigate("/");
  }

  const refIDCate = useRef();
  const refModal = useRef();
  const refModal2 = useRef();
  const refModal3 = useRef();

  const refMessage = useRef();
  const refMessage2 = useRef();

  const [categorys, setCategorys] = useState([]);
  const [banner, setBanner] = useState([]);
  const [image, setImage] = useState();
  const [titleCategory, setTitleCategory] = useState("");

  const [toggleModalAdd3, setToggleModalAdd3] = useState(false);
  const [toggleModalAdd5, setToggleModalAdd5] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleDropDownFilter, setToggleDropDownFilter] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);
  const [toggleMessage2, setToggleMessage2] = useState(false);


  const [currentIDCate, setCurrentIDCate] = useState("");
  const [currentTitleCate, setCurrentTitleCate] = useState("");
  const [currentIDBanner, setCurrentIDBaner] = useState()


  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/banner/", {
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
        setBanner((prev) => [...prev, ...data.data]);
      });
  }, []);

  const handleToggleModalAddCategory = () => {
    setToggleModalAdd3(true);
  };

  const handleUpdateBrand = () => {

    const div2 = document.createElement("div");
    div2.style.width = "50px";
    div2.style.height = "50px";
    div2.style.border = "7px solid transparent";
    div2.style.borderTop = "7px solid rgb(3, 201, 215)";
    div2.style.borderRadius = "50%";
    refMessage.current.appendChild(div2);
    setToggleMessage(true);
    if (typeof image == 'object') {
      var promise = new Promise(function (resolve, reject) {
        const dataImage = new FormData();
        let URLIcon;
        dataImage.append("files", image);
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
        fetch(`http://quyt.ddns.net:3000/banner/${currentIDBanner}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": DataLogin.token,
          },
          body: JSON.stringify({
            image: URLIcon,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.code == 200) {
              const div = document.createElement("div");
              const h2 = document.createElement("h2");
              const img = document.createElement("img");
              h2.innerText = "Tác Vụ Thành Công !";
              img.setAttribute("src", success);
              img.style.width = "100px";
              img.style.margin = "auto";
              div.style.animation = "none";
              div.style.display = "flex";
              div.style.flexDirection = "column";
              div.style.alignItems = "center";
              div.appendChild(img);
              div.appendChild(h2);
              refMessage.current.removeChild(div2);
              refMessage.current.appendChild(div);
              setTimeout(() => {
                window.location.reload(false);
                refMessage.current.removeChild(div);
              }, 1500);
            } else {
              const h2 = document.createElement("h2");
              const button = document.createElement("button");
              h2.innerText = res.message;
              button.innerText = "Thử lại";
              button.addEventListener("click", () => {
                refMessage.current.removeChild(h2);
                refMessage.current.removeChild(button);
                setToggleMessage(false);
              });
              refMessage.current.removeChild(div2);
              refMessage.current.appendChild(h2);
              refMessage.current.appendChild(button);
            }

            console.log(res);
          })
          .catch((err) => {
            refModal.current.innerHTML = `<h2>${err}</h2>`;
          });
      });
    }
    else {
      fetch(`http://quyt.ddns.net:3000/banner/${currentIDBanner}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          image: image,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code == 200) {
            const div = document.createElement("div");
            const h2 = document.createElement("h2");
            const img = document.createElement("img");
            h2.innerText = "Tác Vụ Thành Công !";
            img.setAttribute("src", success);
            img.style.width = "100px";
            img.style.margin = "auto";
            div.style.animation = "none";
            div.style.display = "flex";
            div.style.flexDirection = "column";
            div.style.alignItems = "center";
            div.appendChild(img);
            div.appendChild(h2);
            refMessage.current.removeChild(div2);
            refMessage.current.appendChild(div);
            setTimeout(() => {
              window.location.reload(false);
              refMessage.current.removeChild(div);
            }, 1500);
          } else {
            const h2 = document.createElement("h2");
            const button = document.createElement("button");
            h2.innerText = res.message;
            button.innerText = "Thử lại";
            button.addEventListener("click", () => {
              refMessage.current.removeChild(h2);
              refMessage.current.removeChild(button);
              setToggleMessage(false);
            });
            refMessage.current.removeChild(div2);
            refMessage.current.appendChild(h2);
            refMessage.current.appendChild(button);
          }

          console.log(res);
        })
        .catch((err) => {
          refModal.current.innerHTML = `<h2>${err}</h2>`;
        });
    }
  };
  const handleDeleteBrand = () => {
    setToggleModalAdd5(true);
  };

  const handleDeleteBrand2 = () => {

     const div2 = document.createElement("div");
     div2.style.width = "50px";
     div2.style.height = "50px";
     div2.style.border = "7px solid transparent";
     div2.style.borderTop = "7px solid rgb(3, 201, 215)";
     div2.style.borderRadius = "50%";
     refMessage2.current.appendChild(div2);
     setToggleMessage2(true);
  
    fetch(`http://quyt.ddns.net:3000/banner/${currentIDBanner}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => {
        res.json()
      })
      .then((res) => {
        console.log(res)
        // if (res.code == 200) {
          const div = document.createElement("div");
          const h2 = document.createElement("h2");
          const img = document.createElement("img");
          h2.innerText = "Tác Vụ Thành Công !";
          img.setAttribute("src", success);
          img.style.width = "100px";
          img.style.margin = "auto";
          div.style.animation = "none";
          div.style.display = "flex";
          div.style.flexDirection = "column";
          div.style.alignItems = "center";
          div.appendChild(img);
          div.appendChild(h2);
          refMessage2.current.removeChild(div2);
          refMessage2.current.appendChild(div);
          setTimeout(() => {
            window.location.reload(false);
            refMessage2.current.removeChild(div);
          }, 1500);
        // }
        // else {
        //   const h2 = document.createElement("h2");
        //   const button = document.createElement("button");
        //   h2.innerText = res.message;
        //   button.innerText = "Thử lại";
        //   button.addEventListener("click", () => {
        //     refMessage.current.removeChild(h2);
        //     refMessage.current.removeChild(button);
        //     setToggleMessage(false);
        //   });
        //   refMessage.current.removeChild(div2);
        //   refMessage.current.appendChild(h2);
        //   refMessage.current.appendChild(button);
        // }
      });
  };

  const handleAddNewCategory = () => {
    if (image == null) {
      setToggleMessage(true);
      const h2 = document.createElement("h2");
      const button = document.createElement("button");
      h2.innerText = "Vui lòng không để trống ô chọn ảnh !";
      button.innerText = "Chọn lại";
      button.addEventListener("click", () => {
        refMessage.current.removeChild(h2);
        refMessage.current.removeChild(button);
        setToggleMessage(false);
      });
      refMessage.current.appendChild(h2);
      refMessage.current.appendChild(button);
    } else {
      const div2 = document.createElement("div");
      div2.style.width = "50px";
      div2.style.height = "50px";
      div2.style.border = "7px solid transparent";
      div2.style.borderTop = "7px solid rgb(3, 201, 215)";
      div2.style.borderRadius = "50%";
      refMessage.current.appendChild(div2);
      setToggleMessage(true);

      var promise = new Promise(function (resolve, reject) {
        const dataImage = new FormData();
        let URLIcon;
        dataImage.append("files", image);
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
        fetch("http://quyt.ddns.net:3000/banner/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": DataLogin.token,
          },
          body: JSON.stringify({
            image: URLIcon,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.code == 200) {
              const div = document.createElement("div");
              const h2 = document.createElement("h2");
              const img = document.createElement("img");
              h2.innerText = "Tác Vụ Thành Công !";
              img.setAttribute("src", success);
              img.style.width = "100px";
              img.style.margin = "auto";
              div.style.animation = "none";
              div.style.display = "flex";
              div.style.flexDirection = "column";
              div.style.alignItems = "center";
              div.appendChild(img);
              div.appendChild(h2);
              refMessage.current.removeChild(div2);
              refMessage.current.appendChild(div);
              setTimeout(() => {
                window.location.reload(false);
                refMessage.current.removeChild(div);
              }, 1500);
            } else {
              const h2 = document.createElement("h2");
              const button = document.createElement("button");
              h2.innerText = res.message;
              button.innerText = "Thử lại";
              button.addEventListener("click", () => {
                refMessage.current.removeChild(h2);
                refMessage.current.removeChild(button);
                setToggleMessage(false);
              });
              refMessage.current.removeChild(div2);
              refMessage.current.appendChild(h2);
              refMessage.current.appendChild(button);
            }

            console.log(res);
          })
          .catch((err) => {
            refModal.current.innerHTML = `<h2>${err}</h2>`;
          });
      });
    }
  };

  const handleUpdateBanner1 = (id, image) => {
    setCurrentIDBaner(id);
    setImage(image);
    setToggleModalAdd3(true);
    setToggleButton(false)
  }

  const handleCancel = () => {
    setToggleModalAdd3(false);
    setToggleButton(true);
    setTitleCategory("");
    setCurrentIDCate(categorys[0]._id);
    currentTitleCate.current = categorys[0].title;
  };

  return (
    <div className={clsx(cx("container"))}>
      {/* <div className={clsx(cx("container-header"))}>
        <div
          onClick={() => setToggleDropDownFilter(!toggleDropDownFilter)}
          className={clsx(cx("drop-down-current"))}
        >
          <div>
            <p>{currentTitleFilter}</p>
            <FaArrowDown
              style={
                toggleDropDownFilter == true
                  ? {
                      transform: "rotate(180deg)",
                      transition: "all 0.3s linear",
                    }
                  : { transition: "all 0.3s linear" }
              }
            />
          </div>
          <div
            className={clsx(cx("drop-down-option"), {
              [styles.turnonDropDown]: toggleDropDownFilter,
            })}
          >
            <p onClick={()=>setCurrentTitleFilter('Tất cả')}>Tất cả</p>
            {categorys.map((item, index) => {
              return <p onClick={()=>handleFilter(item._id,item.title)} key={index}>{item.title}</p>;
            })}
          </div>
        </div>
      </div> */}
      <div className={clsx(cx("listcategory"))}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ margin: "0px" }}>Danh Sách Banner</h3>
          </div>
          <div
            onClick={handleToggleModalAddCategory}
            className={clsx(cx("button-add-new"))}
          >
            <p>Thêm</p>
          </div>
        </div>
        <div className={clsx(cx("listbanner"))}>
          {banner.map((item, index) => {
            return (
              <img
                onClick={() => handleUpdateBanner1(item._id, item.image)}
                src={item.image}
              ></img>
            );
          })}
        </div>
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
              <p>Hình Ảnh</p>
              <input
                type="file"
                // value="Hình ảnh"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <div
                style={{
                  animation: "none",
                  width: "fit-content",
                  position: "relative",
                  marginTop: "10px",
                }}
              >
                <img
                  style={{
                    width: "250px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    marginTop: "15px",
                    borderRadius: "10px",
                  }}
                  src={
                    image == null
                      ? null
                      : typeof image == "object"
                      ? URL.createObjectURL(image)
                      : image
                  }
                ></img>
                <BsXCircleFill
                  onClick={() => setImage(null)}
                  style={
                    image == null
                      ? { display: "none" }
                      : {
                          display: "inline-block",
                          position: "absolute",
                          color: "red",
                        }
                  }
                />
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
          style={{ zIndex: "5" }}
          ref={refMessage}
          className={clsx(cx("modal"), {
            [styles.turnOffMessage]: !toggleMessage,
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
            <h3>Bạn muốn xóa banner này ?</h3>
          </div>
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-footer"))}
          >
            <button onClick={handleDeleteBrand2}>Xóa</button>
            <button onClick={() => setToggleModalAdd5(false)}>Hủy</button>
          </div>
        </div>

        <div ref={refMessage2} className={clsx(cx("modal"), {
          [styles.turnOffMessage] : !toggleMessage2
        })}>

        </div>
      </div>
    </div>
  );
}

export default Banner;
