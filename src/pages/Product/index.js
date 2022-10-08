import styles from "./Product.module.css";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import HorizontalScroll from "react-horizontal-scrolling";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Product() {

  
  const cx = classNames.bind(styles);

  const localStorageLoggin = JSON.parse(localStorage.getItem("data"));
  
  

  const [isLoggin, setIsLoggin] = useState(localStorageLoggin.isLoggin);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);


  let navigate = useNavigate();
  if (isLoggin == false) {
    navigate('/');
  }
  



  useEffect(() => {
    fetch("http://127.0.0.1:3001/category")
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        setCategory((prev) => [...prev, ...posts]);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/pruducts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts((prev) => [...prev, ...data]);
      });
  }, []);

  // console.log(list)
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  console.log(randomColor);

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("header"))}>
        <form className={clsx(cx("header-from-search"))}>
          <input
            placeholder=" "
            className={clsx(cx("header-from-input"))}
          ></input>
          <div className={clsx(cx("header-from-button"))}>
            <FaSearch />
          </div>
        </form>
      </div>
      <ul>
        {category.map((item, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "sticky",
                  top: "5px",
                  zIndex: "3",
                }}
              >
                <li className={clsx(cx("category"))}>{item.name}</li>
                <p style={{ marginRight: "10px", color: "white" }}>Xem Thêm</p>
              </div>
              <HorizontalScroll>
                <div className={clsx(cx("product-group"))}>
                  {products
                    .filter((product, index) => {
                      return product.idCate === item.id;
                    })
                    .map((item, index) => {
                      return (
                        <div key={index} className={clsx(cx("product-item"))}>
                          <img src={item.image}></img>
                          <p>{item.name}</p>
                          <p>{item.description}</p>
                        </div>
                      );
                    })}
                </div>
              </HorizontalScroll>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Product;
