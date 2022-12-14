import styles from "./detail-order.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill } from "react-icons/bs";
import moment from "moment";

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
        // setDefaulStatus(data.data.status);
        data.data.status == "Not Processed"
          ? setDefaulStatus("Processing")
          : data.data.status == "Processing"
          ? setDefaulStatus("Shipping")
          : (data.data.status == "Shipping") ? setDefaulStatus('Completed') : data.data.status == "Completed" ? setDefaulStatus('Completed') : data.data.status == "Cancelled" ? setDefaulStatus('Cancelled') : setDefaulStatus('');
      });
  }, [id]);

  const handleDeleteUser = () => {
    setToggleLoading(true);

    fetch(`http://quyt.ddns.net:3000/order/${id.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        status: "Cancelled",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        window.location.reload(false);

        // setTimeout(() => {
        //   navigate("/orders");
        //   // window.location.reload(false);
        // }, 1500);

        // setToggleLoading(false);
      });

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
        window.location.reload(false);
        
        // setTimeout(() => {
        //   navigate("/orders");
        //   // window.location.reload(false);
        // }, 1500);

        // setToggleLoading(false);
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
            <p style={{ fontWeight: "bold" }}>M?? ????n h??ng</p>
            <h3>{order._id}</h3>
            <p></p>
          </div>

          <div ref={refErrFullName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Th??ng tin kh??ch h??ng</p>
            <div>
              <p>M?? kh??ch h??ng : {order.user}</p>
              <p>
                T??n kh??ch h??ng :{" "}
                {order.length == 0 ? " " : order.shippingAddress.name}
              </p>
              <p>S??? li??n h??? : {order.phone}</p>
              <p>
                ?????a ch??? nh???n h??ng :{" "}
                {order.length == 0 ? " " : order.shippingAddress.address}
              </p>
              <p>Ph????ng th???c thanh to??n : {order.paymentMethod}</p>
            </div>
            <p></p>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Th??ng tin ????n h??ng</p>
            <p>Ng??y t???o ????n : {moment(order.createdAt).format('DD-MM-yyyy HH:mm:ss')}</p>
            <div style={{}}>
              {order.length === 0
                ? undefined
                : order.items.map((item, index) => {
                    return (
                      <div className={clsx(cx("from-body-group3"))}>
                        <img src={item.product.images[0]}></img>
                        <p>T??n s???n ph???m : {item.product.title}</p>
                        <p>S??? l?????ng : {item.quantity}</p>
                        <p>
                          Gi?? th??nh :{" "}
                          {dollarUSLocale.format(item.product.costPrice)}
                        </p>
                        <p>Khuy???n m??i : {item.product.salePercent}%</p>
                        <p>
                          Gi?? sau khuy???n m??i :{" "}
                          {dollarUSLocale.format(item.product.salePrice)}
                        </p>
                        <p>
                          T???ng gi?? ti???n :{" "}
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
            <p style={{ fontWeight: "bold" }}>T??nh tr???ng ????n h??ng</p>
            <p>{order.message}</p>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>T???ng gi?? tr??? ????n h??ng</p>
            <p>{dollarUSLocale.format(order.totalPrice)}</p>
          </div>
        </div>
        <div className={clsx(cx("from-footer"))}>
          <div>
            <button onClick={() => navigate("/orders")}>Tr??? l???i</button>
          </div>
          <div>
            <button
              style={
                order.status == "Completed" || order.status == "Cancelled"
                  ? { display: "none" }
                  : null
              }
              onClick={handleDeleteUser}
            >
              H???y ????n H??ng
            </button>
          </div>
          <div>
            <button
              style={
                order.status == "Completed" || order.status == "Cancelled"
                  ? { display: "none" }
                  : null
              }
              className={clsx({
                [styles.activebutton]: true,
              })}
              onClick={handleUpdateOrder}
              disabled={
                order.status == "Completed" || order.status == "Cancelled"
                  ? true
                  : false
              }
            >
              {order.status == "Not Processed"
                ? "Processing"
                : order.status == "Processing"
                ? "Shipping"
                : order.status == "Shipping"
                ? "Completed"
                : order.status == "Completed"
                ? "Completed"
                : order.status == "Cancelled"
                ? "Cancelled"
                : null}
            </button>
          </div>
        </div>
      </div>
      <div
        ref={refLoading}
        className={clsx(cx("loading"), {
          [styles.abc]: toggleLoading,
        })}
      >
        <div></div>
      </div>
    </div>
  );
}

export default DetailOrder;
