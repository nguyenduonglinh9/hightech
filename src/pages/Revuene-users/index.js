import styles from "./Revuene-users.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg, BsCaretDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Bar } from "react-chartjs-2";

function RevueneUsers() {
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();
  const isLogin2 = JSON.parse(localStorage.getItem("isLogin"));
  if (isLogin2["isLoggin"] === false) {
    navigate("/");
  }
  const min = 1990;
  const max = 2050;
  // const years = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [years, setYears] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [toggleDropDown, setToggleDropDown] = useState(false);
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

  console.log(currentYear);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/admin/", {
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
        setUsers((prev) => [...prev, ...data.data]);
      });
  }, [currentYear]);

  useEffect(() => {
    setYears([...Array.from({ length: 2050 - 1990 + 1 }, (_, i) => i + 1990)]);
  }, []);

  console.log(years);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/admin/customer", {
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
        setCustomers((prev) => [...prev, ...data.data]);
        setThang1(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "1" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang2(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "2" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );

        setThang3(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "4" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang4(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "4" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang5(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "5" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang6(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "6" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang7(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "7" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang8(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "8" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang9(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "9" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang10(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "10" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang11(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "11" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
        setThang12(
          data.data.filter(
            (item) =>
              moment(item.createdAt).format("MM") == "12" &&
              moment(item.createdAt).format("yyyy") == currentYear
          ).length
        );
      });
  }, [currentYear]);

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("listcategory"))}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <div>
            <h3 style={{ margin: "0px" }}>T???ng quan</h3>
          </div>
          <div
            onClick={() => setToggleDropDown(!toggleDropDown)}
            className={clsx(cx("optionyears"))}
            style={{
              width: "fit-content",
              height: "fit-content",
              border: "2px solid",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
            }}
          >
            <p style={{ margin: "0px 10px", cursor: "pointer" }}>
              {currentYear}
            </p>
            <BsCaretDownFill />
            <div
              className={clsx(cx("drop-down-years"), {
                [styles.openDropDown]: toggleDropDown,
              })}
            >
              {years.map((item, index) => {
                return (
                  <p
                    onClick={() => {
                      setToggleDropDown(false);
                      setCurrentYear(item);
                    }}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <Bar
          data={{
            labels: [
              "Th??ng 1",
              "Th??ng 2",
              "Th??ng 3",
              "Th??ng 4",
              "Th??ng 5",
              "Th??ng 6",
              "Th??ng 7",
              "Th??ng 8",
              "Th??ng 9",
              "Th??ng 10",
              "Th??ng 11",
              "Th??ng 12",
            ],
            datasets: [
              {
                label: "Ng?????i ????ng K??",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ display: "inline-block", width: "fit-content" }}>
            Danh s??ch ng?????i d??ng
          </h3>
          <div style={{ display: "inline-block", width: "fit-content" }}>
            <input
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              style={{ padding: "5px", borderRadius: "5px" }}
              type="date"
            ></input>
          </div>
        </div>
        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>S??? th??? t???</p>
              </th>
              <th>
                <p>???nh ?????i di???n</p>
              </th>
              <th>
                <p>Email</p>
              </th>
              <th>
                <p>H??? v?? t??n</p>
              </th>
              <th>
                <p>S??? ??i???n tho???i</p>
              </th>
              <th>
                <p>Ng??y ????ng k??</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDate == ""
              ? customers.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={user.avatar}></img>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.fullname}</td>
                      <td>{user.phone}</td>
                      <td>
                        {moment(user.createdAt).format("DD-MM-yyyy HH:mm:ss")}
                      </td>
                    </tr>
                  );
                })
              : customers
                  .filter((item, index) => {
                    return (
                      moment(item.createdAt).format("DD-MM-yyyy") ==
                      moment(currentDate).format("DD-MM-yyyy")
                    );
                  })
                  .map((item2, index2) => {
                    return (
                      <tr key={index2}>
                        <td>{index2 + 1}</td>
                        <td>
                          <img src={item2.avatar}></img>
                        </td>
                        <td>{item2.email}</td>
                        <td>{item2.fullname}</td>
                        <td>{item2.phone}</td>
                        <td>
                          {moment(item2.createdAt).format(
                            "DD-MM-yyyy HH:mm:ss"
                          )}
                        </td>
                      </tr>
                    );
                  })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default RevueneUsers;
