import styles from "./detail-product.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill, BsCaretDownFill } from "react-icons/bs";

function DetailProduct() {
  const id = useLocation();
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  const refDesc = useRef();

  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleDropDownBrand, setToggleDropDownBrand] = useState(false);

  const currentCategory = useRef();
  const currentCategoryId = useRef();
  const currentBrands = useRef();

  console.log(brands);

  useEffect(() => {
    fetch(`https://fpt-hightech-api.herokuapp.com/product/${id.state.id}`, {
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
        setProduct({ ...data.data });
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `https://fpt-hightech-api.herokuapp.com/category/${product.category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        currentCategory.current = data.data.title;
        currentCategoryId.current = data.data._id;
        setCategory(data.data);
      });
  }, [product]);

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
    fetch(`https://fpt-hightech-api.herokuapp.com/brand/${product.brand}`, {
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
        currentBrands.current = data.data.title;
        setBrand(data.data);
      });
  }, [product]);

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
        const dataArr = [...data.data];
        const dataFilter = dataArr.filter((dataNewArr, index) => {
          return dataNewArr.category == currentCategoryId.current;
        });
        setBrands([...dataFilter]);
      });
  }, [product]);

  const handleAppendChild = () => {
    var input = document.createElement("input");
    input.style.margin = "5px 0";
    refDesc.current.appendChild(input);
  };

  const handleDeleteProduct = () => {
    fetch(`https://fpt-hightech-api.herokuapp.com/product/${id.state.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>NAME</p>
            <input value={product.title}></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>DESCRIPTION</p>
            <div ref={refDesc}>
              {product.description == null
                ? undefined
                : product.description.map((item, index) => {
                    return (
                      <input
                        key={index}
                        style={{ margin: "5px 0" }}
                        value={item}
                      ></input>
                    );
                  })}
            </div>
            <BsPlusCircle onClick={handleAppendChild} />
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>IMAGE</p>
            <div style={{ display: "flex" }}>
              {product.images == null
                ? undefined
                : product.images.map((item, index) => {
                    return (
                      <div style={{ position: "relative" }}>
                        <img src={item}></img>
                        <BsXCircleFill className={clsx(cx("icon-delete"))} />
                      </div>
                    );
                  })}
              <div className={clsx(cx("from-body-group-addimage"))}>
                <BsPlusCircle />
              </div>
            </div>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>PRICE</p>
            <input type={Number} value={product.costPrice}></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>SALE</p>
            <input value={product.salePercent + "%"}></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>QUANTITY</p>
            <input type={Number} value={product.quantity}></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>SPECIFICATIONS</p>
            <div style={{ width: "70%" }}>
              {product.specifications == null
                ? undefined
                : product.specifications.map((item2, index2) => {
                    return (
                      <div
                        key={index2}
                        style={{ margin: "10px 0px", display: "flex" }}
                      >
                        <input
                          style={{ flex: "2", marginRight: "5px" }}
                          value={item2.title}
                        ></input>
                        <input
                          style={{ flex: "5" }}
                          value={item2.content}
                        ></input>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>CATEGORY</p>
            <div
              className={clsx(cx("drop-down"))}
              style={{
                width: "70%",
                border: "1px solid rgba(0,0,0,0.6)",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <p style={{ margin: "0px" }}>{currentCategory.current}</p>
              <BsCaretDownFill
                onClick={() => {
                  setToggleDropDown(!toggleDropDown);
                }}
              />
              <div
                className={clsx(cx("drop-down-menu"), {
                  [styles.activedropdown]: toggleDropDown,
                })}
                style={{
                  width: "100%",
                  border: "1px solid rgba(0,0,0,0.6)",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  backgroundColor: "white",
                  zIndex: "2",
                }}
              >
                {categorys == null
                  ? undefined
                  : categorys.map((item3, index3) => {
                      return (
                        <div style={{ padding: "10px" }}>
                          <p>{item3.title}</p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>BRAND</p>
            <div
              className={clsx(cx("drop-down"))}
              style={{
                width: "70%",
                border: "1px solid rgba(0,0,0,0.6)",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <p style={{ margin: "0px" }}>{currentBrands.current}</p>
              <BsCaretDownFill
                onClick={() => {
                  setToggleDropDownBrand(!toggleDropDownBrand);
                }}
              />
              <div
                className={clsx(cx("drop-down-menu"), {
                  [styles.activedropdown]: toggleDropDownBrand,
                })}
                style={{
                  width: "100%",
                  border: "1px solid rgba(0,0,0,0.6)",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  backgroundColor: "white",
                }}
              >
                {brands == null
                  ? undefined
                  : brands.map((item3, index3) => {
                      return (
                        <div style={{ padding: "10px" }}>
                          <p>{item3.title}</p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(cx("from-footer"))}>
          <div>
            <button onClick={handleDeleteProduct}>DELETE</button>
          </div>
          <div>
            <button>CANCEL</button>
            <button>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
