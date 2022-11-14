import styles from "./Category.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";


function Category() {

  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  
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


  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("listcategory"))}>
        <Table className={clsx(cx("table"))} striped bordered hover>
          <thead>
            <tr>
              <th>
                <p>Name</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((category, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={category.icon}></img>
                      {category.title}
                    </td>
                    <Table
                      className={clsx(cx("table-brand"))}
                      striped
                      bordered
                      hover
                    >
                      <tbody>
                        {brands
                          .filter((brand, index) => {
                            return brand.category == category._id;
                          })
                          .map((brand, index) => {
                            return (
                              <tr key={index}>
                                <td onClick={()=>console.log('hello')}>{brand.title}</td>
                              </tr>
                            );
                          })}
                        <tr>
                          <td>hello</td>
                        </tr>
                      </tbody>
                    </Table>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Category;
