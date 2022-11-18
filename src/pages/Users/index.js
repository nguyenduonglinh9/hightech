import styles from "./Users.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


function Users() {

  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  let navigate = useNavigate();

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

  const handleToggleModalAddUser = () => {
    navigate('/add-user')
  }

  const handleDetailUser = (id) => {
    navigate("/detail-user", { state: { id: id } });
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
            <h3 style={{ margin: "0px" }}>USERS</h3>
          </div>
          <div
            onClick={handleToggleModalAddUser}
            className={clsx(cx("button-add-new"))}
          >
            <BsPlusLg />
          </div>
        </div>

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
                <tr onClick={() => handleDetailUser(user._id)} key={index}>
                  <td>
                    <img src={user.avatar}></img>
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
