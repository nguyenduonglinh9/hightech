import styles from "./add-product.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill, BsCaretDownFill } from "react-icons/bs";
import { Button } from "bootstrap";
const warning = require('../Category/assets/imgs/warning.png')

function AddProduct() {
  const id = useLocation();
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);

  const refDesc = useRef();
  const refInputUpload = useRef();
  const refSpec = useRef();
  const refErrName = useRef();

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);

  const [images, setImages] = useState([]);
  const [imagesUpload, setImagesUpload] = useState([]);

  const [costPrice, setCostPrice] = useState(0);
  const [salePercent, setSalePercent] = useState();
  const [quantity, setQuantity] = useState(0);
  const [specifications, setSpecifications] = useState([]);

  const [category, setCategory] = useState("Màn hình");
  const [currentCategoryID, setCurrentCategoryID] = useState(
    "634f9eea3f879eb6fc81bf01"
  );
  const [brand, setBrand] = useState("");
  const [brandCurrentID, setBrandCurrentID] = useState("");

  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleDropDownBrand, setToggleDropDownBrand] = useState(false);
  const [toggleUploadImage, setToggleUpLoadImage] = useState(false);

  useEffect(() => {
    if (imagesUpload.length === images.length) {
      setToggleUpLoadImage(false);
    }
  }, [imagesUpload]);

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

  const handleAddProduct = () => {
    //xử lý state Description
    const listInputDesc = [...refDesc.current.children];
    const arrDataInputDesc = listInputDesc.map((item, index) => {
      return item.value;
    });
    //xử lý specifications
    const listDiv = [...refSpec.current.children];

    var newArr = [];
    for (let i = 0; i < listDiv.length; i++) {
      var a = listDiv[i];
      var b = a.children;
      var ojb = {};
      ojb["title"] = b[0].value;
      ojb["content"] = b[1].value;
      newArr.push(ojb);
    }
    const data = {
      title: title,
      description: arrDataInputDesc,
      images: images,
      costPrice: costPrice,
      salePrice: costPrice * (salePercent / 100),
      salePercent: salePercent,
      quantity: quantity,
      specifications: newArr,
      category: currentCategoryID,
      brand: brandCurrentID,
      createdAt: new Date(),
      updatedAt: new Date(),
      favorite: false,
    };
    fetch("https://fpt-hightech-api.herokuapp.com/product/", {
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
        console.log(res);
      });
    // }))
  };

  const handleAppendChild = () => {
    var input = document.createElement("input");
    input.style.margin = "5px 0";
    refDesc.current.appendChild(input);
  };

  const handleAppendChildSpec = () => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const input2 = document.createElement("input");

    div.appendChild(input);
    div.appendChild(input2);

    refSpec.current.appendChild(div);
  };

  const openUploadImage = () => {
    refInputUpload.current.click();
  };
  const handleOnImageChange = (e) => {
    const arr = Array.from(e.target.files);
    arr.map((item) => {
      const dataImage = new FormData();
      dataImage.append("source", item);
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
          //  setImagesUpload((prev) => [...prev, res["image"]["url"]]);
          setImages((prev) => [...prev, res["image"]["url"]]);
        })
        .catch((err) => console.log(err));
    });
    // setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };

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

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
          <p>ADD NEW PRODUCT FORM</p>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div ref={refErrName} className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>NAME</p>
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
            <p style={{ fontWeight: "bold" }}>DESCRIPTION</p>
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
            <p style={{ fontWeight: "bold" }}>IMAGE</p>
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

              <div className={clsx(cx("from-body-group-addimage"))}>
                <BsPlusCircle onClick={openUploadImage} />
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
            <p style={{ fontWeight: "bold" }}>PRICE</p>
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
            <p style={{ fontWeight: "bold" }}>SALE</p>
            <input
              value={salePercent}
              onChange={(e) => {
                setSalePercent(e.target.value);
              }}
              placeholder="ex: 14.3"
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>QUANTITY</p>
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
            <p style={{ fontWeight: "bold" }}>SPECIFICATIONS</p>
            <div className={clsx(cx("from-body-group-spec"))} ref={refSpec}>
              <div className={clsx(cx("from-body-group-spec-1"))}>
                <input placeholder="ex: Nhu cầu"></input>
                <input placeholder="ex: Gaming, Văn phòng, Đồ họa - Kỹ thuật, Doanh nghiệp, Học sinh - Sinh viên"></input>
              </div>
            </div>
            <BsPlusCircle onClick={handleAppendChildSpec} />
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
              <p style={{ margin: "0px" }}>{category}</p>
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
              <p style={{ margin: "0px" }}>{brand}</p>
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
            <button>CANCEL</button>
          </div>
          <div>
            <button
              disabled={title == "" ? true : false}
              onClick={handleAddProduct}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
