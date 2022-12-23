import styles from "./Orders.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";
import { datepicker } from "js-datepicker";
import moment from "moment";
const warning = require("../Category/assets/imgs/warning.png");

function Orders() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();

  
  var date = "2022-10-17T01:00:00";
  var timeFormat = moment(date).format("DD-MM-yyy HH:mm A");



  const refCate = useRef();
  const refIDCate = useRef();
  const refBrandID = useRef();
  const refModal = useRef();
  const refModal2 = useRef();
  const refModal3 = useRef();

  const test = useRef();

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentSoft, setCurrentSoft] = useState("all");
  const [dateSoft, setDateSoft] = useState();

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
  const [toggleSoft, setToggleSoft] = useState(false);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/order/", {
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
        setOrders((prev) => [...prev, ...data.data]);
      });
  }, []);

  console.log(orders);

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
    fetch(`http://quyt.ddns.net:3000/brand/${refBrandID.current}`, {
      method: "PUT",
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
        setToggleModalAdd2(false);
        window.location.reload(false);
      })
      .then((res) => console.log(res));
  };

  const handleDeleteBrand = () => {
    fetch(`http://quyt.ddns.net:3000/brand/${refBrandID.current}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
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
      fetch("http://quyt.ddns.net:3000/category/", {
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

  const handleUpdateCategory = (id) => {
    navigate("/detail-order", { state: { id: id } });
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
    setToggleModalAdd4(false);
  };
  console.log(orders);

  // useEffect(() => {
  //   if (dateSoft !== null || undefined) {
  //     console.log(dateSoft.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/,"$2$1$3"));
  //   }
  // }, [dateSoft])

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
            <h3 style={{ margin: "0px" }}>Danh sách đơn hàng</h3>
          </div>
          <div className={clsx(cx("soft"))}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setToggleSoft(!toggleSoft)}
            >
              <p>Trạng thái đơn hàng</p>
              <BiCaretDown />
            </div>
            <div
              className={clsx(cx("soft2"), {
                [styles.activesoft]: toggleSoft,
              })}
            >
              <p
                onClick={() => {
                  setCurrentSoft("Not Processed");
                  setToggleSoft(false);
                }}
              >
                Not Processed
              </p>
              <p
                onClick={() => {
                  setCurrentSoft("Processing");
                  setToggleSoft(false);
                }}
              >
                Processing
              </p>
              <p
                onClick={() => {
                  setCurrentSoft("Shipping");
                  setToggleSoft(false);
                }}
              >
                Shipping
              </p>
              <p
                onClick={() => {
                  setCurrentSoft("Completed");
                  setToggleSoft(false);
                }}
              >
                Completed
              </p>
              <p
                onClick={() => {
                  setCurrentSoft("Cancelled");
                  setToggleSoft(false);
                }}
              >
                Cancelled
              </p>
              <p
                onClick={() => {
                  setCurrentSoft("all");
                  setToggleSoft(false);
                }}
              >
                All
              </p>
            </div>
          </div>
          <div
            style={{ padding: "0px", border: "none" }}
            className={clsx(cx("soft"))}
          >
            <div
              style={{ cursor: "pointer" }}
              // onClick={() => setToggleSoft(!toggleSoft)}
            >
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  setDateSoft(
                    e.target.value == ""
                      ? null
                      : new Date(e.target.value)
                          .toISOString()
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")
                  );
                }}
                type="date"
              ></input>
            </div>
          </div>
        </div>

        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>Số thứ tự</p>
              </th>
              <th>
                <p>Tên Khách Hàng</p>
              </th>
              <th>
                <p>Địa Chỉ</p>
              </th>
              <th>
                <p>Trạng thái</p>
              </th>
              <th>
                <p>Ngày tạo đơn</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSoft == "all"
              ? dateSoft == null
                ? orders.map((category, index) => {
                    return (
                      <tr
                        ref={test}
                        onClick={() => handleUpdateCategory(category._id)}
                        key={index}
                      >
                        <td>{index + 1}</td>
                        <td>{category.shippingAddress.name}</td>
                        <td style={{maxWidth:'200px'}}>{category.shippingAddress.address}</td>

                        <td>
                          <p
                            style={
                              category.status == "Processing"
                                ? { backgroundColor: "lightgreen" }
                                : category.status == "Shipping"
                                ? { backgroundColor: "yellow", color: "black" }
                                : category.status == "Completed"
                                ? { backgroundColor: "lightblue" }
                                : category.status == "Cancelled"
                                ? { backgroundColor: "gray" }
                                : undefined
                            }
                          >
                            {category.status}
                          </p>
                        </td>
                        <td>
                          {/* {category.createdAt
                            .substring(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")} */}
                          {
                            moment(category.createdAt).format("DD-MM-yyy HH:mm A")
                          }
                        </td>
                      </tr>
                    );
                  })
                : orders
                    .filter((item, index) => {
                      return (
                        item.createdAt
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("/") == dateSoft
                      );
                    })
                    .map((item, index) => {
                      return (
                        <tr
                          ref={test}
                          onClick={() => handleUpdateCategory(item._id)}
                          key={index}
                        >
                          <td>{index + 1}</td>
                          <td>{item.shippingAddress.name}</td>
                          <td style={{ maxWidth: "200px" }}>
                            {item.shippingAddress.address}
                          </td>
                          <td>
                            <p
                              style={
                                item.status == "Processing"
                                  ? { backgroundColor: "lightgreen" }
                                  : item.status == "Shipping"
                                  ? {
                                      backgroundColor: "yellow",
                                      color: "black",
                                    }
                                  : item.status == "Completed"
                                  ? { backgroundColor: "lightblue" }
                                  : item.status == "Cancelled"
                                  ? { backgroundColor: "gray" }
                                  : undefined
                              }
                            >
                              {item.status}
                            </p>
                          </td>
                          <td>
                            {moment(item.createdAt).format(
                              "DD-MM-yyy HH:mm A"
                            )}
                          </td>
                        </tr>
                      );
                    })
              : dateSoft == null
              ? orders
                  .filter((item, index) => {
                    return item.status == currentSoft;
                  })
                  .map((item2, index2) => {
                    return (
                      <tr
                        ref={test}
                        onClick={() => handleUpdateCategory(item2._id)}
                        key={index2}
                      >
                        <td>{index2 + 1}</td>
                        <td>{item2.shippingAddress.name}</td>
                        <td style={{ maxWidth: "200px" }}>
                          {item2.shippingAddress.address}
                        </td>
                        <td>
                          <p
                            style={
                              item2.status == "Processing"
                                ? { backgroundColor: "lightgreen" }
                                : item2.status == "Shipping"
                                ? { backgroundColor: "yellow", color: "black" }
                                : item2.status == "Completed"
                                ? { backgroundColor: "lightblue" }
                                : item2.status == "Cancelled"
                                ? { backgroundColor: "gray" }
                                : undefined
                            }
                          >
                            {item2.status}
                          </p>
                        </td>
                        <td>
                          {moment(item2.createdAt).format("DD-MM-yyy HH:mm A")}
                        </td>
                      </tr>
                    );
                  })
              : orders
                  .filter((item, index) => {
                    return item.status == currentSoft;
                  })
                  .filter((item, index) => {
                    return (
                      item.createdAt
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("/") == dateSoft
                    );
                  })
                  .map((item, index) => {
                    return (
                      <tr
                        ref={test}
                        onClick={() => handleUpdateCategory(item._id)}
                        key={index}
                      >
                        <td>{index + 1}</td>
                        <td>{item.shippingAddress.name}</td>
                        <td style={{ maxWidth: "200px" }}>
                          {item.shippingAddress.address}
                        </td>
                        <td>
                          <p
                            style={
                              item.status == "Processing"
                                ? { backgroundColor: "lightgreen" }
                                : item.status == "Shipping"
                                ? { backgroundColor: "yellow", color: "black" }
                                : item.status == "Completed"
                                ? { backgroundColor: "lightblue" }
                                : item.status == "Cancelled"
                                ? { backgroundColor: "gray" }
                                : undefined
                            }
                          >
                            {item.status}
                          </p>
                        </td>
                        <td>
                          {moment(item.createdAt).format("DD-MM-yyy HH:mm A")}
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
          </div>
          <div style={{ animation: "none" }} className={clsx(cx("modal-body"))}>
            <h3>Customer Information</h3>
            <div
              style={{ animation: "none" }}
              className={clsx(cx("modal-body-group"))}
            >
              <p>Customer ID</p>
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

export default Orders;
