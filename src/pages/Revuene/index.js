import styles from "./Revuene.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import moment from "moment";
import { Bar } from "react-chartjs-2";
const warning = require("../Category/assets/imgs/warning.png");
const chart = require("./assets/imgs/chart1.png");
const money = require("./assets/imgs/money.png");

function Revuene() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();
  let dollarUSLocale = Intl.NumberFormat("en-US");
  const isLogin2 = JSON.parse(localStorage.getItem("isLogin"));
  if (isLogin2["isLoggin"] === false) {
    navigate("/");
  }

  const refIDCate = useRef();

  const test = useRef();

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orders2, setOrders2] = useState([]);
  const [ordersCan, setOrdersCan] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsSold, setProductsSold] = useState([]);
  const [count, setCount] = useState(0);
  const [testt, setTestt] = useState([]);

  const [thang1, setThang1] = useState(0);
  const [thang2, setThang2] = useState(0);
  const [thang3, setThang3] = useState(0);
  const [thang4, setThang4] = useState(0);
  const [thang5, setThang5] = useState(0);
  const [thang6, setThang6] = useState(0);
  const [thang7, setThang7] = useState(0);
  const [thang8, setThang8] = useState(0);
  const [thang9, setThang9] = useState(0);
  const [thang10, setThang10] = useState(0);
  const [thang11, setThang11] = useState(0);
  const [thang12, setThang12] = useState(0);

  const [currentDate, setCurrentDate] = useState("");

  const [nextType, setNextType] = useState();
  const [currentYear, setCurrentYear] = useState();

  const [currentFilter, setCurrentFilter] = useState("Tất Cả");
  

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
        setOrders2((prev) => [...prev, ...data.data]);
        const orderComplete = data.data.filter((item) => {
          return item.status == "Completed";
        });
        setOrders((prev) => [...prev, ...orderComplete]);
        setCount(
          orderComplete.reduce((total, currentValue, currentIndex, arr) => {
            return total + currentValue.items.length;
          }, 0)
        );

        const orderCan = data.data.filter((item) => {
          return item.status == "Cancelled";
        });
        setOrdersCan((prev) => [...prev, ...orderCan]);

        const month1 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "1"
        );
        const test12 = month1.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang1(test12);
        const month2 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "2"
        );
        const test11 = month2.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang2(test11);
        const month3 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "3"
        );
        const test10 = month3.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang3(test10);
        const month4 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "4"
        );
        const test9 = month4.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang4(test9);
        const month5 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "5"
        );
        const test8 = month5.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang5(test8);
        const month6 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "6"
        );
        const test7 = month6.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang6(test7);
        const month7 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "7"
        );
        const test6 = month7.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang7(test6);
        const month8 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "8"
        );
        const test5 = month8.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang8(test5);
        const month9 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "9"
        );
        const test4 = month9.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang9(test4);
        const month10 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "10"
        );
        const test3 = month10.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang10(test3);
        const month11 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "11"
        );
        const test2 = month11.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang11(test2);
        const month12 = orderComplete.filter(
          (item) => moment(item.createdAt).format("MM") == "12"
        );
        const test = month12.reduce(
          (total, currentValue, currentIndex, arr) => {
            return total + currentValue.totalPrice;
          },
          0
        );
        setThang12(test);
      });
  }, []);

  useEffect(() => {
    var monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
    const tesst = orders.map((item) =>
      item.updatedAt.substring(0, 10).split("-").join("/")
    );
    const test = tesst.map((item) => new Date(item));
    console.log(monthName(test[0]));
  }, [orders]);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/product/", {
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
        setProducts((prev) => [...prev, ...data.data]);
      });
  }, []);

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

  useEffect(() => {
    if (orders.length !== 0) {
      orders.map((item) => {
        return item.items.map((item2) => {
          setProductsSold((prev) => [...prev, item2]);
        });
      });
    }
  }, [orders]);

  useEffect(() => {
    orders.map((item) => {
      item.items.map((item2) => {
        setTestt((prev) => [
          ...prev,
          {
            maSP: item2.product,
            soluong: item2.quantity,
            ngayban: item.createdAt,
            madonhang: item._id,
          },
        ]);
      });
    });
  }, [orders]);
  console.log(testt);

  useEffect(() => {
    console.log(
      testt.filter(
        (item) =>
          moment(item.ngayban).format("DD-MM-YYYY") ==
          moment(currentDate).format("DD-MM-YYYY")
      )
    );
  });
  console.log(testt);

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
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ margin: "0px" }}>Tổng Quan</h3>

              <input
                value={currentDate}
                style={{ padding: "5px", borderRadius: "5px" }}
                type="date"
                onChange={(e) => setCurrentDate(e.target.value)}
              ></input>
            </div>
            {currentDate == "" ? (
              <>
                <div style={{ width: "100%" }} className={clsx(cx("overview"))}>
                  <div className={clsx(cx("totalProduct"))}>
                    <img src={chart}></img>
                    <div>
                      <h2>
                        {testt.reduce((acc, current) => {
                          return acc + current.soluong;
                        }, 0)}
                      </h2>
                      <p>Sản Phẩm Đã Bán</p>
                    </div>
                  </div>
                  <div className={clsx(cx("totalOrders"))}>
                    <img src={chart}></img>
                    <div>
                      <h2>{orders2.length}</h2>
                      <p>Đơn Hàng Đã Đặt</p>
                    </div>
                  </div>
                  <div className={clsx(cx("totalOrdersCom"))}>
                    <img src={chart}></img>
                    <div>
                      <h2>{orders.length}</h2>
                      <p>Đơn Hàng Thành Công</p>
                    </div>
                  </div>
                  <div className={clsx(cx("totalOrdersCan"))}>
                    <img src={chart}></img>
                    <div>
                      <h2>{ordersCan.length}</h2>
                      <p>Đơn Hàng Bị Hủy</p>
                    </div>
                  </div>
                  <div className={clsx(cx("totalPrice"))}>
                    <img src={money}></img>
                    <div>
                      <h2>
                        {dollarUSLocale.format(
                          orders.reduce((acc, current) => {
                            return acc + current.totalPrice;
                          }, 0)
                        )}
                      </h2>
                      <p>VND</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ width: "100%" }} className={clsx(cx("overview"))}>
                <div className={clsx(cx("totalProduct"))}>
                  <img src={chart}></img>
                  <div>
                    <h2>
                      {testt
                        .filter(
                          (item) =>
                            moment(item.ngayban).format("DD-MM-yyyy") ==
                            moment(currentDate).format("DD-MM-yyyy")
                        )
                        .reduce((acc, item) => {
                          return acc + item.soluong;
                        }, 0)}
                    </h2>
                    <p>Sản Phẩm Đã Bán</p>
                  </div>
                </div>
                <div className={clsx(cx("totalOrders"))}>
                  <img src={chart}></img>
                  <div>
                    <h2>
                      {
                        orders2.filter(
                          (item) =>
                            moment(item.createdAt).format("DD-MM-yyyy") ==
                            moment(currentDate).format("DD-MM-yyyy")
                        ).length
                      }
                    </h2>
                    <p>Đơn Hàng Đã Đặt</p>
                  </div>
                </div>
                <div className={clsx(cx("totalOrdersCom"))}>
                  <img src={chart}></img>
                  <div>
                    <h2>
                      {
                        orders.filter(
                          (item) =>
                            moment(item.createdAt).format("DD-MM-yyyy") ==
                            moment(currentDate).format("DD-MM-yyyy")
                        ).length
                      }
                    </h2>
                    <p>Đơn Hàng Thành Công</p>
                  </div>
                </div>
                <div className={clsx(cx("totalOrdersCan"))}>
                  <img src={chart}></img>
                  <div>
                    <h2>
                      {
                        ordersCan.filter(
                          (item) =>
                            moment(item.createdAt).format("DD-MM-yyyy") ==
                            moment(currentDate).format("DD-MM-yyyy")
                        ).length
                      }
                    </h2>
                    <p>Đơn Hàng Bị Hủy</p>
                  </div>
                </div>

                <div className={clsx(cx("totalPrice"))}>
                  <img src={money}></img>
                  <div>
                    <h2>
                      {/* {dollarUSLocale.format(
                        orders.reduce((acc, current) => {
                          return acc + current.totalPrice;
                        }, 0)
                      )} */}
                      {orders
                        .filter(
                          (item) =>
                            moment(item.createdAt).format("DD-MM-yyyy") ==
                            moment(currentDate).format("DD-MM-yyyy")
                        )
                        .reduce((acc, item) => {
                          return acc + item.totalPrice;
                        }, 0)}
                    </h2>
                    <p>VND</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Bar
          data={{
            labels: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
            datasets: [
              {
                label: "VND",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "#e8c3b9",
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "#e8c3b9",
                ],
                data: [
                  thang1,
                  thang2,
                  thang3,
                  thang4,
                  thang5,
                  thang6,
                  thang7,
                  thang8,
                  thang9,
                  thang10,
                  thang11,
                  thang12,
                ],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: "Predicted world population (millions) in 2050",
            },
          }}
        />
        {/* <h1 style={{ margin: "auto", fontSize: "80px" }}>150.000.000</h1> */}
        {/* <h3>Products Sold For The Day</h3> */}
        <h3>Sản Phẩm Đã Bán</h3>
        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>Hình Ảnh</p>
              </th>
              <th>
                <p>Tên</p>
              </th>
              <th>
                <p>Đã Bán</p>
              </th>
              <th>
                <p>Ngày Bán</p>
              </th>
              <th>
                <p>Mã Đơn Hàng</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDate == ""
              ? testt.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={
                            testt.length == 0
                              ? null
                              : products
                                  .filter((product, index) => {
                                    return product._id == item.maSP;
                                  })
                                  .map((item) => item.images[0])
                          }
                        ></img>
                      </td>
                      <td>
                        {products
                          .filter((product, index) => {
                            return product._id == item.maSP;
                          })
                          .map((item) => item.title)}
                      </td>
                      <td>{item.soluong}</td>
                      <td>
                        {moment(item.ngayban).format("DD/MM/yyy HH:mm:ss")}
                      </td>
                      <td>{item.madonhang}</td>
                    </tr>
                  );
                })
              : testt
                  .filter((item, index) => {
                    return (
                      moment(item.ngayban).format("DD/MM/yyyy") ==
                      moment(currentDate).format("DD/MM/yyyy")
                    );
                  })
                .map((item2, index2) => {
                    return (
                      <tr key={index2}>
                        <td>
                          <img
                            src={products
                              .filter((product, index) => {
                                return product._id == item2.maSP;
                              })
                              .map((item) => item.images[0])}
                          ></img>
                        </td>
                        <td>
                          {products
                            .filter((product, index) => {
                              return product._id == item2.maSP;
                            })
                            .map((item) => item.title)}
                        </td>
                        <td>{item2.soluong}</td>
                        <td>
                          {moment(item2.ngayban).format("DD/MM/yyy HH:mm:ss")}
                        </td>
                        <td>{item2.madonhang}</td>
                      </tr>
                    );
                  })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Revuene;
