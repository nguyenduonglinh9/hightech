import styles from "./Category.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const warning = require("../Category/assets/imgs/warning.png");

function Category() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();

  const refCate = useRef();
  const refIDCate = useRef();
  const refBrandID = useRef();
  const refModal = useRef();
  const refModal2 = useRef();
  const refModal3 = useRef();

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


  useEffect(() => {
    fetch("https://fpt-hightech-api.herokuapp.com/category/", {
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
      });
  }, []);

  useEffect(() => {
    fetch("https://fpt-hightech-api.herokuapp.com/brand/", {
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
    fetch("https://fpt-hightech-api.herokuapp.com/brand/", {
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
    fetch(
      `https://fpt-hightech-api.herokuapp.com/brand/${refBrandID.current}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          title: title,
          category: refIDCate.current,
        }),
      }
    )
      .then((res) => {
        res.json();
        setToggleModalAdd2(false);
        window.location.reload(false);
      })
      .then((res) => console.log(res));
  };

  const handleDeleteBrand = () => {
    fetch(
      `https://fpt-hightech-api.herokuapp.com/brand/${refBrandID.current}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
      }
    )
      .then((res) => {
        res.json();
        setToggleModalAdd2(false);
        window.location.reload(false);
      })
      .then((res) => console.log(res));
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
    var promise = new Promise(function (resolve, reject) {
      //xử lý hình ảnh
      const dataImage = new FormData();
      let URLIcon;

      dataImage.append("source", imageIcon);
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
      fetch("https://fpt-hightech-api.herokuapp.com/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify({
          title: titleCategory,
          icon: URLIcon,
          type: nextType + 1,
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
    });
  };

  const handleUpdateCategory = (id, title, icon) => {
    setTitleCategory(title);
    refIDCate.current = id;
    setImageIconUpdate(icon);
    setToggleModalAdd4(true);
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
      fetch(
        `https://fpt-hightech-api.herokuapp.com/category/${refIDCate.current}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": DataLogin.token,
          },
          body: JSON.stringify({
            title: titleCategory,
            icon: URLIcon,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          refModal2.current.innerHTML = `<h2>Successful</h2>`;

          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        })
        .catch((err) => {
        refModal2.current.innerHTML = `<h2>${err}</h2>`;
      })
    });
  };

  const handleDeleteCategory = () => {
    setToggleModalAdd5(true)
    
  };
  const handleDeleteCategory2 = () => {
     refModal3.current.innerHTML = `
   <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">

   </div>
    `;
    fetch(
      `https://fpt-hightech-api.herokuapp.com/category/${refIDCate.current}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
      }
    )
      .then((res) => {
        res.json();
      })
      .then((res) => {
        refModal3.current.innerHTML = `<h2>Successful</h2>`;

        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
    .catch(err => refModal3.current.innerHTML = `<h2>${err}</h2>`)
  }
  
  const handleCancel = () => {
    setTitleCategory('');
    setToggleModalAdd4(false);

  }

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
                <p>Icon</p>
              </th>
              <th>
                <p>Name</p>
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
                      category.icon
                    )
                  }
                  key={index}
                >
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
            <p>Add New Category Form</p>
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
              <input type="file" onChange={(e) => handleUpdateFile(e)}></input>
              <img
                style={{ width: "100px" }}
                src={
                  imageIcon == null ? undefined : URL.createObjectURL(imageIcon)
                }
              ></img>
            </div>
          </div>
          <div
            style={{ animation: "none" }}
            className={clsx(cx("modal-footer"))}
          >
            <button onClick={() => setToggleModalAdd3(false)}>Cancel</button>
            <button onClick={handleAddNewCategory}>Save</button>
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
            <button onClick={handleDeleteCategory2}>Yes</button>
            <button onClick={() => setToggleModalAdd5(false)}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
