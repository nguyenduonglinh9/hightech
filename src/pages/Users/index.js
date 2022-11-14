import styles from "./Users.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";


function Users() {

  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch("https://fpt-hightech-api.herokuapp.com/admin/", {
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
  }, []);



  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("listcategory"))}>
        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>Avatar</p>
              </th>
              <th>
                <p>Email</p>
              </th>
              <th>
                <p>Full Name</p>
              </th>
              <th>
                <p>Phone</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"></img>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.fullname}</td>
                  <td>{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
