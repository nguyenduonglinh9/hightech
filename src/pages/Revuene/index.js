import styles from "./Revuene.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

import { Bar } from "react-chartjs-2";
const warning = require("../Category/assets/imgs/warning.png");
const chart = require("./assets/imgs/chart1.png");

function Revuene() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();

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
        console.log(data.data);
        setOrders2((prev) => [...prev, ...data.data]);
        const orderComplete = data.data.filter((item) => {
          return item.status == "Completed";
        });
        console.log(orderComplete);
        setOrders((prev) => [...prev, ...orderComplete]);

        const orderCan = data.data.filter((item) => {
          return item.status == "Cancelled";
        });
        setOrdersCan((prev) => [...prev, ...orderCan]);
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

  console.log(new Date("20-12-1998"));

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
      item.items.map((item2) => setCount((prev) => prev + item2.quantity));
    });
  }, [orders]);
  console.log(orders);
  console.log(count);

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
            <h3 style={{ margin: "0px" }}>Tổng Quan</h3>
            <div className={clsx(cx("overview"))}>
              <div className={clsx(cx("totalProduct"))}>
                <img src={chart}></img>
                <div>
                  <h2>{count}</h2>
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
            </div>
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
                label: "Population (millions)",
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
                data: [2478, 5267, 734, 784, 433],
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
          <tbody></tbody>
        </Table>
      </div>
    </div>
  );
}

export default Revuene;
