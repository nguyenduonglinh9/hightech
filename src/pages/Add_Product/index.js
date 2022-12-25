import styles from "./add-product.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill, BsCaretDownFill } from "react-icons/bs";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
const deleteIcon = require("./assets/imgs/delete.png");
const warning = require("../Category/assets/imgs/warning.png");

function AddProduct() {
  const id = useLocation();
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  let navigate = useNavigate();

  const refDesc = useRef();
  const refInputUpload = useRef();
  const refSpec = useRef();
  const refErrName = useRef();
  const refModalContainer = useRef();
  const refMessage = useRef();
  const refSpec2 = useRef();
  const refSpec3 = useRef();
  const refTest = useRef([]);

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();

  const [images, setImages] = useState([]);
  const [imagesUpload, setImagesUpload] = useState([]);

  const [costPrice, setCostPrice] = useState(0);
  const [salePercent, setSalePercent] = useState();
  const [quantity, setQuantity] = useState(0);
  const [specifications, setSpecifications] = useState([]);
  const [toggleOnOff, setToggleOnOff] = useState(false);

  const [category, setCategory] = useState("Màn hình");
  const [currentCategoryID, setCurrentCategoryID] = useState(
    "634f9eea3f879eb6fc81bf01"
  );
  const [brand, setBrand] = useState("");
  const [brandCurrentID, setBrandCurrentID] = useState("");

  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleDropDownBrand, setToggleDropDownBrand] = useState(false);
  const [toggleUploadImage, setToggleUpLoadImage] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);

  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (imagesUpload.length === images.length) {
      setToggleUpLoadImage(false);
    }
  }, [imagesUpload]);

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
    if (brands.length == 0) {
      setBrandCurrentID("");
    } else {
      setBrandCurrentID(brands[0]["_id"]);
    }
  }, [brands]);

  useEffect(() => {
    if (brands.length == 0) {
      setBrand("");
    } else {
      setBrand(brands[0]["title"]);
    }
  }, [brands]);

  console.log(specifications);

  const handleAddProduct = () => {
    if (specifications.length == 0) {
      setToggleLoading(true);
      //xử lý state Description
      const listInputDesc = [...refDesc.current.children];
      const arrDataInputDesc = listInputDesc.map((item, index) => {
        return item.value;
      });
      //xử lý specifications
      const arr = [];
      [...refSpec3.current.children].map((item) => {
        arr.push({
          title: item.children[0].innerText,
          content: item.children[1].innerText,
        });
      });
      const data = {
        title: title,
        description: arrDataInputDesc,
        images: images,
        costPrice: costPrice,
        salePrice: costPrice - costPrice * (salePercent / 100),
        salePercent: salePercent,
        quantity: quantity,
        specifications: arr,
        category: currentCategoryID,
        brand: brandCurrentID,
        createdAt: new Date(),
        updatedAt: new Date(),
        favorite: false,
        active: toggleOnOff,
      };
      fetch("http://quyt.ddns.net:3000/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.code == 200) {
            const h2 = document.createElement("h2");
            h2.innerText = "Tác vụ thành công !";
            refMessage.current.appendChild(h2);
            setToggleMessage(true);

            setTimeout(() => {
              navigate("/product");
            }, 1500);
          } else {
            const h2 = document.createElement("h2");
            const button = document.createElement("button");
            h2.innerText = res.message;
            button.innerText = "Thử lại";
            refMessage.current.appendChild(h2);
            refMessage.current.appendChild(button);
            button.addEventListener("click", () => {
              setToggleLoading(false);
              setToggleMessage(false);
              refMessage.current.removeChild(h2);
              refMessage.current.removeChild(button);
            });
            setToggleMessage(true);
          }

          console.log(res);

          // navigate("/product");
        });
    } else {
      setToggleLoading(true);
      //xử lý state Description
      const listInputDesc = [...refDesc.current.children];
      const arrDataInputDesc = listInputDesc.map((item, index) => {
        return item.value;
      });
      //xử lý specifications
      const arr = [];
      [...refSpec3.current.children].map((item) => {
        // setSpecifications((prev) => [
        //   ...prev,
        //   { title: item.children[0].value, content: item.children[1].value },
        // ]);
        arr.push({
          title: item.children[0].innerText,
          content: item.children[1].innerText,
        });
      });
      const data = {
        title: title,
        description: arrDataInputDesc,
        images: images,
        costPrice: costPrice,
        salePrice: costPrice * (salePercent / 100),
        salePercent: salePercent,
        quantity: quantity,
        specifications: arr,
        category: currentCategoryID,
        brand: brandCurrentID,
        createdAt: new Date(),
        updatedAt: new Date(),
        favorite: false,
        active: toggleOnOff,
      };
      fetch("http://quyt.ddns.net:3000/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": DataLogin.token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.code == 200) {
            const h2 = document.createElement("h2");
            h2.innerText = "Tác vụ thành công !";
            refMessage.current.appendChild(h2);
            setToggleMessage(true);

            setTimeout(() => {
              navigate("/product");
            }, 1500);
          } else {
            const h2 = document.createElement("h2");
            const button = document.createElement("button");
            h2.innerText = res.message;
            button.innerText = "Thử lại";
            refMessage.current.appendChild(h2);
            refMessage.current.appendChild(button);
            button.addEventListener("click", () => {
              setToggleLoading(false);
              setToggleMessage(false);
              refMessage.current.removeChild(h2);
              refMessage.current.removeChild(button);
            });
            setToggleMessage(true);
          }

          console.log(res);
        });
    }
  };

  const handleAppendChild = () => {
    var input = document.createElement("input");
    input.style.margin = "5px 0";
    refDesc.current.appendChild(input);
  };

  const openUploadImage = () => {
    refInputUpload.current.click();
  };
  const handleOnImageChange = (e) => {
    const arr = Array.from(e.target.files);
    arr.map((item) => {
      const dataImage = new FormData();
      dataImage.append("files", item);
      fetch("http://quyt.ddns.net:2607", {
        method: "POST",
        body: dataImage,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          //  setImagesUpload((prev) => [...prev, res["image"]["url"]]);
          setImages((prev) => [...prev, res.data[0]]);
        })
        .catch((err) => console.log(err));
    });
    // setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };
  console.log(images);

  const handleDeleteImage = (image, index) => {
    setImages(
      Array.from(images).filter((item) => {
        return item !== image;
      })
    );
    setImagesUpload(
      imagesUpload.filter((item, index) => {
        return index !== index;
      })
    );
  };

  const handleChangeCurrentCategory = (id, title) => {
    setCategory(title);
    setCurrentCategoryID(id);
    setToggleDropDown(false);
  };

  const handleChangeCurrentBrand = (id, title) => {
    setBrand(title);
    setBrandCurrentID(id);
    setToggleDropDownBrand(false);
  };

  const handleOnChangeName = (e) => {
    setTitle(e.target.value);
    if (e.target.value !== "") {
      refErrName.current.children[2].innerText = null;
    }
  };

  const handleValidateName = (e) => {
    if (e.target.value == "") {
      refErrName.current.children[2].style.color = "red";
      refErrName.current.children[2].innerText = "Không được bỏ trống";
    } else {
      refErrName.current.children[2].innerText = null;
    }
  };
  const handleModalJson = () => {
    const div = document.createElement("div");
    div.style.width = "500px";
    div.style.height = "500px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    // div.style.justifyContent = 'center'
    div.style.alignItems = "center";
    const textaera = document.createElement("textarea");
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
    setToggleModal(true);
    button.addEventListener("click", () => {
      refModalContainer.current.removeChild(div);
      setToggleModal(false);
    });
    button2.addEventListener("click", () => {
      setSpecifications(JSON.parse(textaera.value));
      refModalContainer.current.removeChild(div);
      setToggleModal(false);
    });
  };
  console.log(specifications);

  const handleUpdateJson = () => {
    const div = document.createElement("div");
    div.style.width = "500px";
    div.style.height = "500px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    // div.style.justifyContent = 'center'
    div.style.alignItems = "center";
    const textaera = document.createElement("textarea");
    textaera.value = JSON.stringify(specifications, undefined, 4);
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
    setToggleModal(true);
    button.addEventListener("click", () => {
      refModalContainer.current.removeChild(div);
      setToggleModal(false);
    });
    button2.addEventListener("click", () => {
      setSpecifications(JSON.parse(textaera.value));
      refModalContainer.current.removeChild(div);
      setToggleModal(false);
    });
  };

  const handleAppendSpec = () => {
    const img = document.createElement("img");
    img.setAttribute("src", deleteIcon);
    img.style.width = "20px";
    img.style.height = "20px";
    img.addEventListener("click", () => {
      refSpec2.current.removeChild(img.parentNode);
      console.dir(refSpec2.current);
    });
    const div = document.createElement("div");
    const input = document.createElement("input");
    const input2 = document.createElement("input");
    div.appendChild(input);
    div.appendChild(input2);
    div.appendChild(img);
    refSpec2.current.appendChild(div);

    // const leng = refSpec2.current.children.length;

    // const a = [...refSpec2.current.children].find((item,index) => {
    //   // refTest.current.push({title: item.children[0].value, content: item.children[1].value})
    //   return index == leng - 1
    //   // setArr(prev => [...prev,
    //   //   {
    //   //     title: item[leng - 1].children[0].value,
    //   //     content: item[leng - 1].children[1].value,
    //   //   },
    //   // ]);
    // });
    // setArr(prev => [...prev, {title: a.children[0].value, content: a.children[1].value}])
  };
  const handleAppendSpec2 = () => {
    const img = document.createElement("img");
    img.setAttribute("src", deleteIcon);
    img.style.width = "20px";
    img.style.height = "20px";
    img.addEventListener("click", () => {
      refSpec3.current.removeChild(div);
    });
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.contentEditable = true;
    const p2 = document.createElement("p");
    p2.contentEditable = true;
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(img);
    refSpec3.current.appendChild(div);
  };
  console.log(arr);

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
          <p>Thêm mới sản phẩm</p>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div ref={refErrName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Tên</p>
            <input
              onBlur={(e) => handleValidateName(e)}
              value={title}
              onChange={(e) => {
                handleOnChangeName(e);
              }}
              placeholder="ex: CPU AMD Ryzen 5 5600X (6C/12T, 3.70 GHz - 4.60 GHz, 32MB) - AM4"
            ></input>
            <p style={{ margin: "2px" }}></p>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Mô Tả</p>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              ref={refDesc}
            >
              <input
                placeholder="ex: Cam kết hàng chính hãng 100%"
                style={{ margin: "5px 0" }}
              ></input>
            </div>
            <BsPlusCircle onClick={handleAppendChild} />
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Hình Ảnh</p>
            <div style={{ display: "flex" }}>
              {Array.from(images).length == null
                ? undefined
                : Array.from(images).map((image, index) => {
                    return (
                      <div key={index} style={{ position: "relative" }}>
                        <img styles={{ width: "80px" }} src={image}></img>
                        <div
                          className={clsx({
                            [styles.activeuploadimage]: toggleUploadImage,
                          })}
                        >
                          <div></div>
                        </div>
                        <BsXCircleFill
                          onClick={() => handleDeleteImage(image, index)}
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
              value={costPrice}
              onChange={(e) => {
                setCostPrice(e.target.value);
              }}
              placeholder="ex: 10000000"
              type="number"
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Giảm Giá</p>
            <input
              value={salePercent}
              onChange={(e) => {
                setSalePercent(e.target.value);
              }}
              placeholder="ex: 14.3"
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Số Lượng</p>
            <input
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder="ex: 100"
              type="number"
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Thông Số Kỹ Thuật</p>
            <div className={clsx(cx("from-body-group-spec"))} ref={refSpec}>
              <div className={clsx(cx("from-body-group-spec-1"))}>
                {/* <input placeholder="ex: Nhu cầu"></input>
                <input placeholder="ex: Gaming, Văn phòng, Đồ họa - Kỹ thuật, Doanh nghiệp, Học sinh - Sinh viên"></input> */}
                {/* {specifications.length == 0 ? (
                  <>
                    <div ref={refSpec2} style={{ width: "100%" }}>
                     
                    </div>
                    <BsPlusCircle onClick={handleAppendSpec} />
                  </>
                ) : ( */}
                <>
                  <div ref={refSpec3} style={{ width: "100%" }}>
                    {specifications.map((item, index) => {
                      return (
                        <div key={index}>
                          {/* <input
                            defaultValue={item.title}
                          ></input> */}
                          <p contentEditable={true}>{item.title}</p>
                          <p contentEditable={true}>{item.content}</p>
                          <img
                            onClick={() => {
                              const arr = [...specifications];
                              arr.splice(index, 1);
                              setSpecifications([...arr]);
                            }}
                            style={{ width: "20px", height: "20px" }}
                            src={deleteIcon}
                          ></img>
                        </div>
                      );
                    })}
                  </div>
                  <BsPlusCircle onClick={handleAppendSpec2} />
                </>
                {/* )} */}

                <button
                  style={
                    specifications.length == 0
                      ? { display: "inline-block" }
                      : { display: "none" }
                  }
                  onClick={handleModalJson}
                >
                  Thêm mã json
                </button>

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
              </div>
            </div>
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
              <p style={{ margin: "0px" }}>{category}</p>
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
                          key={index3}
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
              <p style={{ margin: "0px" }}>{brand}</p>
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
                          key={index3}
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
            <button onClick={() => navigate("/product")}>Hủy</button>
          </div>
          <div>
            <button
              disabled={title == "" ? true : false}
              onClick={handleAddProduct}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div
        ref={refModalContainer}
        className={clsx(cx("Modal-container"), {
          [styles.openModal]: toggleModal,
        })}
      ></div>
      <div
        // ref={refModalContainer}
        className={clsx(cx("loading"), {
          [styles.openModal]: toggleLoading,
        })}
      >
        <div></div>
        <div
          ref={refMessage}
          className={clsx(cx("Message"), {
            [styles.openloading]: toggleMessage,
          })}
        ></div>
      </div>
    </div>
  );
}

export default AddProduct;
