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
            <h3 style={{ margin: "0px" }}>Danh sách quản trị viên</h3>
          </div>
          <div
            onClick={handleToggleModalAddUser}
            className={clsx(cx("button-add-new"))}
          >
            <p>Thêm</p>
          </div>
        </div>

        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>Số thứ tự</p>
              </th>
              <th>
                <p>Ảnh đại diện</p>
              </th>
              <th>
                <p>Email</p>
              </th>
              <th>
                <p>Họ và tên</p>
              </th>
              <th>
                <p>Số điện thoại</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr onClick={() => handleDetailUser(user._id)} key={index}>
                  <td>{index+1}</td>
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
