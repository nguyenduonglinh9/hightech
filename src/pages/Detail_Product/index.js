import styles from "./detail-product.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { BsPlusCircle, BsXCircleFill, BsCaretDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function DetailProduct() {
  const id = useLocation();
  const DataLogin = JSON.parse(localStorage.getItem("DataLogin"));
  const cx = classNames.bind(styles);
  let navigate = useNavigate();

  const refDesc = useRef();
  const refInputUpload = useRef();
  const refSpec = useRef();
  const refModal = useRef();

  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleDropDownBrand, setToggleDropDownBrand] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const [title, setTitle] = useState("");
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
    input.style.margin = "5px 0";
    refDesc.current.appendChild(input);
  };
  const handleClose = () => {
    setToggleModal(false);
  };
  const handleDeleteProduct = () => {
    refModal.current.innerHTML = `
    <div style="animation:none;">
        <h2>Do you want to delete this product?</h2>
        <div style="animation:none;">
            <button>Yes</button>
             <button>No</button>
        </div>
    </div>`;

    refModal.current.children[0].children[1].children[1].addEventListener(
      "click",
      () => {
        setToggleModal(false);
      }
    );

    refModal.current.children[0].children[1].children[0].addEventListener(
      "click",
      () => {
        refModal.current.innerHTML = `
            <div style="width:50px;height:50px;border:7px solid transparent;border-radius:50%;border-top:7px solid rgb(3, 201, 215);">
                
            </div>`;
        fetch(`http://quyt.ddns.net:3000/product/${id.state.id}`, {
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
            refModal.current.innerHTML = `
            <div style="animation:none;">
                <h2>Successfully</h2>
            </div>`;
            setTimeout(() => {
              navigate("/product");
              window.location.reload(false);
            }, 1500);
          });
      }
    );

    setToggleModal(true);
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
        //  setImagesUpload((prev) => [...prev, res["image"]["url"]]);
        setImages((prev) => [...prev, res["image"]["url"]]);
        arrimageUrl.push(res["image"]["url"]);
      })
      .catch((err) => console.log(err));

    // setImages((prev) => [...prev, ...Array.from(e.target.files)]);
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
    fetch(`http://quyt.ddns.net:3000/product/${id.state.id}`, {
      method: "GET",
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
        specifications: newArr,
        category: currentCategoryID,
        brand: currentBrandID,
        favorite: false,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("from"))}>
        <div className={clsx(cx("from-header"))}>
          <h2>HIGHTECH</h2>
          <p>UPDATE & DELETE PRODUCT FORM</p>
        </div>
        <div className={clsx(cx("from-body"))}>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Name</p>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Descriptions</p>
            <div
              style={{ display: "flex", flexDirection: "column" }}
              ref={refDesc}
            >
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
            <p style={{ fontWeight: "bold" }}>Images</p>
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
            <p style={{ fontWeight: "bold" }}>Price</p>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => {
                setCostPrice(e.target.value);
              }}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Sale</p>
            <input
              type="number"
              value={salePercent}
              onChange={(e) => setSalePercent(e.target.value)}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Quantity</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <div className={clsx(cx("from-body-group"))}>
            <p style={{ fontWeight: "bold" }}>Specifications</p>
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
            <p style={{ fontWeight: "bold" }}>Category</p>
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
            <p style={{ fontWeight: "bold" }}>Brand</p>
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
            <button
              style={{ backgroundColor: "rgb(3, 201, 215)" }}
              onClick={handleUpdateProduct}
            >
              SAVE
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
    </div>
  );
}

export default DetailProduct;
