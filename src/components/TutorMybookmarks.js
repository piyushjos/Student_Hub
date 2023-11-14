import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import AddNewbook from "./TutoraddNewbook";
import Tupdate from "./Tutorupdatebook";
import axios from "axios";
import constant from "../utils/constants";
import { message, Spin, DatePicker, Space, Popconfirm } from "antd";
import moment from "moment";
import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
const { RangePicker } = DatePicker;

function TutorMyBook(props) {
  const [flag, setFlag] = useState(true);
  const [spinflag, setSpinflag] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState();
  const [data1, setData1] = useState([]);
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [selected, setSelected] = useState("");
  const [double, setDouble] = useState(false);
  const [id, setId] = useState("");
  const Addedproduct = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // // handle function for add new book
  // const [show, setShow] = useState(false);
  // const handleClose = () => {
  //   setShow(false);
  //   setFlag(false);
  // };
  // const handleShow = () => setShow(true);
  const [link, setLink] = useState(
    localStorage.getItem("role") == "tutor" ? "tutor-help" : "student-help"
  );

  // handle function for edit/update new book
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setShow1(false);
    setFlag(false);
  };
  const handleShow1 = () => setShow1(true);
  const handleAdd = async (product) => {
    console.log("callind handleAdd");

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
  };

  const onSignSuccess = async () => {
    setSpinflag(false);
    try {
      const Formdata = new FormData();
      Formdata.append("_id", localStorage.getItem("id"));
      Formdata.append("page", pageNumber);
      Formdata.append("fromdate", startdate);
      Formdata.append("todate", enddate);
      Formdata.append("searching", selected);

      console.log("hittingapi");

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetchBookmarks`,
        Formdata
      );
      console.log(response);
      if (response.data.status == 200) {
        setSpinflag(true);
        setNumberOfPages(response.data.totalPages);
        setData1(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };
  const handlePageClick = (event) => {
    // console.log("1", event.selected);
    setPageNumber(event.selected);
  };
  const onChangeDate = (value) => {
    console.log("oooooooooooooooooooooooo");
    // console.log(value);
    if (value == null) {
      // console.log("numm");
      setStartdate("");
      setEnddate("");
    } else {
      console.log(value[0]._d);
      console.log(value[1]._d);
      setStartdate(value[0]._d);
      setEnddate(value[1]._d);
    }
  };

  const handlesearchClick = (event) => {
    setFlag(false);
  };

  useEffect(() => {
    onSignSuccess();
    setFlag(true);
  }, [pageNumber, flag]);

  const confirm = async (e) => {
    console.log("confirm");
    console.log(e);
    // message.success("Click on yse");
    // console.log(e);

    try {
      var formData = new FormData();

      formData.append("P_id", e);
      formData.append("U_id", localStorage.getItem("id"));

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/deleteBookmarks`,
        formData
      );
      console.log(response.data.status);
      if (response.data.status == 200) {
        message.success("Data deleted successfully");
        setFlag(false);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  const cancel = (e) => {
    // console.log("cancel");
    // console.log(e);
    // message.error("Click on No");
  };

  return (
    <>
      <div class="col-md-9">
        <div class="uploads-right-area">
          <div class="uploads-right-top">
            <div class="row">
              <div class="col-md-8">
                <div class="uploads-top-left">
                  <span class="date-picker">
                    <Space direction="horizontal" size={12}>
                      <RangePicker
                        format="DD-MM-YYYY "
                        // onCalendarChange={() => onDate()}
                        onChange={(value, e) => onChangeDate(value, e)}
                        // onOpenChange={() => onDate()}
                      />
                    </Space>
                    <div>&nbsp;&nbsp;</div>
                  </span>

                  <span class="date-select-btn">
                    <button class="btn" onClick={handlesearchClick}>
                      Search
                    </button>
                  </span>
                </div>
              </div>
              <div class="col-md-4">
                <div class="uploads-top-right">
                  <Link to={`/tutor-help/tutor-book`}>
                    {" "}
                    <button
                      class="btn"
                      data-toggle="modal"
                      data-target="#myModal3"
                    >
                      {" "}
                      continueshopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="uploads-right-main">
            <div class="uploads-right-main-top">
              <div class="row">
                <div class="col-md-7">
                  <div class="earnings-right"></div>
                </div>
              </div>
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

            {data1.length > 0 && spinflag && (
              <ul>
                {data1.map((user) => (
                  <div class="uploads-right-main-items">
                    <div class="uploads-right-main-item box-sh card card-body">
                      <div class="row">
                        <div class="col-md-2">
                          <div class="uploads-item-img">
                            {user.BookData.length ? (
                              <img
                                src={`${constant.BASE_URL}/uploads/TutorbookImages/${user.BookData[0].samplefile_image}`}
                                alt=""
                              />
                            ) : (
                              <img
                                src={`${constant.BASE_URL}/uploads/TutorAddDocumentImage/${user.DocumentData[0].image_name}`}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="uploads-item-cont">
                            <div class="uploads-item-title">
                              {user.BookData.length
                                ? user.BookData[0].title
                                : user.DocumentData[0].title}
                            </div>
                            <div class="uploads-item-dtls">
                              <div class="uploads-item-dtls-left">
                                <div class="uploads-item-price">
                                  <i class="fas fa-rupee-sign"></i>
                                  <span>
                                    {" "}
                                    {user.BookData.length
                                      ? user.BookData[0].price
                                      : user.DocumentData[0].price}
                                  </span>
                                </div>
                                <div class="reviews-stars">
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                                </div>
                              </div>
                              <div class="uploads-item-dtls-right">
                                <p>
                                  <br />
                                  Date uploaded :{" "}
                                  {moment(user.addedCartDateAt).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div class="uploads-item-tags">
                              <label>Tag -</label>
                              {user.BookData.length
                                ? user.BookData[0].tag
                                : user.DocumentData[0].tag}
                            </div>
                            <div class="uploads-item-tags">
                              <label>Subject -</label>

                              {user.BookData.length
                                ? user.BookData[0].subject
                                : user.DocumentData[0].subject}
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="uploads-item-right">
                            <br />
                            <Popconfirm
                              title="Are you sure to delete this task?"
                              onConfirm={() => confirm(user.Product_id)}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button variant="outline-danger">DELETE</Button>
                            </Popconfirm>
                            <br />
                            <br />
                            {Addedproduct.find(
                              ({ _id }) => _id === user.Product_id
                            ) ? (
                              <Link to={`/my-cart`}>
                                <i class="fa fa-check" aria-hidden="true"></i>
                              </Link>
                            ) : (
                              <Button
                                variant="btn btn-warning"
                                disabled={double}
                                onClick={() => {
                                  setDouble(true);
                                  handleAdd(
                                    user.BookData.length
                                      ? user.BookData[0]
                                      : user.DocumentData[0]
                                  );
                                }}
                              >
                                Add to cart
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
            <div></div>
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
    </>
  );
}

export default TutorMyBook;
