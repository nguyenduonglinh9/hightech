import styles from "./Category.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


function Category() {

  AOS.init();

  const cx = classNames.bind(styles);

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([])


  useEffect(() => {
    fetch("http://localhost:3001/category")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategorys((prev) => [...prev, ...data]);
      });
  }, [])
  
  useEffect(() => {
    fetch("http://localhost:3001/brand")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBrands((prev) => [...prev, ...data]);
      });
  }, []);


  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("list-category"))}>
        {categorys.map((category, index) => {
          let urlImg = require(`./assets/fonts/img/${category.name}.png`);
          return (
            <div className={clsx(cx("item-category-group"))}>
              <img src={urlImg}></img>
              <div className={clsx(cx("item-category"))}>
                <p className={clsx(cx("item-category-name"))}>{category.name}</p>
                <div className={clsx(cx("item-brand-group"))}>
                  {brands
                    .filter((brand, index) => {
                      return brand.idCate === category.id;
                    })
                    .map((item, index) => {
                      return (
                        <p className={clsx(cx("item-brand"))}>{item.name}</p>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
