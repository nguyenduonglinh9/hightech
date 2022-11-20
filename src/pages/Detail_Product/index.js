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
  const refInputUpload = useRef();
  const refSpec = useRef();

  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleDropDownBrand, setToggleDropDownBrand] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState([]);
  const [images, setImages] = useState([]);
  const [costPrice, setCostPrice] = useState(0);
  const [salePercent, setSalePercent] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [specifications, setSpecifications] = useState([]);

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategoryID, setCurrentCategoryID] = useState("");

  const [currentBrand, setCurrentBrand] = useState("");
  const [currentBrandID, setCurrentBrandID] = useState("");


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
        setTitle(data.data.title);
        setDescription([...data.data.description]);
        setImages([...data.data.images]);
        setCostPrice(data.data.costPrice);
        setSalePercent(data.data.salePercent);
        setQuantity(data.data.quantity);
        setSpecifications([...data.data.specifications])
        setCurrentCategoryID(data.data.category);
        setCurrentBrandID(data.data.brand);
      });
  }, [id]);

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
    if (categorys.length == 0) {
      setCurrentCategory("");
    } else {
      const arr = categorys.filter((item, index) => {
        return item._id == currentCategoryID;
      });
      setCurrentCategory(arr[0]['title']);
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
        setCurrentBrand(brands[0]['title']);
        setCurrentBrandID(brands[0]['_id'])
      }
      else {
        setCurrentBrand(arr[0]["title"]);
      }
      
    }
  }, [brands]);

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

   const openUploadImage = () => {
     refInputUpload.current.click();
   };
   const handleOnImageChange = (e) => {
     setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };
  
  const handleDeleteImage = (image) => {
    setImages(
      Array.from(images).filter((item) => {
        return item !== image;
      })
    );
  };

  const handleAppendChildSpec = () => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const input2 = document.createElement("input");

    div.appendChild(input);
    div.appendChild(input2);

    refSpec.current.appendChild(div);
  };

  const handleChangeCurrentCategory = (id,title) => {
    setCurrentCategoryID(id);
    setCurrentCategory(title);
    setToggleDropDown(false);
  }

  const handleChangeCurrentBrand = (id, title) => {
    setCurrentBrandID(id);
    setCurrentBrand(title);
    setToggleDropDownBrand(false);
  };

  const handleUpdateProduct = () => {
    //description
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
      // setSpecifications()
      newArr.push(ojb);
    }
    const arrImage = images.map((image) => {
      return URL.createObjectURL(image);
    });
  }

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>NAME</p>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>DESCRIPTION</p>
            <div ref={refDesc}>
              {description == null
                ? undefined
                : description.map((item, index) => {
                    var a = item;
                    return (
                      <input
                        key={index}
                        style={{ margin: "5px 0" }}
                        defaultValue={a}
                      ></input>
                    );
                  })}
            </div>
            <BsPlusCircle onClick={handleAppendChild} />
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>IMAGE</p>
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
              type={Number}
              value={costPrice}
              onChange={(e) => {
                setCostPrice(e.target.value);
              }}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>SALE</p>
            <input
              value={salePercent}
              onChange={(e) => setSalePercent(e.target.value)}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>QUANTITY</p>
            <input
              type={Number}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>SPECIFICATIONS</p>
            <div className={clsx(cx("from-body-group-spec"))} ref={refSpec}>
              {specifications == null
                ? undefined
                : specifications.map((item2, index2) => {
                    return (
                      <div key={index2}>
                        <input defaultValue={item2.title}></input>
                        <input defaultValue={item2.content}></input>
                      </div>
                    );
                  })}
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
              <p style={{ margin: "0px" }}>{currentCategory}</p>
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
              <p style={{ margin: "0px" }}>{currentBrand}</p>
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
            <button onClick={handleDeleteProduct}>DELETE</button>
          </div>
          <div>
            <button>CANCEL</button>
            <button onClick={handleUpdateProduct}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;