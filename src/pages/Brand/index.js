import styles from "./Brand.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsCaretDownFill } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import moment from "moment";
const warning = require("../Category/assets/imgs/warning.png");

function Brand() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const brandSave = JSON.parse(localStorage.getItem("currentBrand"));

  const refCate = useRef();
  const refIDCate = useRef();
  const refModal = useRef();
  const refModal3 = useRef();
  const test = useRef();
  const refMessage = useRef();
  const refContainer = useRef();


  // useEffect(() => {
  //   window.addEventListener('wheel', (e) => {
  //     console.dir(refContainer.current);
  //   })
  // },[])

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [titleCategory, setTitleCategory] = useState("");
  const [nextType, setNextType] = useState();
  const [currentIDCate, setCurrentIDCate] = useState("");
  const [currentTitleCate, setCurrentTitleCate] = useState("");
  const [currentIDBrand, setCurrentIDBrand] = useState("");
  const [currentTitleBrand, setCurrentTitleBrand] = useState("");
  const [currentTitleFilter, setCurrentTitleFilter] = useState(brandSave.name);
  const [currentIDFilter, setCurrentIDFilter] = useState(brandSave.id);

  const [toggleModalAdd3, setToggleModalAdd3] = useState(false);
  const [toggleModalAdd5, setToggleModalAdd5] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleDropDownFilter, setToggleDropDownFilter] = useState(false);
  const [toggleOnOff, setToggleOnOff] = useState(false);
  const [toggleModalMessage, setToggleModalMessage] = useState(false);

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
        setCurrentIDCate(data.data[0]._id);
        setCurrentTitleCate(data.data[0].title);
      });
  }, [toggleModalAdd3]);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/brand/?all=true", {
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

  const handleUpdateBrand = () => {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.border = "7px solid transparent";
    div.style.borderRadius = "50%";
    div.style.borderTop = "7px solid rgb(3, 201, 215)";
    refMessage.current.appendChild(div);
    setToggleModalMessage(true);

    fetch(`http://quyt.ddns.net:3000/brand/${currentIDBrand}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        title: titleCategory,
        category: currentIDCate,
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
            window.location.reload()
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
      });
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

    fetch("http://quyt.ddns.net:3000/brand/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        title: titleCategory,
        category: currentIDCate,
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
  };

  const handleUpdateCategory = (id, title, category, active) => {
    const currentTitle = categorys.find((item) => item._id == category);
    setTitleCategory(title);
    setCurrentIDBrand(id);
    setCurrentIDCate(category);
    setCurrentTitleCate(currentTitle.title);
    const titleBrand = brands.find((item2) => item2._id == id);
    setCurrentTitleBrand(titleBrand.title);
    setToggleOnOff(active);
    setToggleModalAdd3(true);
    setToggleButton(false);
  };

  const handleCancel = () => {
    setToggleButton(true);
    setTitleCategory("");
    setToggleModalAdd3(false);
    setToggleDropDown(false);
    setCurrentIDCate(categorys[0]._id);
    currentTitleCate.current = categorys[0].title;
  };
  const handleChangeCurrentCate = (title, id) => {
    setCurrentTitleCate(title);
    setCurrentIDCate(id);
    setToggleDropDown(false);
  };

  const handleFilter = (id, title) => {
    setCurrentTitleFilter(title);
    setCurrentIDFilter(id);
    setToggleDropDownFilter(false);
    localStorage.setItem(
      "currentBrand",
      JSON.stringify({
        name: title,
        id: id,
      })
    );
  };

  return (
    <div ref={refContainer} className={clsx(cx("container"))}>
      <div className={clsx(cx("container-header"))}>
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
            <p
              onClick={() => {
                setCurrentTitleFilter("Tất Cả");
                localStorage.setItem(
                  "currentBrand",
                  JSON.stringify({
                    name: "Tất Cả",
                    id: null,
                  })
                );
              }}
            >
              Tất cả
            </p>
            {categorys.map((item, index) => {
              return (
                <p
                  onClick={() => handleFilter(item._id, item.title)}
                  key={index}
                >
                  {item.title}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className={clsx(cx("listcategory"))}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ margin: "0px" }}>Danh Sách Thương Hiệu</h3>
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
                <p>Tên</p>
              </th>
              <th>
                <p>Ngày Thêm</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTitleFilter == "Tất Cả"
              ? brands.map((brand, index) => {
                  return (
                    <tr
                      ref={test}
                      onClick={() =>
                        handleUpdateCategory(
                          brand._id,
                          brand.title,
                          brand.category,
                          brand.active
                        )
                      }
                      key={index}
                    >
                      <td>{index + 1}</td>
                      <td>{brand.title}</td>
                      <td>
                        {moment(brand.createdAt).format("DD-MM-yyyy HH:mm:ss")}
                      </td>
                    </tr>
                  );
                })
              : brands
                  .filter((brand2, index2) => {
                    return brand2.category == currentIDFilter;
                  })
                  .map((brand3, index3) => {
                    return (
                      <tr
                        ref={test}
                        onClick={() =>
                          handleUpdateCategory(
                            brand3._id,
                            brand3.title,
                            brand3.category,
                            brand3.active
                          )
                        }
                        key={index3}
                      >
                        <td>{index3 + 1}</td>
                        <td>{brand3.title}</td>
                        <td>
                          {brand3.createdAt
                            .substring(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
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
          onClick={(e) => {
            e.stopPropagation();
            setToggleDropDown(false);
          }}
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
                value={titleCategory}
                onChange={(e) => setTitleCategory(e.target.value)}
              ></input>
            </div>
            <div className={clsx(cx("modal-body-group"))}>
              <p>Trạng Thái</p>
              <div
                style={{ animation: "none" }}
                onClick={() => setToggleOnOff(!toggleOnOff)}
                className={clsx(cx("onoffbutton"), {
                  [styles.onToggle2]: toggleOnOff,
                })}
              >
                <div
                  style={{ animation: "none" }}
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
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Danh Mục</p>
              <div
                onClick={(e) => {
                  e.stopPropagation(0);
                  setToggleDropDown(!toggleDropDown);
                }}
                style={{ animation: "none" }}
                className={clsx(cx("modal-body-group-current-category"))}
              >
                <p>{currentTitleCate}</p>
                <BsCaretDownFill />
              </div>
              <div
                style={{ animation: "none" }}
                className={clsx(cx("modal-body-group-dropdown-category"), {
                  [styles.activedropdown]: toggleDropDown,
                })}
              >
                {categorys.map((category, index) => {
                  return (
                    <p
                      onClick={() =>
                        handleChangeCurrentCate(category.title, category._id)
                      }
                    >
                      {category.title}
                    </p>
                  );
                })}
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
                [styles.hidebutton]: !toggleButton,
              })}
              onClick={handleAddNewCategory}
            >
              Lưu
            </button>
            <button
              style={
                currentTitleBrand === titleCategory
                  ? { opacity: "0.5", pointerEvents: "none" }
                  : null
              }
              disabled={currentTitleBrand === titleCategory ? true : false}
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
          className={clsx(cx("modal-message"), {
            [styles.activemodaladd]: toggleModalMessage,
          })}
        ></div>
      </div>
    </div>
  );
}

export default Brand;
