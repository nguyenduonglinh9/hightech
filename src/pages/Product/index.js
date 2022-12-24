import styles from "./Product.module.scss";
import { useEffect, useState, useRef, useContext } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowDown } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcSupport } from "react-icons/fc";
import { BsPlusLg } from "react-icons/bs";
import { DataSearchContext } from "../../components/Layout/LayoutMain";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

// @ts-ignore
// import everything inside the mqtt module and give it the namespace "mqtt"
// import { connect } from "mqtt"; // import connect from mqtt
// let client = connect("mqtt://smarttech-mqtt-stage.techgel.cloud:1883");

function Product() {
  AOS.init();
  let navigate = useNavigate();
  const cx = classNames.bind(styles);
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const isLogin2 = JSON.parse(localStorage.getItem("isLogin"));
  const productSave = JSON.parse(localStorage.getItem("currentProduct"));
  let dollarUSLocale = Intl.NumberFormat("en-US");

  if (isLogin2["isLoggin"] === false) {
    navigate("/");
  }

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleBrand, setToggleBrand] = useState(false);
  const [togglePriceOption, setTogglePriceOption] = useState(false);
  const [curentItemName, setCurrentItemName] = useState(productSave.name);
  const [idCate, setIdCate] = useState(productSave.id);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [softProduct, setSoftProduct] = useState([]);

  const softSearch = useRef();
  const refItem = useRef();

  useEffect(() => {
    localStorage.setItem(
      "currentProduct",
      JSON.stringify({ name: curentItemName, id: idCate })
    );
  }, []);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/category/", {
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
        setCategory((prev) => [...prev, ...data.data]);
      });
  }, []);

  useEffect(() => {
    category.push({ title: "Tất Cả" });
  }, []);

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/brand/", {
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

  useEffect(() => {
    fetch("http://quyt.ddns.net:3000/product?all=true/", {
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
        setProducts((prev) => [...prev, ...data.data]);
        setLoading(true);
      });
  }, []);

  const handleOpenCategory = () => {
    setToggleCategory(!toggleCategory);
  };
  
  const HandleDetail = (id) => {
    navigate("/detail-product", { state: { id: id } });
  };

  const handleNavigateAddProduct = () => {
    navigate("/add-product");
  };
  const handleSoft = () => {
    fetch(
      `http://quyt.ddns.net:3000/product/?all=true&salePrice>=${minPrice}&salePrice<=${maxPrice}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setSoftProduct([...res.data]));
  };

  return (
    <div className={clsx(cx("container"))}>
      {softSearch.current == undefined ? undefined : (
        <div className={clsx(cx("list-search"))}>
          {softSearch.current.map((item, index) => {
            return (
              <div key={index} className={clsx(cx("item-search"))}>
                <img style={{ width: "70px" }} src={item.image}></img>
                <div>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
                <div className={clsx(cx("item-search-option"))}>
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
      )}
      <div
        onClick={() => setTogglePriceOption(false)}
        style={{ display: "flex" }}
      >
        <div>
          <div
            onClick={handleOpenCategory}
            className={clsx(cx("drop-down-menu"))}
          >
            <span ref={refItem}>{curentItemName}</span>
            <FaArrowDown />
          </div>
          <div
            className={clsx(cx("drop-down-menu2"), {
              [styles.open_drop_item]: toggleCategory,
            })}
          >
            {category.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    onClick={() => {
                      setIdCate(item._id);
                      setCurrentItemName(item.title);
                      setToggleCategory(false);
                      localStorage.setItem(
                        "currentProduct",
                        JSON.stringify({
                          name: item.title,
                          id: item._id,
                        })
                      );
                    }}
                    className={clsx(cx("drop-down-menu-item"))}
                  >
                    <span>{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={(e) => {
            setTogglePriceOption(!togglePriceOption);
            e.stopPropagation();
          }}
          className={clsx(cx("drop-down-menu"))}
        >
          <p style={{ margin: "0" }}>Giá</p>
          <div
            className={clsx(cx("drop-down-price"), {
              [styles.openPrice]: togglePriceOption,
            })}
          >
            <div style={{ display: "flex" }}>
              <div onClick={(e) => e.stopPropagation()}>
                <span>Từ</span>
                <input
                  value={minPrice}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    e.stopPropagation();
                    setMinPrice(e.target.value);
                    console.log(minPrice);
                  }}
                  // onBlur={(e) => dollarUSLocale.format(e.target.value)}
                  type="number"
                ></input>
              </div>
              <div>
                <span>Đến</span>
                <input
                  onClick={(e) => e.stopPropagation()}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                ></input>
              </div>
            </div>
            <button onClick={handleSoft}>Kết Quả</button>
          </div>
        </div>

        {/* <div>
          <div onClick={handleOpenBrand} className={clsx(cx("drop-down-menu"))}>
            <span ref={refItem}>
              {brands
                .filter((item, index) => item.category == idCate)
                .map((item2, index) => {
                  return item2.title;
                })}
            </span>
            <FaArrowDown />
          </div>
          <div
            className={clsx(cx("drop-down-menu2"), {
              [styles.open_drop_item]: toggleBrand,
            })}
          >
            {brands
              .filter((brand, index) => {
                return brand.category == idCate;
              })
              .map((brand2, index2) => {
                return (
                  <div
                    key={index2}
                    onClick={() => {
                      // setCurrentItemName(item.title);
                      setToggleBrand(false);
                    }}
                    className={clsx(cx("drop-down-menu-item"))}
                  >
                    <span>{brand2.title}</span>
                  </div>
                );
              })}
          </div>
        </div> */}
      </div>
      <div
        onClick={(e) => setTogglePriceOption(false)}
        className={clsx(cx("listproduct"))}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <div>
            <h3 style={{ margin: "0px" }}>Danh Sách Sản Phẩm</h3>
            <p style={{ opacity: "0.7" }}>Sản Phẩm/ {curentItemName}</p>
          </div>
          <div
            onClick={handleNavigateAddProduct}
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
              <th>Hình Ảnh</th>
              <th>
                <p>Tên</p>
              </th>
              <th>
                <p>Giá</p>
              </th>
              <th>
                <p>Danh Mục</p>
              </th>
              <th>
                <p>Thương Hiệu</p>
              </th>
              <th>
                <p>Số Lượng</p>
              </th>
              <th>
                <p>Trạng Thái</p>
              </th>
              <th>
                <p>Hoạt Động</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {softProduct.length !== 0
              ? curentItemName !== "Tất Cả"
                ? softProduct
                    .filter((item, index) => {
                      return item.category == idCate;
                    })
                    .map((item2, index2) => {
                      return (
                        <tr
                          onClick={() => HandleDetail(item2._id)}
                          key={index2}
                        >
                          <td>{index2 + 1}</td>
                          <td>
                            <img src={item2.images[0]}></img>
                          </td>
                          <td className={clsx(cx("title_td"))}>
                            {item2.title}
                          </td>
                          <td>{dollarUSLocale.format(item2.costPrice)}</td>
                          <td>
                            {category
                              .filter((cate) => cate._id == item2.category)
                              .map((item3) => item3.title)}
                          </td>
                          <td>
                            {brands
                              .filter((brand) => brand._id == item2.brand)
                              .map((item2) => item2.title)}
                          </td>
                          <td>{item2.quantity}</td>
                          <td>
                            {item2.quantity > 0 ? (
                              <div className={clsx(cx("status_conhang"))}>
                                <p>On-Sale</p>
                              </div>
                            ) : (
                              <div className={clsx(cx("status_hethang"))}>
                                <p>Out Of Stock</p>
                              </div>
                            )}
                          </td>
                          <td>
                            <p
                              style={
                                item2.active == true
                                  ? {
                                      width: "-moz-fit-content",
                                      width: "fit-content",
                                      backgroundColor: "lightgreen",
                                      borderRadius: "15px",
                                      padding: "4px 8px",
                                      fontWeight: "400",
                                      fontStyle: "normal",
                                      fontFamily:
                                        "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                      color: "#fff",
                                      margin: "0px auto",
                                    }
                                  : {
                                      width: "fit-content",
                                      backgroundColor: "lightcoral",
                                      borderRadius: "15px",
                                      padding: "4px 8px",
                                      fontWeight: "400",
                                      fontStyle: "normal",
                                      fontFamily:
                                        "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                      color: "#fff",
                                      margin: "0px auto",
                                    }
                              }
                            >
                              {item2.active == true ? "Đang bán" : "Tạm ngưng"}
                            </p>
                          </td>
                        </tr>
                      );
                    })
                : softProduct.map((item, index) => {
                    return (
                      <tr onClick={() => HandleDetail(item._id)} key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={item.images[0]}></img>
                        </td>
                        <td className={clsx(cx("title_td"))}>{item.title}</td>
                        <td>{dollarUSLocale.format(item.costPrice)}</td>
                        <td>
                          {category
                            .filter((cate) => cate._id == item.category)
                            .map((item3) => item3.title)}
                        </td>
                        <td>
                          {brands
                            .filter((brand) => brand._id == item.brand)
                            .map((item2) => item2.title)}
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          {item.quantity > 0 ? (
                            <div className={clsx(cx("status_conhang"))}>
                              <p>On-Sale</p>
                            </div>
                          ) : (
                            <div className={clsx(cx("status_hethang"))}>
                              <p>Out Of Stock</p>
                            </div>
                          )}
                        </td>
                        <td>
                          <p
                            style={
                              item.active == true
                                ? {
                                    width: "-moz-fit-content",
                                    width: "fit-content",
                                    backgroundColor: "lightgreen",
                                    borderRadius: "15px",
                                    padding: "4px 8px",
                                    fontWeight: "400",
                                    fontStyle: "normal",
                                    fontFamily:
                                      "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                    color: "#fff",
                                    margin: "0px auto",
                                  }
                                : {
                                    width: "fit-content",
                                    backgroundColor: "lightcoral",
                                    borderRadius: "15px",
                                    padding: "4px 8px",
                                    fontWeight: "400",
                                    fontStyle: "normal",
                                    fontFamily:
                                      "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                    color: "#fff",
                                    margin: "0px auto",
                                  }
                            }
                          >
                            {item.active == true ? "Đang bán" : "Tạm ngưng"}
                          </p>
                        </td>
                      </tr>
                    );
                  })
              : curentItemName !== "Tất Cả"
              ? products
                  .filter((product, index) => {
                    return product.category == idCate;
                  })
                  .map((item, index) => {
                    return (
                      <tr onClick={() => HandleDetail(item._id)} key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={item.images[0]}></img>
                        </td>
                        <td className={clsx(cx("title_td"))}>{item.title}</td>
                        <td>{dollarUSLocale.format(item.costPrice)}</td>
                        <td>
                          {category
                            .filter((cate) => cate._id == item.category)
                            .map((item3) => item3.title)}
                        </td>
                        <td>
                          {brands
                            .filter((brand) => brand._id == item.brand)
                            .map((item2) => item2.title)}
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          {item.quantity > 0 ? (
                            <div className={clsx(cx("status_conhang"))}>
                              <p>On-Sale</p>
                            </div>
                          ) : (
                            <div className={clsx(cx("status_hethang"))}>
                              <p>Out Of Stock</p>
                            </div>
                          )}
                        </td>
                        <td>
                          <p
                            style={
                              item.active == true
                                ? {
                                    width: "-moz-fit-content",
                                    width: "fit-content",
                                    backgroundColor: "lightgreen",
                                    borderRadius: "15px",
                                    padding: "4px 8px",
                                    fontWeight: "400",
                                    fontStyle: "normal",
                                    fontFamily:
                                      "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                    color: "#fff",
                                    margin: "0px auto",
                                  }
                                : {
                                    width: "fit-content",
                                    backgroundColor: "lightcoral",
                                    borderRadius: "15px",
                                    padding: "4px 8px",
                                    fontWeight: "400",
                                    fontStyle: "normal",
                                    fontFamily:
                                      "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                    color: "#fff",
                                    margin: "0px auto",
                                  }
                            }
                          >
                            {item.active == true ? "Đang bán" : "Tạm ngưng"}
                          </p>
                        </td>
                      </tr>
                    );
                  })
              : products.map((product, index) => {
                  return (
                    <tr onClick={() => HandleDetail(product._id)} key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={product.images[0]}></img>
                      </td>
                      <td className={clsx(cx("title_td"))}>{product.title}</td>
                      <td>{dollarUSLocale.format(product.costPrice)}</td>
                      <td>
                        {category
                          .filter((cate) => cate._id == product.category)
                          .map((item3) => item3.title)}
                      </td>
                      <td>
                        {brands
                          .filter((brand) => brand._id == product.brand)
                          .map((item2) => item2.title)}
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        {product.quantity > 0 ? (
                          <div className={clsx(cx("status_conhang"))}>
                            <p>Còn hàng</p>
                          </div>
                        ) : (
                          <div className={clsx(cx("status_hethang"))}>
                            <p>Hết hàng</p>
                          </div>
                        )}
                      </td>
                      <td>
                        <p
                          style={
                            product.active == true
                              ? {
                                  width: "-moz-fit-content",
                                  width: "fit-content",
                                  backgroundColor: "lightgreen",
                                  borderRadius: "15px",
                                  padding: "4px 8px",
                                  fontWeight: "400",
                                  fontStyle: "normal",
                                  fontFamily:
                                    "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                  color: "#fff",
                                  margin: "0px auto",
                                }
                              : {
                                  width: "fit-content",
                                  backgroundColor: "lightcoral",
                                  borderRadius: "15px",
                                  padding: "4px 8px",
                                  fontWeight: "400",
                                  fontStyle: "normal",
                                  fontFamily:
                                    "Roboto, 'Segoe UI', GeezaPro, 'DejaVu Serif','sans-serif', -apple-system, BlinkMacSystemFont",
                                  color: "#fff",
                                  margin: "0px auto",
                                }
                          }
                        >
                          {product.active == true ? "Đang bán" : "Tạm ngưng"}
                        </p>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
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
