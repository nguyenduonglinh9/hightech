import styles from "./detail-order.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill } from "react-icons/bs";

function DetailOrder() {
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  const id = useLocation();
  let navigate = useNavigate();
  let dollarUSLocale = Intl.NumberFormat("en-US");

  const refInputUpload = useRef();
  const refErrEmail = useRef();
  const refErrFullName = useRef();
  const refErrPass = useRef();
  const refErrRePass = useRef();
  const refLoading = useRef();

  const [order, setOrder] = useState([]);

  const [toggleLoading, setToggleLoading] = useState(false);
  const [defaulStatus, setDefaulStatus] = useState('');

  console.log(defaulStatus)

  useEffect(() => {
    fetch(`http://quyt.ddns.net:3000/order/${id.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrder(data.data);
        setDefaulStatus(data.data.status);
      });
  }, [id]);


  const handleDeleteUser = () => {
    setToggleLoading(true);
  };
  console.log(order);

  const handleUpdateOrder = () => {
    setToggleLoading(true);

    fetch(`http://quyt.ddns.net:3000/order/${id.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        status: defaulStatus,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setToggleLoading(false);
        setTimeout(() => {
          navigate("/orders");
          window.location.reload(false);
        }, 1500);
      });
  };
  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div ref={refErrEmail} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Mã đơn hàng</p>
            <h3>{order._id}</h3>
            <p></p>
          </div>

          <div ref={refErrFullName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Thông tin khách hàng</p>
            <div>
              <p>Mã khách hàng : {order.user}</p>
              <p>Số liên hệ : {order.phone}</p>
              <p>
                {order.length === 0
                  ? undefined
                  : `Địa chỉ nhận hàng : ${
                      order.shippingAddress["address"]
                    },${" "}
                ${order.shippingAddress["city"]},${" "}
                ${order.shippingAddress["country"]}`}
              </p>
              <p>
                Mã bưu chính :{" "}
                {order.length === 0
                  ? undefined
                  : order.shippingAddress["postalCode"]}
              </p>
              <p>Phương thức thanh toán : {order.paymentMethod}</p>
            </div>
            <p></p>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Thông tin đơn hàng</p>
            <p>Ngày tạo đơn : {order.createdAt}</p>
            <div style={{}}>
              {order.length === 0
                ? undefined
                : order.items.map((item, index) => {
                    return (
                      <div className={clsx(cx("from-body-group3"))}>
                        <img src={item.product.images[0]}></img>
                        <p>Tên sản phẩm : {item.product.title}</p>
                        <p>Số lượng : {item.quantity}</p>
                        <p>
                          Giá thành :{" "}
                          {dollarUSLocale.format(item.product.costPrice)}
                        </p>
                        <p>Khuyến mãi : {item.product.salePercent}%</p>
                        <p>
                          Giá sau khuyến mãi :{" "}
                          {dollarUSLocale.format(item.product.salePrice)}
                        </p>
                        <p>
                          Tổng giá tiền :{" "}
                          {dollarUSLocale.format(
                            item.product.salePrice * item.quantity
                          )}
                        </p>
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Tình trạng đơn hàng</p>
            <p>{order.message}</p>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Tổng giá trị đơn hàng</p>
            <p>{dollarUSLocale.format(order.totalPrice)}</p>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Trạng thái đơn hàng</p>
            <div style={{ margin: "10px" }}>
              <input
                checked={defaulStatus == "Not Processed" ? true : false}
                onChange={(e) => setDefaulStatus(e.target.value)}
                type="checkbox"
                value="Not Processed"
              ></input>
              <label>Not Processed</label>
            </div>
            <div style={{ margin: "10px" }}>
              <input
                checked={defaulStatus == "Processing" ? true : false}
                onChange={(e) => setDefaulStatus(e.target.value)}
                type="checkbox"
                value="Processing"
              ></input>
              <label>Processing</label>
            </div>
            <div style={{ margin: "10px" }}>
              <input
                checked={defaulStatus == "Shipping" ? true : false}
                onChange={(e) => setDefaulStatus(e.target.value)}
                type="checkbox"
                value="Shipping"
              ></input>
              <label>Shipping</label>
            </div>
            <div style={{ margin: "10px" }}>
              <input
                checked={defaulStatus == "Completed" ? true : false}
                onChange={(e) => setDefaulStatus(e.target.value)}
                type="checkbox"
                value="Completed"
              ></input>
              <label>Completed</label>
            </div>
            <div style={{ margin: "10px" }}>
              <input
                checked={defaulStatus == "Cancelled" ? true : false}
                onChange={(e) => setDefaulStatus(e.target.value)}
                type="checkbox"
                value="Cancelled"
              ></input>
              <label>Cancelled</label>
            </div>
          </div>
        </div>
        <div className={clsx(cx("from-footer"))}>
          <div>
            <button>CANCEL</button>
          </div>
          <div>
            <button onClick={handleDeleteUser}>DELETE</button>
          </div>
          <div>
            <button
              className={clsx({
                [styles.activebutton]: true,
              })}
              onClick={handleUpdateOrder}
            >
              CONFRIM
            </button>
          </div>
        </div>
      </div>
      <div
        ref={refLoading}
        className={clsx(cx("loading"), {
          [styles.abc]: true,
        })}
      >
        <div></div>
      </div>
    </div>
  );
}

export default DetailOrder;
