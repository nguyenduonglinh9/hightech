import styles from "./detail-product.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import {
  BsPlusCircle,
  BsXCircleFill,
  BsCaretDownFill,
  BsXCircle,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const xmark = require("../../pages/Detail_Product/assets/fonts/img/x-mark.png");
const success = require("../../pages/Detail_Product/assets/fonts/img/success.png");
const deleteIcon = require("../../pages/Detail_Product/assets/fonts/img/delete.png");


function DetailProduct() {
  const id = useLocation();
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  let navigate = useNavigate();

  const refDesc = useRef();
  const refInputUpload = useRef();
  const refSpec = useRef();
  const refModal = useRef();
  const refModalContainer = useRef();
  const refSpec2 = useRef();


  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleDropDownBrand, setToggleDropDownBrand] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModal2, setToggleModal2] = useState(false);

  const [toggleOnOff, setToggleOnOff] = useState(false);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [images, setImages] = useState([]);
  const [costPrice, setCostPrice] = useState(0);
  const [salePercent, setSalePercent] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [specifications, setSpecifications] = useState([]);
  const [active, setActive] = useState();


  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategoryID, setCurrentCategoryID] = useState("");

  const [currentBrand, setCurrentBrand] = useState("");
  const [currentBrandID, setCurrentBrandID] = useState("");

  console.log(currentCategory, currentCategoryID);
  console.log(currentBrand, currentBrandID);

  useEffect(() => {
    fetch(`http://quyt.ddns.net:3000/product/${id.state.id}`, {
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
        setTitle(data.data.title);
        setDescription([...data.data.description]);
        setImages([...data.data.images]);
        setCostPrice(data.data.costPrice);
        setSalePercent(data.data.salePercent);
        setQuantity(data.data.quantity);
        setSpecifications([...data.data.specifications]);
        setCurrentCategoryID(data.data.category);
        setCurrentBrandID(data.data.brand);
        setToggleOnOff(data.data.active);
      });
  }, [id]);

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
        setCategorys((prev) => [...prev, ...data.data]);
      });
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
        setBrands(
          data.data.filter((item) => item.category == currentCategoryID)
        );
      });
  }, [currentCategoryID]);

  useEffect(() => {
    if (categorys.length == 0) {
      setCurrentCategory("");
    } else {
      const arr = categorys.filter((item, index) => {
        return item._id == currentCategoryID;
      });
      setCurrentCategory(arr[0]["title"]);
    }
  }, [currentCategoryID]);

  useEffect(() => {
    if (brands.length == 0) {
      setCurrentBrand("");
    } else {
      const arr = brands.filter((item, index) => {
        return item._id == currentBrandID;
      });
      if (arr.length == 0) {
        setCurrentBrand(brands[0]["title"]);
        setCurrentBrandID(brands[0]["_id"]);
      } else {
        setCurrentBrand(arr[0]["title"]);
      }
    }
  }, [brands]);

  const handleAppendChild = () => {
    var input = document.createElement("input");
    var div = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("src", xmark);
    img.style.width = "20px";
    img.style.height = "20px";
    input.style.margin = "5px 0";
    input.style.minWidth = "90%";
    div.style.display = "flex";
    div.style.alignItems = "center";
    img.addEventListener("click", () => {
      refDesc.current.removeChild(div);
    });
    div.appendChild(input);
    div.appendChild(img);

    refDesc.current.appendChild(div);
  };

  const openUploadImage = () => {
    refInputUpload.current.click();
  };
  const handleOnImageChange = (e) => {
    const arrimageUrl = [];
    const dataImage = new FormData();
    dataImage.append("source", e.target.files[0]);
    fetch(
      "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
      {
        method: "POST",
        body: dataImage,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setImages((prev) => [...prev, res["image"]["url"]]);
        arrimageUrl.push(res["image"]["url"]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteImage = (image) => {
    setImages(
      Array.from(images).filter((item) => {
        return item !== image;
      })
    );
  };

  const handleChangeCurrentCategory = (id, title) => {
    setCurrentCategoryID(id);
    setCurrentCategory(title);
    setToggleDropDown(false);
  };

  const handleChangeCurrentBrand = (id, title) => {
    setCurrentBrandID(id);
    setCurrentBrand(title);
    setToggleDropDownBrand(false);
  };

  const handleUpdateProduct = () => {
    //description
    const listInputDesc = [...refDesc.current.children];
    const arrDataInputDesc = listInputDesc.map((item, index) => {
      return item.firstChild.value;
    });
    //xử lý specifications
    const arr = [];
    [...refSpec.current.children].map((item) => {
      // setSpecifications((prev) => [
      //   ...prev,
      //   { title: item.children[0].value, content: item.children[1].value },
      // ]);
      arr.push({
        title: item.children[0].innerText,
        content: item.children[1].innerText,
      });
    });
    fetch(`http://quyt.ddns.net:3000/product/${id.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": DataLogin.token,
      },
      body: JSON.stringify({
        title: title,
        description: arrDataInputDesc,
        images: images,
        costPrice: costPrice,
        salePrice: costPrice * (salePercent / 100),
        salePercent: salePercent,
        quantity: quantity,
        specifications: arr,
        category: currentCategoryID,
        brand: currentBrandID,
        favorite: false,
        active: toggleOnOff,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          const div = document.createElement("div");
          div.style.width = "300px";
          div.style.height = "300px";
          div.style.display = "flex";
          div.style.flexDirection = "column";
          div.style.justifyContent = "center";
          div.style.alignItems = "center";
          const h2 = document.createElement("h2");
          h2.innerText = "Tác vụ thành công";
          const img = document.createElement("img");
          img.setAttribute("src", success);
          img.style.width = "100px";
          div.appendChild(img);
          div.appendChild(h2);
          refModalContainer.current.appendChild(div);
          setToggleModal2(true);
          setTimeout(() => {
            navigate("/product");
            refModalContainer.current.removeChild(div);
          }, 1500);
        } else {
          const div = document.createElement("div");
          div.style.width = "300px";
          div.style.height = "300px";
          div.style.display = "flex";
          div.style.flexDirection = "column";
          div.style.justifyContent = "center";
          div.style.alignItems = "center";

          const h2 = document.createElement("h2");
          h2.innerText = res.message;

          const div2 = document.createElement("div");
          div2.style.boxShadow = "none";
          const button = document.createElement("button");
          const button2 = document.createElement("button");
          button.innerText = "Thử lại";

          button.style.margin = "5px";

          button.addEventListener("click", () => {
            refModalContainer.current.removeChild(div);
            setToggleModal2(false);
          });
          div2.appendChild(button);
          div.appendChild(h2);
          div.appendChild(div2);
          refModalContainer.current.appendChild(div);
          setToggleModal2(true);
        }
      });
  };

  const handleDeleteSpec = (index) => {
    refDesc.current.removeChild(refDesc.current.children[index]);
  };
  const handleUpdateJson = () => {
    const div = document.createElement("div");
    div.style.width = "500px";
    div.style.height = "500px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    // div.style.justifyContent = 'center'
    div.style.alignItems = "center";
    const textaera = document.createElement("textarea");
    textaera.value = JSON.stringify(specifications,undefined,4);
    textaera.style.width = "90%";
    textaera.style.height = "70%";
    textaera.style.margin = "10px 0px";
    textaera.style.borderRadius = "10px";
    textaera.style.padding = "10px";
    const div2 = document.createElement("div");
    div2.style.boxShadow = "none";
    const button = document.createElement("button");
    const button2 = document.createElement("button");
    button.innerText = "Hủy";
    button2.innerText = "Lưu";
    button.style.margin = "5px";
    button2.style.margin = "5px";
    div2.appendChild(button);
    div2.appendChild(button2);
    div.appendChild(textaera);
    div.appendChild(div2);
    refModalContainer.current.appendChild(div);
    setToggleModal2(true);
    button.addEventListener("click", () => {
      refModalContainer.current.removeChild(div);
      setToggleModal2(false);
    });
    button2.addEventListener("click", () => {
      setSpecifications(JSON.parse(textaera.value));
      refModalContainer.current.removeChild(div);
      setToggleModal2(false);
    });
  };

  const handleAppendSpec = () => {
    const img = document.createElement("img");
    img.setAttribute("src", deleteIcon);
    img.style.width = "20px";
    img.style.height = "20px";
    img.addEventListener("click", () => {
      refSpec.current.removeChild(div);
    });
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.contentEditable = true;
    const p2 = document.createElement("p");
    p2.contentEditable = true;
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(img);
    refSpec.current.appendChild(div);
  }

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
          <p>Cập Nhật Thông Tin Sản Phẩm</p>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Tên</p>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Mô Tả</p>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              ref={refDesc}
            >
              {description == null
                ? undefined
                : description.map((item, index) => {
                    var a = item;
                    return (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          key={index}
                          style={{ margin: "5px 0", minWidth: "90%" }}
                          defaultValue={a}
                        ></input>
                        {/* <BsXCircle onClick={(e)=>handleDeleteSpec(e)} style={{marginLeft:'10px'}}/> */}
                        <img
                          onClick={() => handleDeleteSpec(index)}
                          style={{ width: "20px", height: "20px" }}
                          src={xmark}
                        ></img>
                      </div>
                    );
                  })}
            </div>
            <BsPlusCircle onClick={handleAppendChild} />
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Hình Ảnh</p>
            <div style={{ display: "flex" }}>
              {images == null
                ? undefined
                : images.map((item, index) => {
                    return (
                      <div style={{ position: "relative" }}>
                        <img
                          src={
                            typeof item != "object"
                              ? item
                              : URL.createObjectURL(item)
                          }
                        ></img>
                        <BsXCircleFill
                          onClick={() => handleDeleteImage(item)}
                          className={clsx(cx("icon-delete"))}
                        />
                      </div>
                    );
                  })}
              <div
                onClick={openUploadImage}
                className={clsx(cx("from-body-group-addimage"))}
              >
                <BsPlusCircle />
              </div>
            </div>
            <input
              style={{ display: "none" }}
              ref={refInputUpload}
              type="file"
              multiple
              onChange={(e) => handleOnImageChange(e)}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Giá</p>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => {
                setCostPrice(e.target.value);
              }}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Giảm Giá</p>
            <input
              type="number"
              value={salePercent}
              onChange={(e) => setSalePercent(e.target.value)}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Số Lượng</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Thông Số Kỹ Thuật</p>
            <div className={clsx(cx("from-body-group-spec"))} ref={refSpec}>
              {specifications == null
                ? undefined
                : specifications.map((item2, index2) => {
                    return (
                      <div key={index2}>
                        <p contentEditable={true}>{item2.title}</p>
                        <p contentEditable={true}>{item2.content}</p>
                        <img
                          onClick={() => {
                            const newArr = specifications.filter(
                              (item, index3) => {
                                return index3 !== index2;
                              }
                            );
                            setSpecifications([...newArr]);
                          }}
                          style={{ width: "20px", height: "20px" }}
                          src={deleteIcon}
                        ></img>
                      </div>
                    );
                  })}
            </div>
            <BsPlusCircle onClick={handleAppendSpec} />
            <button
              onClick={handleUpdateJson}
              style={
                specifications.length !== 0
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
            >
              Chỉnh sửa
            </button>
            {/* <BsPlusCircle onClick={handleAppendChildSpec} /> */}
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Trạng Thái Sản Phẩm</p>
            <div
              onClick={() => setToggleOnOff(!toggleOnOff)}
              className={clsx(cx("onoffbutton"), {
                [styles.onToggle2]: toggleOnOff,
              })}
            >
              <div
                className={clsx({
                  [styles.onToggle]: toggleOnOff,
                })}
              ></div>
              <p
                className={clsx({
                  [styles.onToggle3]: toggleOnOff,
                })}
              >
                Tắt
              </p>
              <p
                className={clsx({
                  [styles.onToggle3]: !toggleOnOff,
                })}
              >
                Bật
              </p>
            </div>
          </div>
          <div
            onClick={() => {
              setToggleDropDown(!toggleDropDown);
            }}
            className={clsx(cx("from-body-group"))}
          >
            <p style={{ fontWeight: "bold" }}>Danh Mục</p>
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
              <p style={{ margin: "0px" }}>{currentCategory}</p>
              <BsCaretDownFill />
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
                        <div
                          onClick={() =>
                            handleChangeCurrentCategory(item3._id, item3.title)
                          }
                          style={{ padding: "10px" }}
                        >
                          <p>{item3.title}</p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setToggleDropDownBrand(!toggleDropDownBrand);
            }}
            className={clsx(cx("from-body-group"))}
          >
            <p style={{ fontWeight: "bold" }}>Thương Hiệu</p>
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
              <p style={{ margin: "0px" }}>{currentBrand}</p>
              <BsCaretDownFill />
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
                        <div
                          onClick={() =>
                            handleChangeCurrentBrand(item3._id, item3.title)
                          }
                          style={{ padding: "10px" }}
                        >
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
            <button onClick={() => navigate("/product")}>Trở Lại</button>
          </div>
          <div>
            <button
              style={{ backgroundColor: "rgb(3, 201, 215)" }}
              onClick={handleUpdateProduct}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(cx("modal-confrim"), {
          [styles.turnonModal]: toggleModal,
        })}
      >
        <div ref={refModal} className={clsx(cx("modal"))}>
          <div className={clsx(cx("loading"))}></div>
        </div>
      </div>
      <div
        ref={refModalContainer}
        className={clsx(cx("Modal-container"), {
          [styles.turnonModal]: toggleModal2,
        })}
      ></div>
    </div>
  );
}

export default DetailProduct;
