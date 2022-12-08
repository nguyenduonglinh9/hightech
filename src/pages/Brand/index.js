import styles from "./Brand.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg, BsCaretDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const warning = require("../Category/assets/imgs/warning.png");

function Brand() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();

  const refCate = useRef();
  const refIDCate = useRef();
  const refBrandID = useRef();
  const refModal = useRef();
  const refModal2 = useRef();
  const refModal3 = useRef();

  const currentIdCate = useRef();
  const currentTitleCate = useRef();
  const currentIdBrand = useRef();

  console.log(currentIdCate.current, currentTitleCate.current);

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

  const handleToggleModal = (title, id) => {
    refCate.current = title;
    refIDCate.current = id;
    setTitle("");
    setToggleModalAdd(true);
  };

  const handleToggleModal2 = (title, brandID, id, titleCate) => {
    refIDCate.current = id;
    refCate.current = titleCate;
    refBrandID.current = brandID;
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
    fetch(`http://quyt.ddns.net:3000/brand/${currentIdBrand.current}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        title: titleCategory,
        category: currentIdCate.current,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
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
        category: currentIdCate.current,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        refModal.current.innerHTML = `<h2>Successful</h2>`;

        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch((err) => {
        refModal.current.innerHTML = `<h2>${err}</h2>`;
      });
  };

  const handleUpdateCategory = (id, title, category) => {
    const currentTitle = categorys.find((item) => item._id == category);
    setTitleCategory(title);
    currentIdBrand.current = id;
    currentIdCate.current = category;
    currentTitleCate.current = currentTitle.title;
    setToggleModalAdd3(true);
    setToggleButton(false);
  };

  const handleUpdateCate = () => {
    refModal2.current.innerHTML = `
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
            <h3 style={{ margin: "0px" }}>CATEGORYS</h3>
          </div>
          <div
            onClick={handleToggleModalAddCategory}
            className={clsx(cx("button-add-new"))}
          >
            <p>Add</p>
          </div>
        </div>

        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>Name</p>
              </th>
              <th>
                <p>Id</p>
              </th>
              <th>
                <p>Date</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => {
              return (
                <tr
                  ref={test}
                  onClick={() =>
                    handleUpdateCategory(brand._id, brand.title, brand.category)
                  }
                  key={index}
                >
                  {/* <td>
                    <img src={category.icon}></img>
                  </td> */}
                  <td>{brand.title}</td>
                  <td>{brand._id}</td>
                  <td>{brand.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* <div
        onClick={() => {
          setToggleModalAdd(false);
        }}
        className={clsx(cx("modal-add-brand"), {
          [styles.activemodaladd]: toggleModalAdd,
        })}
      >
        <div onClick={(e) => e.stopPropagation()} className={clsx(cx("modal"))}>
          <div className={clsx(cx("modal-header"))}>
            <h3>HIGH TECH</h3>
          </div>
          <div className={clsx(cx("modal-body"))}>
            <div className={clsx(cx("modal-body-group"))}>
              <p>name</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className={clsx(cx("modal-body-group"))}>
              <p>Category</p>
              <input disabled value={refCate.current}></input>
            </div>
          </div>
          <div className={clsx(cx("modal-footer"))}>
            <button
              onClick={() => {
                setTitle("");
                setToggleModalAdd(false);
              }}
            >
              Cancel
            </button>
            <button onClick={handleAddNewBrand}>Save</button>
          </div>
        </div>
      </div> */}

      {/* <div
        onClick={() => setToggleModalAdd2(false)}
        className={clsx(cx("modal-add-brand"), {
          [styles.activemodaladd]: toggleModalAdd2,
        })}
      >
        <div onClick={(e) => e.stopPropagation()} className={clsx(cx("modal"))}>
          <div className={clsx(cx("modal-header"))}>
            <h3>HIGH TECH</h3>
          </div>
          <div className={clsx(cx("modal-body"))}>
            <div className={clsx(cx("modal-body-group"))}>
              <p>name</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className={clsx(cx("modal-body-group"))}>
              <p>Category</p>
              <input disabled value={refCate.current}></input>
            </div>
          </div>
          <div className={clsx(cx("modal-footer"))}>
            <button onClick={() => setToggleModalAdd2(false)}>Cancel</button>
            <button onClick={handleDeleteBrand}>Delete</button>
            <button onClick={handleUpdateBrand}>Update</button>
          </div>
        </div>
      </div> */}

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
            <p>Add New Brand Form</p>
          </div>
          <div style={{ animation: "none" }} className={clsx(cx("modal-body"))}>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>name</p>
              <input
                value={titleCategory}
                onChange={(e) => setTitleCategory(e.target.value)}
              ></input>
            </div>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Category</p>
              <div
                onClick={() => {
                  setToggleDropDown(true);
                }}
                style={{ animation: "none" }}
                className={clsx(cx("modal-body-group-current-category"))}
              >
                <p>{currentTitleCate.current}</p>
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
            <button onClick={handleCancel}>Cancel</button>
            <button
              className={clsx({
                [styles.hidebutton]: toggleButton,
              })}
              onClick={handleDeleteBrand}
            >
              Delete
            </button>
            <button
              className={clsx({
                [styles.hidebutton]: !toggleButton,
              })}
              onClick={handleAddNewCategory}
            >
              Save
            </button>
            <button
              className={clsx({
                [styles.hidebutton]: toggleButton,
              })}
              onClick={handleUpdateBrand}
            >
              Change
            </button>
          </div>
        </div>
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
            <p>Update and Delete Category form</p>
          </div>
          <div style={{ animation: "none" }} className={clsx(cx("modal-body"))}>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>name</p>
              <input
                value={titleCategory}
                onChange={(e) => setTitleCategory(e.target.value)}
              ></input>
            </div>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Icon</p>
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
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleDeleteCategory}>Delete</button>
            <button onClick={handleUpdateCate}>Save</button>
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
            <h3>Do you want to delete this item?</h3>
          </div>
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-footer"))}
          >
            <button onClick={handleDeleteBrand2}>Yes</button>
            <button onClick={() => setToggleModalAdd5(false)}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;
