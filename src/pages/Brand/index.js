import styles from "./Brand.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg, BsCaretDownFill } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const warning = require("../Category/assets/imgs/warning.png");

function Brand() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const brandSave = JSON.parse(localStorage.getItem("currentBrand"));
  let navigate = useNavigate();
  console.log(brandSave);
  const refCate = useRef();
  const refIDCate = useRef();
  const refBrandID = useRef();
  const refModal = useRef();
  const refModal2 = useRef();
  const refModal3 = useRef();

  // const currentIdCate = useRef();
  // const currentTitleCate = useRef();
  // const currentIdBrand = useRef();

  // console.log(currentIdCate.current, currentTitleCate.current);

  const test = useRef();

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);

  const [title, setTitle] = useState("");
  const [titleCategory, setTitleCategory] = useState("");
  const [imageIcon, setImageIcon] = useState();

  const [imageIconUpdate, setImageIconUpdate] = useState();

  const [nextType, setNextType] = useState();

  const [toggleModalAdd, setToggleModalAdd] = useState(false);
  const [toggleModalAdd2, setToggleModalAdd2] = useState(false);
  const [toggleModalAdd3, setToggleModalAdd3] = useState(false);
  const [toggleModalAdd4, setToggleModalAdd4] = useState(false);
  const [toggleModalAdd5, setToggleModalAdd5] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleDropDownFilter, setToggleDropDownFilter] = useState(false);
  const [toggleOnOff, setToggleOnOff] = useState(false);

  const [currentIDCate, setCurrentIDCate] = useState("");
  const [currentTitleCate, setCurrentTitleCate] = useState("");
  const [currentIDBrand, setCurrentIDBrand] = useState("");
  const [currentTitleBrand, setCurrentTitleBrand] = useState("");

  const [currentTitleFilter, setCurrentTitleFilter] = useState(brandSave.name);
  const [currentIDFilter, setCurrentIDFilter] = useState(brandSave.id);

  console.log(currentIDCate, currentTitleCate, currentIDBrand);

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

  const handleToggleModal = (title, id) => {
    refCate.current = title;
    refIDCate.current = id;
    setTitle("");
    setToggleModalAdd(true);
  };

  const handleToggleModal2 = (title, brandID, id, titleCate) => {
    // refIDCate.current = id;
    // refCate.current = titleCate;
    // refBrandID.current = brandID;
    setTitle(title);
    setToggleModalAdd2(true);
  };

  const handleToggleModalAddCategory = () => {
    setToggleModalAdd3(true);
  };

  const handleAddNewBrand = () => {
    fetch("http://quyt.ddns.net:3000/brand/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        title: title,
        category: refIDCate.current,
      }),
    })
      .then((res) => {
        res.json();
        setToggleModalAdd(false);
        window.location.reload(false);
      })
      .then((res) => console.log(res));
  };

  const handleUpdateBrand = () => {
    refModal.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
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
      .then(
        (res) => {
          if (res.code == 200) {
            refModal.current.innerHTML = `<h2>Successful</h2>`;

            setTimeout(() => {
              window.location.reload(false);
            }, 1500);
          }
        }
        // refModal.current.innerHTML = `<h2>Successful</h2>`;

        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 1500);
      );
  };
  const handleDeleteBrand = () => {
    setToggleModalAdd5(true);
  };

  const handleDeleteBrand2 = () => {
    refModal3.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
    fetch(`http://quyt.ddns.net:3000/brand/${currentIDBrand}`, {
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

  const handleUpdateFile = (e) => {
    setImageIcon(e.target.files[0]);
  };

  const handleUpdateFile2 = (e) => {
    setImageIconUpdate(e.target.files[0]);
  };

  const handleAddNewCategory = () => {
    refModal.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
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
        refModal.current.innerHTML = `<h2>Tác Vụ Thành Công</h2>`;

        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
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
    setToggleModalAdd3(false);
    setToggleButton(true);
    setTitleCategory("");
    setToggleDropDown(false);
    setCurrentIDCate(categorys[0]._id);
    currentTitleCate.current = categorys[0].title;
  };
  const handleChangeCurrentCate = (title, id) => {
    setCurrentTitleCate(title);
    setCurrentIDCate(id);
    setToggleDropDown(false);
  };
  console.log(currentTitleBrand == titleCategory);
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
    <div className={clsx(cx("container"))}>
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
            <p onClick={() => { setCurrentTitleFilter("Tất Cả"); localStorage.setItem(
              "currentBrand",
              JSON.stringify({
                name: 'Tất Cả',
                id: null,
              })
            ); }}>Tất cả</p>
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
                      {/* <td>
                    <img src={category.icon}></img>
                  </td> */}
                      <td>{index + 1}</td>
                      <td>{brand.title}</td>
                      <td>
                        {/* {brand.createdAt
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")} */}
                        {moment(brand.createdAt).format("DD-MM-yyy HH:mm A")}
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
                            brand3.category
                          )
                        }
                        key={index3}
                      >
                        {/* <td>
                    <img src={category.icon}></img>
                  </td> */}
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
          onClick={(e) => { e.stopPropagation(); setToggleDropDown(false); }}
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
            {/* <button
              className={clsx({
                [styles.hidebutton]: toggleButton,
              })}
              onClick={handleDeleteBrand}
            >
              Xóa
            </button> */}
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
      </div>

      {/* <div
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
      </div> */}

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

export default Brand;
