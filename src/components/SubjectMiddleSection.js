import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import constant from "../utils/constants";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Spin, Slider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { clearcart1 } from "../store/cartSlice2";

import { Modal } from "react-bootstrap";
import Login from "./login";
import { CachedTwoTone } from "@material-ui/icons";

const BookMiddlesection = () => {
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [alltutor, setAlltutor] = useState([]);
  const [spinflag, setSpinflag] = useState(true);
  const [Selected, setSelected] = useState("");
  // const [Subject, setSubject] = useState(searchParams.get("subject"));
  // const [School, setSchool] = useState(searchParams.get("school"));
  const [Subject, setSubject] = useState();
  const [School, setSchool] = useState();

  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState();

  const [book, setBook] = useState("");
  const [pricestart, setPricestart] = useState("");
  const [priceend, setPriceend] = useState("");
  const Addedproduct = useSelector((state) => state.cart);
  const [double, setDouble] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.frontEndDataSearch);

  console.log("rrrrrrrrrrrrrrrrrrrrrrr", products);

  // dispatch(clearcart1());
  // const handleAdd = async (product) => {
  //   console.log("callind handleAdd");
  //   // await dispatch(add(product));
  //   setFlag(true);

  //   try {
  //     var formData = new FormData();
  //     formData.append("P_id", product._id);
  //     formData.append("U_id", localStorage.getItem("id"));
  //     const response = await axios.post(
  //       `${constant.BASE_IP}/webapi/Add_to_cart`,
  //       formData
  //     );
  //     console.log(response);
  //     if (response.data.status == 200) {
  //       dispatch(add(product));
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (err) {
  //     alert(err);
  //   }
  // };
  const handleAdd = async (product) => {
    console.log("callind handleAdd");
    if (
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") == "undefined" ||
      localStorage.getItem("id") == undefined
    ) {
      console.log("login karo");
      setDouble(false);
      handleShow();
    } else {
      try {
        var formData = new FormData();
        formData.append("P_id", product._id);
        formData.append("U_id", localStorage.getItem("id"));
        const response = await axios.post(
          `${constant.BASE_IP}/webapi/Add_to_cart`,
          formData
        );
        console.log(response);
        if (response.data.status == 200) {
          dispatch(add(product));
          setDouble(false);
        } else {
          message.error(response.data.message);
          setDouble(false);
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  const onTutorAll = async () => {
    try {
      console.log("pppppppppppppppppppppppp", products);
      setSpinflag(false);
      var formData = new FormData();

      if (products.length != 0) {
        for (let row of products) {
          for (let key in row) {
            if (key == "school") {
              formData.append("school", row[key]);
            } else {
              console.log("book", row[key]);
              formData.append("book", row[key]);
            }
          }
        }
      } else {
        formData.append("school", School);
        formData.append("book", book);
      }

      formData.append("searching", Selected);
      formData.append("page", page);
      formData.append("subject", Subject);
      formData.append("book", book);
      formData.append("startprice", pricestart);
      formData.append("endprice", priceend);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/getall_documents`,
        formData
      );
      console.log("books middle", response.data.data);
      if (response.data.status == 200) {
        setSpinflag(true);
        setAlltutor(response.data.data);
        setNumberOfPages(response.data.totalPages);
        dispatch(clearcart1());
      } else {
        setSpinflag(true);
        dispatch(clearcart1());
        alert(response.data.message);
      }
    } catch (err) {
      setSpinflag(true);
      dispatch(clearcart1());
      alert(err.message);
    }
  };
  const handleselectSubjectChange = (event) => {
    console.log("handleselectChange", event.target.value);
    if (event.target.value == "") {
      console.log("NULL");
      setSubject("");
    } else {
      setSubject(event.target.value);
    }
  };

  const handlesearchClick = () => {
    console.log("handlesearchClick");
    // onTutorAll();
    if (page === 0) {
      onTutorAll();
    } else {
      setPage(0);
    }
  };

  const handlePageClick = (event) => {
    console.log(event.selected);
    setPage(event.selected);
  };

  const handleselectChange = (event) => {
    console.log("handleselectChange", event.target.value);
    if (event.target.value == "") {
      // console.log("NULL");
      setSelected("");
    } else {
      setSelected(event.target.value);
    }
  };

  const handleselectBookChange = (event) => {
    console.log("handleselectChange", event.target.value);
    if (event.target.value == "") {
      // console.log("NULL");

      setBook("");
    } else {
      setBook(event.target.value);
    }
  };
  const onChangeDate = (value) => {
    console.log("oooooooooooooooooooooooo");
    console.log(value);

    console.log(value[0]);
    console.log(value[1]);
    setPricestart(value[0]);
    setPriceend(value[1]);
  };
  useEffect(() => {
    onTutorAll();
  }, [page]);

  console.log("!!!!", School);
  return (
    <>
      <div>
        <section className="section-middle" />
        <div className="page-title">
          <div className="container">
            <div className="page-title-in">
              <h2>Subject</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="product-page-section">
            <div className="row">
              <div className="col-md-3">
                <div className="product-page-aside">
                  <div className="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search By Title....."
                      onChange={handleselectChange}
                      onKeyDown={(e) =>
                        e.key === "Enter" ? handlesearchClick() : ""
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Book</label>
                    <select
                      className="form-control"
                      data-live-search="true"
                      onChange={handleselectBookChange}
                    >
                      <option value="" selected="">
                        Topic / Sub topic
                      </option>
                      <option value="Biology">Biology</option>
                      <option value="Text Book">Text Book</option>
                      <option value="Non-Fiction Book">Non-Fiction Book</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      className="form-control"
                      data-live-search="true"
                      onChange={handleselectSubjectChange}
                    >
                      <option value="" selected="">
                        Topic / Sub topic
                      </option>
                      <option value="English">English</option>
                      <option value="Maths">Maths</option>
                      <option value="Physics">Physics</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Price</label>
                    <Slider
                      range={{
                        draggableTrack: true,
                      }}
                      max={20000}
                      defaultValue={[0, 20000]}
                      onChange={(value, e) => onChangeDate(value, e)}
                    />
                  </div>

                  <div style={{ paddingLeft: 75, paddingTop: 25 }}>
                    <button
                      class="btn"
                      variant="success"
                      style={{ backgroundColor: "white" }}
                      onClick={handlesearchClick}
                    >
                      <h6 style={{ color: "#2c2f8c" }}>Search</h6>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-9">
                <div className="product-page-main">
                  <div className="product-page-top">
                    <div className="total-item">Total : 1-10 of 50 </div>
                  </div>

                  {spinflag ? (
                    ""
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "100px",
                      }}
                    >
                      <Spin />{" "}
                    </div>
                  )}
                  {alltutor.length > 0 && spinflag && (
                    <div className="product-page-items">
                      <ul>
                        {alltutor.map((user) => (
                          <li>
                            <div className="materials-item">
                              <div className="materials-item-inn card">
                                <div className="materials-item-img card-img">
                                  <Link
                                    to={`/product_detail_page_subject?id=${user._id}`}
                                  >
                                    <img
                                      src={`${constant.BASE_URL}/uploads/TutorAddDocumentImage/${user.image_name}`}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="materials-item-cont card-body">
                                  <div className="materials-item-name card-title">
                                    <div style={{ fontSize: 13 }}>
                                      Title:
                                      <span style={{ color: "#2c2f8c" }}>
                                        <b> {user.title}</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="materials-item-name card-title">
                                    <div style={{ fontSize: 13 }}>
                                      Book:
                                      <span style={{ color: "#2c2f8c" }}>
                                        <b> {user.course}</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="materials-item-name card-title">
                                    <div style={{ fontSize: 13 }}>
                                      Subject:
                                      <span style={{ color: "#2c2f8c" }}>
                                        <b> {user.subject}</b>
                                      </span>
                                    </div>
                                  </div>

                                  <div className="materials-rt-ct">
                                    <div className="materials-price-rt">
                                      <div className="materials-price">
                                        <i class="fas fa-rupee-sign">
                                          {user.price}
                                        </i>
                                      </div>
                                      <div className="materials-rt">
                                        <i className="fas fa-star active"></i>
                                        <i className="fas fa-star active"></i>
                                        <i className="fas fa-star active"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                      </div>
                                    </div>
                                    {/* <div className="materials-cart">
                                      <Link
                                        to={`/product_detail_page_subject?id=${user._id}`}
                                      >
                                        {Addedproduct.find(
                                          ({ _id }) => _id === user._id
                                        ) ? (
                                          <i
                                            class="fa fa-check"
                                            aria-hidden="true"
                                          ></i>
                                        ) : (
                                          <div>
                                            <i className="fas fa-shopping-cart"></i>
                                          </div>
                                        )}
                                      </Link>
                                    </div> */}
                                    <div className="materials-cart">
                                      {/* <Link
                                        to={`/product_detail_page?id=${user._id}`}
                                      >
                                        <i className="fas fa-shopping-cart"></i>
                                      </Link> */}{" "}
                                      {Addedproduct.find(
                                        ({ _id }) => _id === user._id
                                      ) ? (
                                        <Link to={`/my-cart`}>
                                          <i
                                            class="fa fa-check"
                                            aria-hidden="true"
                                          ></i>
                                        </Link>
                                      ) : (
                                        <button
                                          disabled={double}
                                          onClick={() => {
                                            setDouble(true);
                                            handleAdd(user);
                                          }}
                                        >
                                          {" "}
                                          <i className="fas fa-shopping-cart"></i>
                                        </button>

                                        // <div onClick={() => handleAdd(user)}>
                                        //   <i className="fas fa-shopping-cart"></i>
                                        // </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={numberOfPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h4 id="abc1">Log In to Your Account</h4>
        </Modal.Header>
        <Modal.Body>{<Login handleClose1={handleClose} />}</Modal.Body>
      </Modal>
    </>
  );
};

export default BookMiddlesection;
