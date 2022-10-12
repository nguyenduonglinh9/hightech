import styles from "./Product.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowDown } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcSupport, FcPlus } from "react-icons/fc";

function Product() {


  AOS.init();

  
  const cx = classNames.bind(styles);

  const localStorageLoggin = JSON.parse(localStorage.getItem("data"));
  
  

  const [isLoggin, setIsLoggin] = useState(localStorageLoggin.isLoggin);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [curentItemName, setCurrentItemName] = useState('Laptop');
  const [idCate, setIdCate] = useState(2);
  const [loading, setLoading] = useState(false)
  const refItem = useRef();
  


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
        setLoading(true);
      });
  }, []);

  // console.log(list)
  const handleOpenItem = () => {
    setToggle(true)
  }
  function handleCloseItem() {
    setToggle(false);
    setLoading(false);
  }
  


  return (
    <div className={clsx(cx("container"))}>
      <div style={{ display: "flex" ,justifyContent:"space-between"}}>
        <div>
          <div onClick={handleOpenItem} className={clsx(cx("drop-down-menu"))}>
            <span ref={refItem}>{curentItemName}</span>
            <FaArrowDown />
          </div>
          <div
            className={clsx(cx("drop-down-menu2"), {
              [styles.open_drop_item]: toggle,
            })}
          >
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setIdCate(item.id);
                    setCurrentItemName(item.name);
                    setToggle(false);
                  }}
                  className={clsx(cx("drop-down-menu-item"))}
                >
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={clsx(cx("button-add-new"))}>
          <FcPlus style={{ width: "20px", height: "20px" }} />
          <p>ADD NEW</p>
        </div>
      </div>
      <div className={clsx(cx("listproduct"))}>
        {products
          .filter((product, index) => {
            return product.idCate == idCate;
          })
          .map((item, index) => {
            return (
              <div className={clsx(cx("product"))}>
                <img src={item.image}></img>
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <div className={clsx(cx("product-option"))}>
                  <div>
                    <FcFullTrash />
                  </div>
                  <div>
                    <FcRules />
                  </div>
                  <div>
                    <FcSupport />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {loading == false ? (
        <div className={clsx(cx("container-loading"))}>
          <div className={clsx(cx("box"))}></div>
          <div className={clsx(cx("box2"))}></div>
          <div className={clsx(cx("box3"))}></div>
        </div>
      ) : undefined}
    </div>
  );
}

export default Product;
